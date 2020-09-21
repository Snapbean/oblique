import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	IterableChangeRecord,
	IterableDiffer,
	IterableDiffers,
	Output,
	QueryList,
	ViewEncapsulation
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ObUnsubscribable} from '../unsubscribe.class';
import {ObNavigableDirective, ObNavigableOnChangeEvent, ObNavigableOnMoveEvent} from './navigable.directive';

/**
 * @deprecated since version 5.0.0. This module is complex, buggy and never used as intended. It will be removed without replacement in future version.
 * If you have a use case for it, please contact oblique@bit.admin.ch.
 * * to use the keyboard navigation, add a <code>tabindex</code> on each element and navigate with <kbd>tab</tbd> or <kbd>shift</tbd> + <kbd>tab</tbd>
 * * to use the hover effect on buttons use the <code>hover-visible</code> class.
 * * to use the multiple items selection, use the <code>obSelectable</code> directive
 * * the items reordering feature will be lost, but is incomplete anyway
 */
@Component({
	selector: 'ob-navigable-group',
	exportAs: 'obNavigableGroup',
	template: '<ng-content></ng-content>',
	styleUrls: ['./navigable-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {class: 'ob-navigable-group'}
})
export class ObNavigableGroupComponent extends ObUnsubscribable implements AfterContentInit {
	/**
	 * A collection containing all data models of the current group.
	 */
	@Input('items')
	items: any[];

	@ContentChildren(ObNavigableDirective)
	navigables: QueryList<ObNavigableDirective>;
	@Output()
	selectionOnChange = new EventEmitter();

	/**
	 * A collection which will contain the selected data models.
	 */
	@Input('selection')
	get selection() {
		return this.selectionValue;
	}

	set selection(val: any[]) {
		this.selectionValue = val;
		this.selectionOnChange.emit(this.selectionValue);
	}

	private selectionValue: any[];
	private readonly differ: IterableDiffer<ObNavigableDirective> = null;

	constructor(private readonly differs: IterableDiffers) {
		super();
		this.differ = this.differs.find([]).create(null);
	}

	ngAfterContentInit(): void {
		// Initialize events for navigable directives:
		this.navigables.forEach(navigable => {
			this.registerNavigableEvents(navigable);
		});

		// Create initial difference to track navigable list changes:
		this.differ.diff(this.navigables.toArray());

		// Listen to navigable list changes:
		this.navigables.changes.pipe(takeUntil(this.unsubscribe)).subscribe((changes: QueryList<ObNavigableDirective>) => {
			const diff = this.differ.diff(changes.toArray());
			diff.forEachAddedItem((record: IterableChangeRecord<ObNavigableDirective>) => {
				this.registerNavigableEvents(record.item);
			});
		});
	}

	// Public API ---------------------
	public add(model: any) {
		const navigableToSelect = this.navigables.find((navigable: ObNavigableDirective) => navigable.model === model);

		if (navigableToSelect) {
			this.select(navigableToSelect, true);
		}
	}

	public remove(model: any) {
		const navigableToRemove = this.navigables.find((navigable: ObNavigableDirective) => navigable.model === model);

		if (navigableToRemove) {
			this.deactivate(navigableToRemove, true);
		}
	}

	// Private API ---------------------
	private registerNavigableEvents(navigable: ObNavigableDirective) {
		this.registerOnActivation(navigable);
		this.registerOnChange(navigable);
		this.registerOnMouseDown(navigable);
		this.registerOnFocus(navigable);
		this.registerOnMove(navigable);
	}

	//START Refactoring
	private registerOnActivation(navigable: ObNavigableDirective) {
		navigable.navigableOnActivation.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.addToSelection(navigable);
		});
	}

	private registerOnChange(navigable: ObNavigableDirective) {
		navigable.navigableOnChange.pipe(takeUntil(this.unsubscribe)).subscribe(($event: ObNavigableOnChangeEvent) => {
			const index = this.indexOf(navigable);
			let next: ObNavigableDirective = null;

			if ($event.code === 'ArrowUp') {
				next = this.fromIndex(Math.max(index - 1, 0));
			} else if ($event.code === 'ArrowDown') {
				next = this.fromIndex(Math.min(index + 1, this.navigables.length));
			}

			if (next) {
				if (next.selected) {
					this.deselect(navigable);
				}

				this.activate(next, $event.combine);
				next.focus();
			}
		});
	}

	private registerOnMouseDown(navigable: ObNavigableDirective) {
		navigable.navigableOnMouseDown.pipe(takeUntil(this.unsubscribe)).subscribe(($event: MouseEvent) => {
			if ($event && $event.shiftKey) {
				this.selectChildRange(navigable);
			} else if ($event && $event.ctrlKey) {
				// eslint-disable-next-line no-unused-expressions
				navigable.selected ? this.removeFromSelection(navigable) : this.addToSelection(navigable);
			} else {
				this.navigables.forEach(child => {
					if (child !== navigable) {
						this.deactivate(child, true);
					}
				});

				this.addToSelection(navigable);
			}

			// In any case, deactivate current active navigable item:
			this.deactivate(this.getActive());
		});
	}

	private registerOnFocus(navigable: ObNavigableDirective) {
		navigable.navigableOnFocus.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			if (!navigable.active) {
				// When a child is about to receive focus, deactivate the other items:
				this.navigables.forEach(child => child !== navigable && this.deactivate(child, true)); //TODO: take a look at this
				this.addToSelection(navigable);
			}
		});
	}

	private registerOnMove(navigable: ObNavigableDirective) {
		navigable.navigableOnMove.pipe(takeUntil(this.unsubscribe)).subscribe(($event: ObNavigableOnMoveEvent) => {
			if (!$event.prevented) {
				const from = this.indexOf(navigable);

				if ($event.code === 'ArrowUp') {
					const to = from - 1;
					if (to >= 0) {
						this.items.splice(to, 0, this.items.splice(from, 1)[0]);
					}
				} else if ($event.code === 'ArrowDown') {
					const to = from + 1;
					if (to < this.items.length) {
						this.items.splice(to, 0, this.items.splice(from, 1)[0]);
					}
				}
			}
		});
	}

	//END Refactoring

	private activate(navigable: ObNavigableDirective, combine = false) {
		this.navigables.forEach(child => child !== navigable && this.deactivate(child)); //TODO: take a look at this

		navigable.active = true;
		this.select(navigable, combine);
	}

	private deactivate(navigable: ObNavigableDirective, unselect = false) {
		if (navigable) {
			navigable.active = false;

			if (unselect) {
				this.deselect(navigable);
			}
		}
	}

	private select(navigable: ObNavigableDirective, combine = false) {
		if (!combine) {
			this.navigables.forEach(child => this.deselect(child));
		}
		navigable.selected = true;
		this.addToSelection(navigable);
	}

	private deselect(navigable: ObNavigableDirective) {
		navigable.selected = false;
		this.removeFromSelection(navigable);
	}

	private selectChildRange(target: ObNavigableDirective, combine = false) {
		const from = this.indexOf(this.getActive());
		if (!combine) {
			this.navigables.forEach(child => this.deselect(child));
		}
		const to = this.indexOf(target);
		const selection = this.navigables.toArray().slice(Math.min(from, to), Math.max(from, to) + 1);
		selection.forEach(child => child !== target && this.select(child, true));
	}

	private addToSelection(navigable) {
		if (!this.inSelection(navigable)) {
			this.selection.push(navigable.model);
		}
	}

	private removeFromSelection(navigable) {
		this.selection.splice(this.selection.indexOf(navigable.model), 1);
	}

	private inSelection(navigable) {
		return this.selection.indexOf(navigable.model) > -1;
	}

	private getActive() {
		return this.navigables.toArray().filter(child => child.active)[0];
	}

	private fromIndex(index: number): ObNavigableDirective {
		return this.navigables.toArray()[index];
	}

	private indexOf(child: ObNavigableDirective): number {
		return this.navigables.toArray().indexOf(child);
	}
}
