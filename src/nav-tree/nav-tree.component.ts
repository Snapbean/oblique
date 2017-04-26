import {Component, Input, ViewEncapsulation} from '@angular/core';
import {INavTreeItemModel} from './nav-tree-item.model';

// FIXME: refactor useless factory when https://github.com/angular/angular/issues/14485
export function defaultLabelFormatterFactory() {
	const formatter = (item: INavTreeItemModel, filterPattern: string) => {
		return !filterPattern ? item.label : item.label.replace(
			new RegExp(filterPattern, 'ig'),
			(text) => {
				return `<span class="${NavTreeComponent.DEFAULTS.HIGHLIGHT}">${text}</span>`;
			}
		);
	};
	return formatter;
}

@Component({
	selector: 'nav-tree',
	exportAs: 'navTree',
	template: `
		<ul class="nav nav-tree nav-bordered nav-indented nav-hover" role="tree">
			<ng-content></ng-content>
			<ng-template ngFor [ngForOf]="items" let-item>
				<li class="nav-item open" role="presentation"
				    *ngIf="visible(item)">
					<a class="nav-link" role="treeitem" aria-selected="false"
					   [routerLink]="linkBuilder(item)" routerLinkActive="active"
					   (click)="item.collapsed = !item.collapsed"
					   [class.collapsed]="item.collapsed"
					   [attr.data-toggle]="item.items ? 'collapse' : null"
					   [attr.disabled]="item.disabled === true || null"
					   [attr.aria-controls]="item.items ? itemKey(item) : null">
						<span [innerHTML]="labelFormatter(item, filterPattern)"></span>
					</a>
					<div id="#{{itemKey(item)}}" class="collapse show"
					     *ngIf="item.items" [ngbCollapse]="item.collapsed">
						<nav-tree [items]="item.items"
						          [prefix]="itemKey(item)"
						          [filterPattern]="filterPattern"
						          [labelFormatter]="labelFormatter"
						          [linkBuilder]="linkBuilder"></nav-tree>
					</div>
				</li>
			</ng-template>
		</ul>
	`,
	// Ensure CSS styles are added to global styles as search pattern highlighting is done at runtime:
	// (see also: https://angular.io/docs/ts/latest/guide/component-styles.html#!#view-encapsulation)
	encapsulation: ViewEncapsulation.None,
	styles: [`
		.nav-tree-pattern-highlight {
			font-weight: bold;
			text-decoration: underline;
		}
	`]
})
export class NavTreeComponent {

	public static DEFAULTS = {
		HIGHLIGHT: 'nav-tree-pattern-highlight',
		LABEL_FORMATTER: defaultLabelFormatterFactory
	};

	@Input()
	items: Array<INavTreeItemModel>;

	@Input()
	prefix = 'nav-tree';

	@Input()
	filterPattern: string;

	@Input()
	labelFormatter: (item: INavTreeItemModel, filterPattern) => string = NavTreeComponent.DEFAULTS.LABEL_FORMATTER();

	@Input()
	linkBuilder(item: INavTreeItemModel): string {
		return item.id;
	};

	@Input()
	patternMatcher(item: INavTreeItemModel, pattern: string): boolean {
		let match = new RegExp(pattern, 'gi').test(item.label);
		return match || (item.items || []).some((subItem) => {
				return this.patternMatcher(subItem, pattern);
			});
	}

	visible(item: INavTreeItemModel) {
		return !this.filterPattern || this.patternMatcher(item, this.filterPattern);
	}

	itemKey(item: INavTreeItemModel) {
		return this.prefix + '-' + item.id;
	}

	collapse(items: INavTreeItemModel[], all: boolean = false) {
		items
			.filter((item) => item.items)
			.forEach((item: INavTreeItemModel) => {
				item.collapsed = true;
				if (all) {
					this.collapse(item.items, all);
				}
			});
	};

	expand(items: INavTreeItemModel[], all: boolean = false) {
		items
			.filter((item) => item.items)
			.forEach((item: INavTreeItemModel) => {
				item.collapsed = false;
				if (all) {
					this.expand(item.items, all);
				}
			});
	};

	// Public API:
	public collapseAll() {
		this.collapse(this.items, true);
	};

	public expandAll() {
		this.expand(this.items, true);
	}
}
