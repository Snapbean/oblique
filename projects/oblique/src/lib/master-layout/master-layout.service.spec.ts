import {TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ObMasterLayoutHeaderService} from './master-layout-header/master-layout-header.service';
import {ObMasterLayoutFooterService} from './master-layout-footer/master-layout-footer.service';
import {ObMasterLayoutComponentService} from './master-layout/master-layout.component.service';
import {ObMockTranslateService} from '../_mocks/mock-translate.service';
import {ObMockMasterLayoutConfig} from './mock/mock-master-layout.config';
import {ObMasterLayoutService} from './master-layout.service';
import {ObMasterLayoutConfig} from './master-layout.config';
import {ObMasterLayoutNavigationService} from './master-layout-navigation/master-layout-navigation.service';
import {ObMockMasterLayoutHeaderService} from './mock/mock-master-layout-header.service';
import {ObMockMasterLayoutFooterService} from './mock/mock-master-layout-footer.service';
import {ObMockMasterLayoutNavigationService} from './mock/mock-master-layout-navigation.service';
import {ObMockMasterLayoutComponentService} from './mock/mock-master-layout.component.service';
import {ObMockMasterLayoutService} from './mock/mock-master-layout.service';
import {ObLanguageService} from '../language/language.service';
import {ObMockLanguageService} from '../language/mock/mock-language.service';

describe('MasterLayoutService', () => {
	let masterLayoutService: ObMasterLayoutService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				{provide: TranslateService, useClass: ObMockTranslateService},
				{provide: ObMasterLayoutConfig, useClass: ObMockMasterLayoutConfig},
				{provide: ObMasterLayoutHeaderService, useClass: ObMockMasterLayoutHeaderService},
				{provide: ObMasterLayoutFooterService, useClass: ObMockMasterLayoutFooterService},
				{provide: ObMasterLayoutNavigationService, useClass: ObMockMasterLayoutNavigationService},
				{provide: ObMasterLayoutComponentService, useClass: ObMockMasterLayoutComponentService},
				{provide: ObMasterLayoutService, useClass: ObMockMasterLayoutService},
				{provide: ObLanguageService, useClass: ObMockLanguageService}
			]
		});
		masterLayoutService = TestBed.inject(ObMasterLayoutService);
	});

	it('should be created', () => {
		expect(masterLayoutService).toBeTruthy();
	});
});
