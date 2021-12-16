import {Rule, SchematicContext, Tree, chain, externalSchematic} from '@angular-devkit/schematics';
import {addDevDependency, addScript, getTemplate, removeDevDependencies, removeScript} from '../ng-add/ng-add-utils';
import {
	addAngularConfigInList,
	addFile,
	applyInTree,
	createSafeRule,
	getDefaultAngularConfig,
	infoMigration,
	readFile,
	replaceInFile,
	setAngularProjectsConfig
} from '../utils';
import {ObIDependencies, ObIMigrations} from './ng-update.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUpdateV8Schema {}

export class UpdateV7toV8 implements ObIMigrations {
	dependencies: ObIDependencies = {};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	applyMigrations(_options: IUpdateV8Schema): Rule {
		return (tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Analyzing project');
			return chain([
				this.prefixScssVariableNames(),
				this.prefixMixinNames(),
				this.removeLayoutCollapse(),
				this.removeDlHorizontalVariants(),
				this.removeCompatCss(),
				this.removeThemeService(),
				this.migrateMasterLayoutProperties(),
				this.migrateObEMasterLayoutEventValues(),
				this.migrateConfigEvents(),
				this.updateBrowserCompatibilityMessage(),
				this.migrateExistingEslint()
			])(tree, _context);
		};
	}

