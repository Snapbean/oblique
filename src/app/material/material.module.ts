import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ObButtonModule, ObColumnLayoutModule, ObIconModule, ObInputClearModule, ObMandatoryModule, ObSelectableModule} from '@oblique/oblique';
import {ButtonComponent} from './button/button.component';
import {CardComponent} from './card/card.component';
import {ChipsComponent} from './chips/chips.component';
import {SliderComponent} from './slider/slider.component';
import {BadgeComponent} from './badge/badge.component';
import {DialogComponent} from './dialog/dialog.component';
import {ExampleDialogComponent} from './dialog/example-dialog/example-dialog.component';
import {ExpansionPanelComponent} from './expansion-panel/expansion-panel.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {TableComponent} from './table/table.component';
import {TooltipComponent} from './tooltip/tooltip.component';
import {StepperVerticalComponent} from './stepper-vertical/stepper-vertical.component';
import {StepperHorizontalComponent} from './stepper-horizontal/stepper-horizontal.component';
import {TabsComponent} from './tabs/tabs.component';
import {IconSampleComponent} from './icon/icon.sample.component';
import {MandatorySampleComponent} from './mandatory/mandatory.sample.component';
import {SharedModule} from '../common/shared.module';
import {FormComponent} from './form/form.component';

const appRoutes: Routes = [
	{path: 'badge', component: BadgeComponent},
	{path: 'button', component: ButtonComponent},
	{path: 'card', component: CardComponent},
	{path: 'chips', component: ChipsComponent},
	{path: 'dialog', component: DialogComponent},
	{path: 'expansion-panel', component: ExpansionPanelComponent},
	{path: 'form', component: FormComponent},
	{path: 'icon', component: IconSampleComponent},
	{path: 'mandatory', component: MandatorySampleComponent},
	{path: 'progress-bar', component: ProgressBarComponent},
	{path: 'slider', component: SliderComponent},
	{path: 'stepper-horizontal', component: StepperHorizontalComponent},
	{path: 'stepper-vertical', component: StepperVerticalComponent},
	{path: 'table', component: TableComponent},
	{path: 'tabs', component: TabsComponent},
	{path: 'tooltip', component: TooltipComponent},
	{path: '', redirectTo: 'card', pathMatch: 'full'}
];

@NgModule({
	declarations: [
		BadgeComponent,
		ButtonComponent,
		CardComponent,
		ChipsComponent,
		DialogComponent,
		ExampleDialogComponent,
		ExpansionPanelComponent,
		IconSampleComponent,
		MandatorySampleComponent,
		ProgressBarComponent,
		SliderComponent,
		StepperHorizontalComponent,
		StepperVerticalComponent,
		TabsComponent,
		TableComponent,
		TooltipComponent,
		FormComponent
	],
	imports: [
		CommonModule,
		ObButtonModule,
		ObColumnLayoutModule,
		ObInputClearModule,
		ObIconModule,
		ReactiveFormsModule,
		ObSelectableModule,
		FormsModule,
		RouterModule.forChild(appRoutes),
		MatAutocompleteModule,
		MatBadgeModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatOptionModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatRadioModule,
		MatSelectModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		ObMandatoryModule,
		CdkTableModule,
		SharedModule
	]
})
export class MaterialModule {}
