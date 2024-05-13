import { Component } from '@angular/core';
import {
    BaseDeDatos,
    EstadoMantenimiento,
    Mantenimiento,
    Razon,
    Servidor,
    Usuario,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    fechaSeleccionada = new Date();
    mantenimientos: Mantenimiento[] = [];
    mantenimientosByYear: Mantenimiento[] = [];
    estadosMantenimiento: EstadoMantenimiento[] = [];
    razones: Razon[] = [];
    basesDeDatos: BaseDeDatos[] = [];
    servidores: Servidor[] = [];
    usuarios: Usuario[] = [];

    constructor(private generalService: GeneralService) {
        this.getRazones();
        this.getBasesDeDatos();
        this.getServidores();
        this.getEstadosMantenimiento();
        this.getMantenimientos();
    }

    getMantenimientos() {
        this.generalService.MANTENIMIENTOS.get().subscribe((res) => {
            this.mantenimientos = res;
            this.filterMantenimientosByYear();
        });
    }

    filterMantenimientosByYear() {
        this.mantenimientosByYear = this.mantenimientos.filter(
            (mantenimiento) =>
                new Date(mantenimiento.fechaInicio).getFullYear() ===
                this.fechaSeleccionada.getFullYear()
        );
    }

    getRazones() {
        this.generalService.RAZONES.get().subscribe((res) => {
            this.razones = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
        });
    }

    getEstadosMantenimiento() {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((res) => {
            this.estadosMantenimiento = res;
        });
    }

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    getRazonById(id: number) {
        return this.razones.find((razon) => razon.id === id);
    }

    getBaseDeDatosById(id: number) {
        return this.basesDeDatos.find((base) => base.id === id);
    }

    getServidorById(id: number) {
        return this.servidores.find((servidor) => servidor.id === id);
    }

    getUsuarioById(id: number) {
        return this.usuarios.find((usuario) => usuario.id === id);
    }

    getEstadoMantenimientoById(id: number) {
        return this.estadosMantenimiento.find((estado) => estado.id === id);
    }
}
