import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServidoresRoutingModule } from './servidores.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CreateServidorComponent } from './components/create-servidor/create-servidor.component';
import { MantenimientoServidorComponent } from './components/mantenimiento-servidor/mantenimiento-servidor.component';
import { CreateMantenimientoComponent } from './components/create-mantenimiento/create-mantenimiento.component';
import { BasesDeDatosServidorComponent } from './components/bases-de-datos-servidor/bases-de-datos-servidor.component';
import { CreateBaseDeDatosComponent } from './components/create-base-de-datos/create-base-de-datos.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';
import { BasesdeDatosComponent } from './components/bases-de-datos/main.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        ServidoresRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
    declarations: [
        MainComponent,
        BasesdeDatosComponent,
        CreateServidorComponent,
        MantenimientoServidorComponent,
        CreateMantenimientoComponent,
        BasesDeDatosServidorComponent,
        CreateBaseDeDatosComponent,
        EditPerfilComponent,
    ],
    providers: [DialogService],
})
export class ServidoresModule {}
