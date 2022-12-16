import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';

import {ObColumnLayoutComponent} from './column-layout.component';
import {ObColumnToggleDirective} from './column-toggle.directive';
import {ObColumnPanelDirective} from './column-panel.directive';

import {requireAndRecordTelemetry} from '../telemetry/telemetry-require';
import {ObTelemetryService} from '../telemetry/telemetry.service';
import {obliqueProviders} from '../utilities';

export {ObColumnLayoutComponent} from './column-layout.component';
export {ObColumnPanelDirective} from './column-panel.directive';
export {ObColumnToggleDirective} from './column-toggle.directive';

@NgModule({
	imports: [CommonModule, MatIconModule, TranslateModule],
	declarations: [ObColumnLayoutComponent, ObColumnPanelDirective, ObColumnToggleDirective],
	providers: obliqueProviders(),
	exports: [ObColumnLayoutComponent, ObColumnPanelDirective, ObColumnToggleDirective]
})
export class ObColumnLayoutModule {
	constructor(telemetry: ObTelemetryService) {
		requireAndRecordTelemetry(telemetry, ObColumnLayoutModule);
	}
}
