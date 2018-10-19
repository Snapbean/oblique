import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {MasterLayoutConfig, MasterLayoutFooterComponent, MasterLayoutService, ScrollingConfig} from 'oblique-reactive';
import {MockTranslatePipe} from 'tests';

describe('MasterLayoutFooterComponent', () => {
	let component: MasterLayoutFooterComponent;
	let fixture: ComponentFixture<MasterLayoutFooterComponent>;

	const mockTranslateService = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use', 'getDefaultLang']);
	mockTranslateService.onLangChange = new EventEmitter();
	const mockScrolling = jasmine.createSpyObj('ScrollingConfig', ['']);
	const mockConfig = jasmine.createSpyObj('MasterLayoutConfig', ['']);
	mockConfig.footer = {};
	const mockService = jasmine.createSpyObj('MasterLayoutService', ['']);
	mockService.footerSmallEmitter = new EventEmitter();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MasterLayoutFooterComponent, MockTranslatePipe],
			providers: [
				{provide: MasterLayoutService, useValue: mockService},
				{provide: TranslateService, useValue: mockTranslateService},
				{provide: ScrollingConfig, useValue: mockScrolling},
				{provide: MasterLayoutConfig, useValue: mockConfig}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MasterLayoutFooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});