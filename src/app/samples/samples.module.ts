import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SampleDataResolver} from '../resolvers/sample-data.resolver';
import {SamplesRoutingModule} from './samples-routing.module';

import {CollapseSampleComponent} from './collapse/collapse-sample.component';
import {ObColumnLayoutSampleComponent} from './column-layout/column-layout-sample.component';
import {DatepickerSampleComponent} from './datepicker-sample/datepicker-sample.component';
import {ErrorMessagesSampleComponent} from './error-messages-sample/error-messages-sample.component';
import {FormControlStateSampleComponent} from './form-control-state-sample/form-control-state-sample.component';
import {FilterBoxSampleComponent, PatternFilterPipe} from './filter-box-sample/filter-box-sample.component';
import {InputClearComponent} from './input-clear/input-clear.component';
import {MasterLayoutSampleComponent} from './master-layout/master-layout-sample.component';
import {MultiselectSampleComponent} from './multiselect/multiselect-sample.component';
import {NavigableSampleComponent} from './navigable/navigable-sample.component';
import {NavigatorSampleModule} from './navigator-sample/navigator-sample.module';
import {NavigatorSampleRoutingModule} from './navigator-sample/navigator-sample-routing.module';
import {NavTreeDetailSampleComponent, NavTreeSampleComponent} from './nav-tree/nav-tree-sample.component';
import {NestedFormSampleComponent} from './nested-form/nested-form-sample.component';
import {NestedFormChildSampleComponent} from './nested-form/nested-form-child-sample.component';
import {NestedFormGrandChildSampleComponent} from './nested-form/nested-form-grandchild-sample.component';
import {NotificationSampleComponent} from './notification/notification-sample.component';
import {NumberFormatSampleComponent} from './number-format/number-format-sample.component';
import {SchemaValidationSampleComponent} from './schema-validation/schema-validation-sample.component';
import {ObUnknownRouteSampleComponent} from './unknown-route/unknown-route-sample.component';
import {UnsavedChangesSampleComponent} from './unsaved-changes/unsaved-changes-sample.component';
import {UnsavedChangesSampleModalComponent} from './unsaved-changes/unsaved-changes-sample-modal.component';
import {HttpInterceptorSampleComponent} from './http-interceptor/http-interceptor-sample.component';
import {ObStickySampleComponent} from './sticky/sticky-sample.component';
import {ObFormComponent} from './form/form.component';
import {ObButtonComponent} from './button/button.component';
import {
	ObCollapseModule,
	ObColumnLayoutModule,
	ObDatepickerModule,
	ObErrorMessagesModule,
	ObFilterBoxModule,
	ObFormControlStateModule,
	ObInputClearModule,
	ObMultiselectModule,
	ObNavigableModule,
	ObNavTreeModule,
	ObNestedFormModule,
	ObNotificationModule,
	ObNumberFormatModule,
	ObSchemaValidationModule,
	ObSearchBoxModule,
	ObSelectableModule,
	ObSpinnerModule,
	ObStickyModule,
	ObUnknownRouteModule,
	ObUnsavedChangesModule,
	ObUnsavedChangesTabsModule
} from 'oblique';
import {ObApiComponent} from '../api/api.component';
import {ObDescriptionComponent} from '../description/description.component';
import {ObApiElementComponent} from '../api/api-element.component';
import {ObPopUpSampleComponent} from './pop-up/pop-up-sample.component';
import {NestedFormChildTDSampleComponent} from './nested-form/nested-form-child-td-sample.component';
import {NestedFormGrandChildTDSampleComponent} from './nested-form/nested-form-grandchild-td-sample.component';
import {MultiTranslateLoaderSampleComponent} from './multi-tranlsate-loader/multi-translate-loader-sample.component';
import {ObSelectableSampleComponent} from './selectable/selectable-sample.component';
import {SpinnerSampleComponent} from './spinner-sample/spinner-sample.component';

@NgModule({
	imports: [
		CommonModule,
		ObCollapseModule,
		ObColumnLayoutModule,
		ObDatepickerModule,
		ObFilterBoxModule,
		ObErrorMessagesModule,
		ObFormControlStateModule,
		ObMultiselectModule,
		ObNavigableModule,
		ObNavTreeModule,
		ObNestedFormModule,
		ObNumberFormatModule,
		ObNotificationModule,
		ObSchemaValidationModule,
		ObSearchBoxModule,
		ObSelectableModule,
		ObSpinnerModule,
		ObStickyModule,
		ObInputClearModule,
		ObUnknownRouteModule,
		ObUnsavedChangesModule,
		ObUnsavedChangesTabsModule,

		TranslateModule,
		FormsModule,
		NgbModule,
		RouterModule,
		SamplesRoutingModule,
		NavigatorSampleModule,
		NavigatorSampleRoutingModule,
		ReactiveFormsModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	declarations: [
		ObButtonComponent,
		CollapseSampleComponent,
		ObColumnLayoutSampleComponent,
		DatepickerSampleComponent,
		ErrorMessagesSampleComponent,
		ObFormComponent,
		FormControlStateSampleComponent,
		FilterBoxSampleComponent,
		HttpInterceptorSampleComponent,
		InputClearComponent,
		PatternFilterPipe,
		MasterLayoutSampleComponent,
		MultiselectSampleComponent,
		NavigableSampleComponent,
		NavTreeSampleComponent,
		NavTreeDetailSampleComponent,
		NestedFormSampleComponent,
		NestedFormChildSampleComponent,
		NestedFormChildTDSampleComponent,
		NestedFormGrandChildSampleComponent,
		NestedFormGrandChildTDSampleComponent,
		NotificationSampleComponent,
		NumberFormatSampleComponent,
		SchemaValidationSampleComponent,
		ObSelectableSampleComponent,
		ObStickySampleComponent,
		ObUnknownRouteSampleComponent,
		UnsavedChangesSampleComponent,
		UnsavedChangesSampleModalComponent,
		ObApiComponent,
		ObApiElementComponent,
		ObDescriptionComponent,
		ObPopUpSampleComponent,
		MultiTranslateLoaderSampleComponent,
		SpinnerSampleComponent
	],
	exports: [RouterModule, ObApiComponent],
	providers: [SampleDataResolver],
	entryComponents: [UnsavedChangesSampleModalComponent]
})
export class SamplesModule {}
