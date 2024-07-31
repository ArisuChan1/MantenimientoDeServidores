import { Component } from '@angular/core';
import { BaseDeDatos, Mantenimiento, Servidor } from 'src/app/interfaces/types';
import { routesConfig } from 'src/app/routes/routesConfig';
import { GeneralService } from 'src/app/services/general.service';
import Chart from 'chart.js/auto';

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

    barChart: Chart<'bar', any[], any>;
    pastelChart;
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
            this.setBarChart();
            this.setPastelChart();
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

    setBarChart() {
        // Todos los mantenimientos en cada mes del año
        this.barChart = new Chart('cvxBarChart', {
            type: 'bar',
            options: {
                plugins: {
                    title: {
                        text: 'Mantenimientos a lo largo del año',
                        display: true,
                    },
                },
            },
            data: {
                labels: this.getMonths(),
                datasets: [
                    {
                        label: 'Mantenimientos',
                        data: this.getMantenimientosByMonth(),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
        });
    }

    setPastelChart() {
        // Mantenimientos a bases de datos vs mantenimientos a servidores
        // altura 300px
        this.pastelChart = new Chart('cvxPastelChart', {
            type: 'doughnut',
            options: {
                plugins: {
                    title: {
                        text: 'Mantenimientos a bases de datos vs servidores',
                        display: true,
                    },
                },
            },
            data: {
                labels: ['Bases de datos', 'Servidores'],
                datasets: [
                    {
                        data: [
                            this.mantenimientos.filter(
                                (mantenimiento) =>
                                    mantenimiento.idBaseDeDatos !== null
                            ).length,
                            this.mantenimientos.filter(
                                (mantenimiento) =>
                                    mantenimiento.idServidor !== null
                            ).length,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });
    }

    getMonths() {
        const monthsAsString = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const months = [];
        for (let i = 0; i < 12; i++) {
            months.push(monthsAsString[i]);
        }
        return months;
    }

    getMantenimientosByMonth() {
        const mantenimientosByMonth = [];
        for (let i = 0; i < 12; i++) {
            const month = i + 1;
            const mantenimientos = this.mantenimientos.filter(
                (mantenimiento) =>
                    new Date(mantenimiento.fechaInicio).getMonth() === i
            );
            mantenimientosByMonth.push(mantenimientos.length);
        }
        return mantenimientosByMonth;
    }

    getMonthFormatted(month: number) {
        return this.getNumberFormatted(month + 1);
    }

    getNumberFormatted(value: number) {
        return value.toString().padStart(4, '0');
    }
}
