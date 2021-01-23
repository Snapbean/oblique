import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'ob-number-format',
	templateUrl: './number-format-sample.component.html'
})
export class ObNumberFormatSampleComponent {
	number1 = 5.236548;
	number2 = 5.236548;

	formData: FormGroup;

	constructor(fb: FormBuilder) {
		this.formData = fb.group({
			number5: 5.236548,
			number6: 5.236548
		});
	}

	setNumber5() {
		this.formData.patchValue({number5: 6.2356487});
	}

	setNumber6() {
		this.formData.patchValue({number6: 6.2356487});
	}
}
