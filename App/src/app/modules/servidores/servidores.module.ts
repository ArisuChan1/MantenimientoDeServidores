import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServidoresRoutingModule } from './servidores.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaService } from 'src/app/services/alerta.service';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CreateServidorComponent } from './components/create-servidor/create-servidor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MantenimientoServidorComponent } from './components/mantenimiento-servidor/mantenimiento-servidor.component';
import { CreateMantenimientoComponent } from './components/create-mantenimiento/create-mantenimiento.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        ServidoresRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [AlertaService, DialogService],
    declarations: [
        MainComponent,
        CreateServidorComponent,
        MantenimientoServidorComponent,
        CreateMantenimientoComponent,
    ],
})
export class ServidoresModule {}
