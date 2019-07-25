import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material';

import {UnsavedChangesTabsDirective} from './unsaved-changes-tabs.directive';
import {UnsavedChangesTabsService} from './unsaved-changes-tabs.service';
import {UnsavedChangesModule} from '../unsaved-changes/unsaved-changes.module';

export {UnsavedChangesTabsDirective} from './unsaved-changes-tabs.directive';
export {UnsavedChangesTabsService} from './unsaved-changes-tabs.service';

@NgModule({
	imports: [CommonModule, UnsavedChangesModule],
	declarations: [UnsavedChangesTabsDirective],
	providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
	exports: [UnsavedChangesTabsDirective]
})
export class UnsavedChangesTabsModule {
}
