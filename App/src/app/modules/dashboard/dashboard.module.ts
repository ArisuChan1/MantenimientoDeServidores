import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaService } from 'src/app/services/alerta.service';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        DashboardRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [AlertaService],
    declarations: [MainComponent],
})
export class DashboardModule {}
