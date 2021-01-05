import {inject, TestBed} from '@angular/core/testing';
import {first} from 'rxjs/operators';
import {ObISpinnerEvent} from './spinner-event';
import {ObSpinnerService} from './spinner.service';

describe('SpinnerService', () => {
	let mockNotificationService;
	beforeEach(() => {
		mockNotificationService = {
			warning: jest.fn(),
			error: jest.fn(),
			success: jest.fn(),
			info: jest.fn()
		};

		TestBed.configureTestingModule({
			providers: [ObSpinnerService]
		});
	});

	it('should emit a SpinnerEvent if activated', inject([ObSpinnerService], (service: ObSpinnerService) => {
		service.events.pipe(first()).subscribe((event: ObISpinnerEvent) => {
			expect(event).toBe({active: true, channel: ObSpinnerService.CHANNEL});
		});
		service.activate();
	}));

	it('should emit a SpinnerEvent on a custom channel if activated', inject([ObSpinnerService], (service: ObSpinnerService) => {
		const channel = 'CUSTOM';
		service.events.pipe(first()).subscribe((event: ObISpinnerEvent) => {
			expect(event).toBe({active: true, channel: channel});
		});
		service.activate(channel);
	}));

	it('should emit a SpinnerEvent if deactivated', inject([ObSpinnerService], (service: ObSpinnerService) => {
		service.events.pipe(first()).subscribe((event: ObISpinnerEvent) => {
			expect(event).toBe({active: false, channel: ObSpinnerService.CHANNEL});
		});
		service.deactivate();
	}));

	it('should emit a SpinnerEvent on a custom channel if deactivated', inject([ObSpinnerService], (service: ObSpinnerService) => {
		const channel = 'CUSTOM';
		service.events.pipe(first()).subscribe((event: ObISpinnerEvent) => {
			expect(event).toBe({active: false, channel: channel});
		});
		service.deactivate(channel);
	}));
});
