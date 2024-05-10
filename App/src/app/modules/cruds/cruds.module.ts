import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudsRoutingModule } from './cruds.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaService } from 'src/app/services/alerta.service';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { GeneralService } from 'src/app/services/general.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        HttpClientModule,
        SharedModule,
        CrudsRoutingModule,
    ],
    providers: [AlertaService, DialogService, GeneralService],
    declarations: [MainComponent],
})
export class CrudsModule {}
