import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {ObUnsavedChangesService} from './unsaved-changes.service';

@Directive({
	selector: '[obUnsavedChanges]',
	exportAs: 'obUnsavedChanges',
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {class: 'ob-unsaved-changes'}
})
export class ObUnsavedChangesDirective implements OnDestroy, OnInit {
	@Input() id;

	constructor(private readonly unsavedChangesService: ObUnsavedChangesService, private readonly form: ControlContainer) {}

	ngOnInit() {
		if (!this.id) {
			throw new Error('obUnsavedChanges directive needs an "id" attribute.');
		}
		this.unsavedChangesService.watch(this.id, this.form);
	}

	ngOnDestroy() {
		this.unsavedChangesService.unWatch(this.id);
	}
}
