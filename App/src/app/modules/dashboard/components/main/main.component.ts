import { Component } from '@angular/core';
import { BaseDeDatos, Mantenimiento, Servidor } from 'src/app/interfaces/types';
import { routesConfig } from 'src/app/routes/routesConfig';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    routes = routesConfig;
    basesDeDatos: BaseDeDatos[] = [];
    servidores: Servidor[] = [];
    mantenimientos: Mantenimiento[] = [];
    mantenimientosWPerfilPending: Mantenimiento[] = [];
    mantenimientosWPerfilCompleted: Mantenimiento[] = [];
    mantenimientosDBAutomaticosMesActual: Mantenimiento[] = [];
    mantenimientosDbAutomaticosRunning: Mantenimiento[] = [];
    constructor(private generalService: GeneralService) {
        this.getBasesDeDatos();
        this.getServidores();
        this.getMantenimientos();
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((data) => {
            this.basesDeDatos = data;
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((data) => {
            this.servidores = data;
        });
    }

    getMantenimientos() {
        this.generalService.MANTENIMIENTOS.get().subscribe((data) => {
            this.mantenimientos = data;
            this.setMantenimientosWPerfilPending();
            this.setMantenimientosWPerfilCompleted();
            this.setMantenimientosDBAutomaticosMesActual();
            this.setMantenimientosDbAutomaticosRunning();
        });
    }

    setMantenimientosWPerfilPending() {
        this.mantenimientosWPerfilPending = this.mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.requierePerfil &&
                [1, 2, 3].includes(mantenimiento.idEstado)
        );
    }

    setMantenimientosWPerfilCompleted() {
        this.mantenimientosWPerfilCompleted = this.mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.requierePerfil && mantenimiento.idEstado === 4
        );
    }

    setMantenimientosDBAutomaticosMesActual() {
        this.mantenimientosDBAutomaticosMesActual = this.mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.idBaseDeDatos !== null &&
                mantenimiento.idServidor === null &&
                mantenimiento.idEstado === 4 &&
                mantenimiento.automatica &&
                new Date(mantenimiento.fechaInicio).getMonth() ===
                    new Date().getMonth()
        );
    }

    setMantenimientosDbAutomaticosRunning() {
        this.mantenimientosDbAutomaticosRunning =
            this.mantenimientosDBAutomaticosMesActual.filter(
                (mantenimiento) =>
                    mantenimiento.idEstado === 2 || mantenimiento.idEstado === 3
            );
    }

    getNumberFormatted(value: number) {
        return value.toString().padStart(4, '0');
    }
}