	private prefixScssVariableNames(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Prefix scss variable names');
			const apply = (filePath: string) => {
				[
					// Palette CI-CD colors
					'venetian-red',
					'red',
					'cerulean',
					'malibu',
					'pattens-blue',
					'solitude',
					'clear-day',
					'mocassin',
					'white',
					'smoke',
					'gainsboro',
					'light-gray',
					'silver',
					'empress',
					'coal',
					'night-rider',
					'black',
					'gray-extra-light',
					'gray-lighter',
					'gray-light',
					'gray',
					'gray-dark',
					'gray-darker',
					// Bootstrap
					'secondary',
					'info',
					'body-width',
					'danger',
					'body-color',
					'link-color',
					'link-hover-color',
					'theme-color-interval',
					'input-color',
					'input-border-color',
					'input-border-radius',
					'input-border-radius-lg',
					'input-border-radius-sm',
					'dropdown-border-color',
					'dropdown-link-color',
					'dropdown-link-hover-color',
					'nav-link-disabled-color',
					'nav-tabs-link-hover-border-color',
					'nav-pills-border-radius',
					'list-group-border-radius',
					'list-group-item-padding-x',
					'modal-content-border-color',
					'alert-border-radius',
					'alert-border-width',
					// Variables
					'duration-default',
					'duration-fast',
					'smaller',
					'smallest',
					'bigger',
					'biggest',
					'font-size-base',
					'font-size-xl',
					'font-size-lg',
					'font-size-sm',
					'font-size-xs',
					'font-size-normal',
					'font-size-biggest',
					'font-size-bigger',
					'font-size-smaller',
					'font-size-smallest',
					'spacing-xl',
					'spacing-lg',
					'spacing-default',
					'spacing-sm',
					'spacing-xs',
					'z-index-default',
					'z-index-controls',
					'z-index-layout',
					'z-index-widget',
					'z-index-overlay',
					'z-index-overlay-top',
					'header-height',
					'header-height-md',
					'header-height-no-navigation',
					'header-height-collapsed',
					'navigation-height',
					'footer-height',
					'footer-height-md',
					'footer-height-sm',
					'footer-height-collapsed',
					'layout-collapse',
					'border-radius-base',
					'navigation-scrollable-padding',
					'column-width',
					'off-canvas-sidebar-width',
					'off-canvas-sidebar-collapsed-width',
					'alert-symbol-width',
					'column-layout-toggle-height',
					'column-layout-toggle-width',
					'column-layout-toggle-radius',
					'sticky-element-height',
					'sticky-element-height-sm',
					'sticky-element-height-lg',
					'stepper-size',
					'stepper-size-sm',
					'stepper-size-lg',
					'stepper-font-size',
					'stepper-sm-font-size',
					'stepper-lg-font-size',
					'table-collapsed-header-width',
					'grid-breakpoints',
					'icon-font-family'
				].forEach(scssVariable => replaceInFile(tree, filePath, new RegExp(`\\$${scssVariable}`, 'g'), `$ob-${scssVariable}`));

				[
					// Brand
					'default',
					'accent',
					'extra-light',
					'light',
					'primary',
					'dark',
					'success-light',
					'success',
					'success-dark',
					'warning-light',
					'warning',
					'warning-dark',
					'error-light',
					'error',
					'error-dark',
					'logo-width',
					'logo-height',
					'logo-height-collapsed',
					'logo-width-collapsed',
					'line-width'
				].forEach(scssVariable => replaceInFile(tree, filePath, new RegExp(`\\$brand-${scssVariable}`, 'g'), `$ob-${scssVariable}`));

				// Palette Oblique colors
				replaceInFile(tree, filePath, new RegExp(/\$(primary|error|gray|success|warning)-(\d00?)/g), '$ob-$1-$2');
			};
			return applyInTree(tree, apply, '*.scss');
		});
	}

	private prefixMixinNames(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Prefix mixin names');
			const apply = (filePath: string) => {
				[
					'callout-styles',
					'firefox',
					'bubble-tail',
					'bubble-tail-border',
					'link-btn',
					'column-separator',
					'layout-collapse-down',
					'layout-collapse-up',
					'media-breakpoint-up',
					'media-breakpoint-down',
					'horizontal-description-list',
					'nav-hover',
					'nav-indent',
					'stepper-state',
					'stepper-variant',
					'table-collapse',
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'subtitle1',
					'subtitle2',
					'body1',
					'body2',
					'button',
					'caption',
					'overline',
					'badge-styles',
					'btn-variant',
					'mixed-dropdown-btn-group',
					'box-shadow-secondary',
					'checkbox-variant',
					'radio-variant',
					'form-control-validation',
					'icon-base',
					'icon',
					'table-variant',
					'text-control-clear-position',
					'toggle-state',
					'toggle-before',
					'toggle-after',
					'toggle-icon-before',
					'toggle-icon-after',
					'add-toggle',
					'form-field-size',
					'dropShadow',
					'innerBottomShadow',
					'list-title'
				].forEach(mixin => replaceInFile(tree, filePath, new RegExp(`\\@include ${mixin}`, 'g'), `@include ob-${mixin}`));
			};
			return applyInTree(tree, apply, '*.scss');
		});
	}

	private removeLayoutCollapse(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Replacing layout-collapse mixins');
			const apply = (filePath: string) => {
				replaceInFile(tree, filePath, /(?:ob-)?layout-collapse-(up|down)(?:\(\))?/g, `ob-media-breakpoint-$1(md)`);
			};
			return applyInTree(tree, apply, '*.scss');
		});
	}

	private removeDlHorizontalVariants(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Remove .ob-horizontal-* classes');
			const apply = (filePath: string) => {
				replaceInFile(tree, filePath, new RegExp(/\s?ob-horizontal-(?:large|small)/g), '');
			};
			return applyInTree(tree, apply, '*.html');
		});
	}

	private removeCompatCss(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Removing compat styles');
			return setAngularProjectsConfig(tree, ['architect', 'build', 'options', 'styles'], (config: any) =>
				(config || []).filter((style: string) => !/node_modules\/@oblique\/oblique\/styles\/css\/oblique-compat\.s?css/.test(style))
			);
		});
	}

	private removeThemeService(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Remove ObThemeService');
			const apply = (filePath: string) => {
				const fileContent = readFile(tree, filePath);
				if (fileContent.includes('ObThemeService')) {
					const service = /(?<service>\w*)\s*:\s*ObThemeService,?/.exec(fileContent)?.groups?.service;
					const theme = this.getCSSPath(new RegExp(`${service}\\.setTheme\\((?<theme>.*)\\)`).exec(fileContent)?.groups?.theme || '');
					const font = this.getCSSPath(new RegExp(`${service}\\.setFont\\((?<font>.*)\\)`).exec(fileContent)?.groups?.font || '');
					const stylesPath = ['architect', 'build', 'options', 'styles'];
					[theme, font].filter(property => !!property).forEach(property => addAngularConfigInList(tree, stylesPath, property));

					tree.overwrite(
						filePath,
						fileContent
							.replace(/(?:THEMES|FONTS),?(?!\.)\s*/g, '') // remove imports of THEMES and FONTS
							.replace(/[\w ]*\s*:\s*ObThemeService,?\s*/, '') // remove service injection in constructor
							.replace(/ObThemeService,?\s*/, '') // remove service import
							.replace(new RegExp(`(?:this\\.)?${service}\\.set(?:Theme|Font)\\(.*\\);\\s*`, 'g'), '') // remove call to setTheme / setFont
							.replace(/,(\s*(?:\)|}))/g, '$1') // remove eventual trailing commas im imports
							.replace(/import\s*{\s*}\s*from\s*['"]@oblique\/oblique['"]\s*;\s*/g, '') // remove empty imports
							.replace(/constructor\s*\(\s*\)\s*{\s*}/g, '') // remove empty imports
					);
				}
			};
			return applyInTree(tree, apply, '*.ts');
		});
	}

	private getCSSPath(themeOrFont: string): string | undefined {
		switch (themeOrFont) {
			case 'oblique-material':
			case 'THEMES.MATERIAL':
				return 'node_modules/@oblique/oblique/styles/css/oblique-material.css';
			case 'oblique-bootstrap':
			case 'THEMES.BOOTSTRAP':
				return 'node_modules/@oblique/oblique/styles/css/oblique-bootstrap.css';
			case 'frutiger':
			case 'FONTS.FRUTIGER':
				return 'node_modules/@oblique/oblique/styles/css/frutiger.css';
			case 'roboto':
			case 'FONTS.ROBOTO':
				return 'node_modules/@oblique/oblique/styles/css/roboto.css';
			default:
				return undefined;
		}
	}

	private migrateMasterLayoutProperties(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Replacing master Layout properties: header.isAnimated, footer.isSmall, layout.isFixed, hasScrollTransition, isMedium');
			const toApply = (filePath: string) => {
				const fileContent = readFile(tree, filePath);
				let replacement = fileContent;
				replacement = this.migrateMasterLayoutConfig(replacement);
				replacement = this.removeProperty(replacement, 'header', 'isAnimated');
				replacement = this.removeProperty(replacement, 'footer', 'isSmall');
				replacement = this.migrateMasterLayoutIsFixed(replacement); // migrate the setter
				replacement = this.removeProperty(replacement, 'layout', 'isFixed'); // remove the getter
				replacement = this.migrateProperty(replacement, 'footer', 'hasScrollTransition', 'hasLogoOnScroll');
				replacement = this.migrateProperty(replacement, 'header', 'hasScrollTransition', 'reduceOnScroll');
				replacement = this.migrateProperty(replacement, 'header', 'isMedium', 'isSmall');
				if (fileContent !== replacement) {
					tree.overwrite(filePath, replacement);
				}
			};
			return applyInTree(tree, toApply, '*.ts');
		});
	}

	private migrateObEMasterLayoutEventValues(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Replacing ObEMasterLayoutEventValues values');
			const toApply = (filePath: string) => {
				const fileContent = readFile(tree, filePath);
				const replacement = fileContent
					.replace(/ObEMasterLayoutEventValues\.STICKY\b/g, 'ObEMasterLayoutEventValues.HEADER_IS_STICKY')
					.replace(/ObEMasterLayoutEventValues\.MEDIUM\b/g, 'ObEMasterLayoutEventValues.HEADER_IS_SMALL')
					.replace(/ObEMasterLayoutEventValues\.COVER\b/g, 'ObEMasterLayoutEventValues.LAYOUT_HAS_COVER')
					.replace(/ObEMasterLayoutEventValues\.OFF_CANVAS\b/g, 'ObEMasterLayoutEventValues.LAYOUT_HAS_OFF_CANVAS')
					.replace(/ObEMasterLayoutEventValues\.MAIN_NAVIGATION\b/g, 'ObEMasterLayoutEventValues.LAYOUT_HAS_MAIN_NAVIGATION')
					.replace(/ObEMasterLayoutEventValues\.LAYOUT\b/g, 'ObEMasterLayoutEventValues.LAYOUT_HAS_DEFAULT_LAYOUT')
					.replace(/ObEMasterLayoutEventValues\.COLLAPSE\b/g, 'ObEMasterLayoutEventValues.IS_MENU_OPENED')
					.replace(/ObEMasterLayoutEventValues\.FULL_WIDTH\b/g, 'ObEMasterLayoutEventValues.NAVIGATION_IS_FULL_WIDTH')
					.replace(/ObEMasterLayoutEventValues\.SCROLLABLE\b/g, 'ObEMasterLayoutEventValues.NAVIGATION_SCROLL_MODE');
				if (fileContent !== replacement) {
					tree.overwrite(filePath, replacement);
				}
			};
			return applyInTree(tree, toApply, '*.ts');
		});
	}

	private migrateConfigEvents(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Replacing configEvents');
			const toApply = (filePath: string) => {
				const fileContent = readFile(tree, filePath);
				const replacement = fileContent.replace(/\.configEvents(?!\$)/g, '.configEvents$');
				if (fileContent !== replacement) {
					tree.overwrite(filePath, replacement);
				}
			};
			return applyInTree(tree, toApply, '*.ts');
		});
	}

	private migrateMasterLayoutConfig(fileContent: string): string {
		const service = /(?<service>\w+)\s*:\s*ObMasterLayoutConfig/.exec(fileContent)?.groups?.service;
		return !service
			? fileContent
			: fileContent
					.replace(new RegExp(`^\\s*${service}\\.header\\.isAnimated\\s*=\\s*\\w*\\s*;$`, 'm'), '')
					.replace(new RegExp(`^\\s*${service}\\.footer\\.isSmall\\s*=\\s*\\w*\\s*;$`, 'm'), '')
					.replace(new RegExp(`^(\\s*${service})\\.layout\\.isFixed\\s*=\\s*(\\w*)\\s*;$`, 'm'), `$1.header.isSticky = $2;\n$1.footer.isSticky = $2;`)
					.replace(new RegExp(`^(\\s*${service}\\.footer)\\.hasScrollTransitions\\s*=\\s*(\\w*)\\s*;$`, 'm'), '$1.hasLogoOnScroll = $2;')
					.replace(new RegExp(`^(\\s*${service}\\.header)\\.hasScrollTransitions\\s*=\\s*(\\w*)\\s*;$`, 'm'), '$1.reduceOnScroll = $2;')
					.replace(new RegExp(`^(\\s*${service}\\.header)\\.isMedium\\s*=\\s*(\\w*)\\s*;$`, 'm'), '$1.isSmall = $2;');
	}

	private migrateMasterLayoutIsFixed(fileContent: string): string {
		const service = /(?<service>\w+)\s*:\s*ObMasterLayoutService/.exec(fileContent)?.groups?.service;
		return service ? this.migrateObMasterLayoutServiceIsFixed(fileContent, service) : this.migrateObMasterLayoutComponentServiceIsFixed(fileContent);
	}

	private migrateObMasterLayoutServiceIsFixed(fileContent: string, service: string): string {
		return fileContent.replace(
			new RegExp(`^(\\s*(?:this\\.)?${service})\\.layout\\.isFixed\\s+=\\s+(\\w*);$`, 'm'),
			`$1.header.isSticky = $2;\n$1.footer.isSticky = $2;`
		);
	}

	private migrateObMasterLayoutComponentServiceIsFixed(fileContent: string): string {
		const service = /(?<service>\w+)\s*:\s*ObMasterLayoutComponentService/.exec(fileContent)?.groups?.service;
		if (service) {
			let masterLayoutService = /(?<service>\w+)\s*:\s*ObMasterLayoutService/.exec(fileContent)?.groups?.service;
			if (!masterLayoutService) {
				fileContent = fileContent
					.replace(/(constructor\s*\()(\s*)/, '$1$2private readonly masterLayout: ObMasterLayoutService,$2')
					.replace(/import\s*{(.*)}\s*from\s*['"]@oblique\/oblique['"]/, `import {$1, ObMasterLayoutService} from '@oblique/oblique'`);
				masterLayoutService = 'masterLayout';
			}
			return fileContent.replace(
				new RegExp(`^(\\s*this\\.)?${service}\\.isFixed\\s*=\\s*(\\w*)\\s*;$`, 'm'),
				`$1${masterLayoutService}.header.isSticky = $2;\n$1${masterLayoutService}.footer.isSticky = $2;`
			);
		}
		return fileContent;
	}

	private removeProperty(fileContent: string, service: string, name: string): string {
		const serviceName = this.getServiceName(fileContent, service);
		return serviceName
			? fileContent.replace(new RegExp(`^\\s*(?:return\\s*)?(?:this\\.)?${serviceName}\\.${name}(?:\\s*=\\s*(\\w*))?;$`, 'gm'), '')
			: fileContent;
	}

	private migrateProperty(fileContent: string, service: string, name: string, newName: string): string {
		const serviceName = this.getServiceName(fileContent, service);
		return serviceName ? fileContent.replace(new RegExp(`(?<=${serviceName}\\.)${name}`, 'gm'), newName) : fileContent;
	}

	private getServiceName(fileContent: string, serviceName: string): string | undefined {
		const serviceClass = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
		let service = new RegExp(`(?<service>\\w+)\\s*:\\s*ObMasterLayout${serviceClass}Service`).exec(fileContent)?.groups?.service;
		if (!service) {
			service = /(?<service>\w+)\s*:\s*ObMasterLayoutService/.exec(fileContent)?.groups?.service;
			service = service ? `${service}.${serviceName}` : undefined;
		}
		return service;
	}

	private updateBrowserCompatibilityMessage(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Oblique: Updating browser compatibility check message');
			let index = getDefaultAngularConfig(tree, ['architect', 'build', 'options', 'index']);
			if (!tree.exists(index)) {
				index = './index.html';
			}
			if (tree.exists(index)) {
				tree.overwrite(
					index,
					readFile(tree, index).replace(
						new RegExp(/(<noscript style="display: table; height: 98vh; width: 98vw">)((.|\r?\n)*)(<\/div>)/gm),
						getTemplate(tree, 'default-index.html')
					)
				);
			}
			return tree;
		});
	}

	private migrateExistingEslint(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			if (tree.exists('.eslintrc.json') && tree.exists('.prettierrc')) {
				infoMigration(_context, 'Toolchain: update linting to Oblique standards');
				const prefix =
					/\s*"@angular-eslint\/(?:component|directive)-selector"\s*:\s*\[.*?"prefix"\s*:\s*"(?<prefix>.*?)"/s.exec(readFile(tree, '.eslintrc.json'))
						?.groups?.prefix || '';
				return chain([this.removeCurrentObliqueLinting(), this.addEslint(), this.addPrettier(), this.overwriteEslintRC(prefix), this.lintHTML()]);
			}
			return tree;
		});
	}

	private removeCurrentObliqueLinting(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Toolchain: Removing the actual linting script and dependencies');
			removeDevDependencies(tree, 'lint');
			removeScript(tree, 'prettier');
			removeScript(tree, 'lint');
			removeScript(tree, 'lint:fix');
			removeScript(tree, 'format');
			return tree;
		});
	}

	private addEslint(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Toolchain: Adding "eslint"');
			return externalSchematic('@angular-eslint/schematics', 'ng-add', {});
		});
	}

	private addPrettier(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Toolchain: Adding "prettier"');
			['prettier', 'eslint-config-prettier', 'eslint-plugin-prettier'].forEach(dependency => addDevDependency(tree, dependency));
			addScript(tree, 'format', 'npm run lint -- --fix');
			addFile(tree, '.prettierrc', getTemplate(tree, 'default-prettierrc.config'));
			return tree;
		});
	}

	private overwriteEslintRC(prefix: string): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Toolchain: overwrite ".eslintrc.json"');
			tree.overwrite('.eslintrc.json', this.formatEsLintRC(tree, prefix));
			return tree;
		});
	}

	private lintHTML(): Rule {
		return createSafeRule((tree: Tree, _context: SchematicContext) => {
			infoMigration(_context, 'Toolchain: ensure html files are linted');
			return addAngularConfigInList(tree, ['architect', 'lint', 'options', 'lintFilePatterns'], 'src/**/*.html');
		});
	}

	private formatEsLintRC(tree: Tree, prefix: string): string {
		const eslintFile = getTemplate(tree, 'default-eslintrc.json.config');
		return prefix ? eslintFile.replace(/APP_PREFIX/g, prefix) : eslintFile.replace(/\s*"@angular-eslint\/(?:component|directive)-selector": \[.*?],/gs, '');
	}
}
