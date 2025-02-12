import {NgModule} from '@angular/core';
import {
	MatLegacyPaginatorIntl as MatPaginatorIntl,
	MatLegacyPaginatorModule as MatPaginatorModule
} from '@angular/material/legacy-paginator';

import {ObPaginatorService} from './ob-paginator.service';
import {obliqueProviders} from '../utilities';

export {ObPaginatorService} from './ob-paginator.service';

@NgModule({
	imports: [MatPaginatorModule],
	exports: [MatPaginatorModule],
	providers: [ObPaginatorService, {provide: MatPaginatorIntl, useClass: ObPaginatorService}, ...obliqueProviders()]
})
export class ObPaginatorModule {}
