import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
	selector: '[obSchemaValidate][ngModel],[obSchemaValidate][formControlName]',
	providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => ObMockSchemaValidateDirective), multi: true}]
})
export class ObMockSchemaValidateDirective implements Validator {
	validate(formControl: FormControl): ValidationErrors {
		return null;
	}
}
