import {chain, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {IMigrations} from './ng-update-utils';
import {
	addAngularConfigInList,
	getDefaultAngularConfig,
	infoMigration,
	readFile,
	replaceInFile,
	setAngularProjectsConfig,
	applyInTree,
	getAngularConfigs,
	checkIfAngularConfigExists,
	packageJsonConfigPath,
	getJson
} from '../utils';
import {appModulePath, createSrcFile, getTemplate, obliqueCssPath} from '../ng-add/ng-add-utils';
import {getPackageJsonDependency, removePackageJsonDependency} from '@schematics/angular/utility/dependencies';

export interface IUpdateV5Schema {}

export class UpdateV5toV6 implements IMigrations {
	dependencies = {
		'@angular/core': 11,
		'@angular/router': (angular: number) => angular,
		'@ngx-translate/core': 14,
		'@ng-bootstrap/ng-bootstrap': [8, 0],
		'@angular/material': (angular: number) => [angular, 0],
		ajv: [6, 0]
	};

	applyMigrations(_options: IUpdateV5Schema): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Analyzing project');

			return chain([
				this.migrateFont(),
				this.migrateAssets(),
				this.addFeatureDetection(),
				this.changeColorPalette(),
				this.renameMockCollapseComponent(),
				this.renameDefaultLanguage(),
				this.adaptDependencies(),
				this.migrateDropdown()
				/* banner */
			])(tree, _context);
		};
	}

	private migrateFont(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Migrating font');
			const module = readFile(tree, appModulePath);
			const match = module.match(/(?<full>\s*{\s*provide\s*:\s*OBLIQUE_FONT\s*,\s*useValue\s*:\s*(?:FONTS\.)?['"]?(?<font>[^"'\s}]*)['"]?\s*},?)/);
			const full = match?.groups?.full;
			const font = match?.groups?.font;
			if (full && font) {
				tree.overwrite(
					appModulePath,
					module
						.replace(full, '')
						.replace(/OBLIQUE_FONT\s*,?\s?/, '')
						.replace(/FONTS\s*,?\s?/, '')
				);
				this.addFontFiles(tree, font.toLowerCase());
				this.addFontStyle(tree, font.toLowerCase());
			}
			return tree;
		};
	}

	private addFontStyle(tree: Tree, font: string): void {
		if (font !== 'none') {
			const styleSheet = `node_modules/@oblique/oblique/styles/css/${font}.css`;
			setAngularProjectsConfig(tree, ['architect', 'build', 'options', 'styles'], (config: any) => {
				if (!config.includes(styleSheet)) {
					config.splice(config.indexOf(obliqueCssPath) + 1, 0, styleSheet);
				}
				return config;
			});
		}
	}

	private addFontFiles(tree: Tree, font: string): void {
		if (font === 'roboto') {
			setAngularProjectsConfig(tree, ['architect', 'build', 'options', 'assets'], (config: any) => {
				config.splice(1, 0, {glob: '*/**', input: 'node_modules/@oblique/oblique/styles/fonts', output: 'assets/fonts'});
				return config;
			});
		}
	}

	private migrateAssets(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Migrating assets');
			this.adaptFavIcon(tree);
			return this.adaptAssets(tree);
		};
	}

	private adaptFavIcon(tree: Tree): void {
		let index = getDefaultAngularConfig(tree, ['architect', 'build', 'options', 'index']);
		if (!tree.exists(index)) {
			index = './index.html';
		}
		if (tree.exists(index)) {
			tree.overwrite(
				index,
				readFile(tree, index).replace(
					'<link href="assets/styles/images/favicon.png" rel="shortcut icon"/>',
					'<link href="assets/images/favicon.png" rel="shortcut icon"/>'
				)
			);
		}
	}

	private adaptAssets(tree: Tree): Tree {
		return setAngularProjectsConfig(tree, ['architect', 'build', 'options', 'assets'], (config: any) => [
			{glob: '**/*', input: 'node_modules/@oblique/oblique/assets', output: 'assets'},
			...config.filter((asset: any) => asset.input && asset.input !== 'node_modules/@oblique/oblique/styles'),
			...config.filter((asset: any) => !asset.input)
		]);
	}

	private addFeatureDetection(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Oblique: Adding browser compatibility check');
			let index = getDefaultAngularConfig(tree, ['architect', 'build', 'options', 'index']);
			if (!tree.exists(index)) {
				index = './index.html';
			}
			if (tree.exists(index)) {
				tree.overwrite(
					index,
					readFile(tree, index)
						.replace(/<noscript.*<\/noscript>\s/s, '')
						.replace(/<!--\[if lt.*?endif]-->\s/s, '')
						.replace(/<!--\[if gte.*(<html.*?>).*endif]-->\s/s, '$1')
						.replace('<body>\n', '<body>\n' + getTemplate(tree, 'default-index.html'))
				);
			}
			return addAngularConfigInList(tree, ['architect', 'build', 'options', 'scripts'], 'node_modules/@oblique/oblique/ob-features.js');
		};
	}

	private changeColorPalette(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Change color palette');
			const apply = (filePath: string) => {
				replaceInFile(tree, filePath, new RegExp(/\$brand-info-light/g), '$brand-light');
				replaceInFile(tree, filePath, new RegExp(/\$brand-info/g), '$brand-primary');
				replaceInFile(tree, filePath, new RegExp(/\$brand-info-dark/g), '$brand-dark');
			};
			return applyInTree(tree, apply, '*.scss');
		};
	}

	private renameMockCollapseComponent(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Renaming MockCollapseComponent');
			const toApply = (filePath: string) => {
				replaceInFile(tree, filePath, /MockCollapseComponent/g, 'ObMockCollapseComponent');
				replaceInFile(tree, filePath, /MockCollapseModule/g, 'ObMockCollapseModule');
			};
			return applyInTree(tree, toApply, '*.ts');
		};
	}

	private renameDefaultLanguage(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Renaming locale.default into locale.defaultLanguage');
			const toApply = (filePath: string) => {
				const config = readFile(tree, filePath).match(/(?<config>\w*):\s*ObMasterLayoutConfig/)?.groups?.config;
				if (config) {
					replaceInFile(tree, filePath, new RegExp(`${config}.locale.default`, 'g'), `${config}.locale.defaultLanguage`);
				}
			};
			return applyInTree(tree, toApply, '*.ts');
		};
	}

	private adaptDependencies(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Adapting dependencies');
			this.adaptTranslationDependencies(tree);
			this.adaptCoreJsDependency(tree);
			this.adaptTestDependencies(tree);
			if (!getPackageJsonDependency(tree, '@angular-builders/jest')) {
				removePackageJsonDependency(tree, 'jest-preset-angular');
				removePackageJsonDependency(tree, 'ts-jest');
			}
			removePackageJsonDependency(tree, 'ts-morph');
			removePackageJsonDependency(tree, '@ts-morph/common');
		};
	}

	private adaptTestDependencies(tree: Tree): void {
		const usesProtractor = checkIfAngularConfigExists(tree, ['architect', 'e2e', 'builder'], '@angular-devkit/build-angular:protractor');
		const usesJest = checkIfAngularConfigExists(tree, ['architect', 'test', 'builder'], '@angular-builders/jest:run');
		const deps = Object.keys(getJson(tree, packageJsonConfigPath)?.devDependencies || {});
		deps.filter(dep => dep.indexOf(usesJest ? 'karma' : 'jest') > -1).forEach(dep => removePackageJsonDependency(tree, dep));
		if (usesJest && !usesProtractor) {
			deps.filter(dep => dep.indexOf('jasmine') > -1).forEach(dep => removePackageJsonDependency(tree, dep));
		}
	}

	private adaptTranslationDependencies(tree: Tree): void {
		const file = readFile(tree, appModulePath);
		const factory = file.match(/TranslateModule\.forRoot\({.*?useFactory\s*:\s*(?<factory>\w*)/s)?.groups?.factory;
		const loader = file.match(new RegExp(`export function ${factory}\\(.*new (?<loader>[^(]*)`, 's'))?.groups?.loader;
		const hasObMultiLoader = /TranslateModule.forRoot\(\s*multiTranslateLoader\(/.test(file);
		if (hasObMultiLoader || loader !== 'TranslateHttpLoader') {
			this.removeTranslateLoader(tree, '@ngx-translate/http-loader', 'TranslateHttpLoader');
		}
		if (hasObMultiLoader || loader !== 'MultiTranslateHttpLoader') {
			this.removeTranslateLoader(tree, 'ngx-translate-multi-http-loader', 'MultiTranslateHttpLoader');
		}
	}

	private removeTranslateLoader(tree: Tree, dep: string, className: string) {
		const file = readFile(tree, appModulePath);
		removePackageJsonDependency(tree, dep);
		tree.overwrite(
			appModulePath,
			file
				.replace(new RegExp(`\\nexport function .*\\(.*new ${className}[^;]*;\\s*}`, 's'), '')
				.replace(new RegExp(`\\nimport\\s*{\\s*${className}\\s*}\\s*from\\s*['"]${dep}['"]\\s*;`), '')
		);
	}

	private adaptCoreJsDependency(tree: Tree): void {
		const hasCoreJsBeenImported = getAngularConfigs(tree, ['architect', 'build', 'options', 'polyfills'])
			.map(polyfill => createSrcFile(tree, polyfill.config))
			.filter(sourceFile => /import 'core-js/.test(sourceFile.getText())).length;
		if (!hasCoreJsBeenImported) {
			removePackageJsonDependency(tree, 'core-js');
		}
	}

	private migrateDropdown(): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Migrate ObDropdownComponent');
			const toApply = (filePath: string) => {
				replaceInFile(tree, filePath, /<button dropdown-toggle>(<[^\s]*)(.*)<\/button>/g, '$1 dropdown-toggle$2');
				replaceInFile(tree, filePath, /<button dropdown-toggle>(\w*)<\/button>/g, '<ng-container dropdown-toggle>$1</ng-container>');
			};
			return applyInTree(tree, toApply, '*.html');
		};
	}
}
