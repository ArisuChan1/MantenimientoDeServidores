import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaService } from 'src/app/services/alerta.service';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        DashboardRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [AlertaService, DialogService],
    declarations: [MainComponent, ChangeLogsComponent],
})
export class DashboardModule {}
