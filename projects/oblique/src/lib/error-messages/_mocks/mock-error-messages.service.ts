import {Injectable} from '@angular/core';
import {NgControl} from '@angular/forms';

@Injectable()
export class ObMockErrorMessagesService {
	createMessages(control: NgControl): {key: string; params: {[param: string]: any}}[] {
		return [];
	}
}
