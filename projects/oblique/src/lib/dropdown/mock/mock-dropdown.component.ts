import {Component, Input} from '@angular/core';

@Component({
	selector: 'ob-dropdown',
	exportAs: 'obDropdown',
	template: ''
})
export class ObMockDropdownComponent {
	id: string;
	isOpen = false;
	@Input() position = 'middle';

	toggle($event?: MouseEvent): void {}
}
