import { Component } from '@angular/core';
import {
    Ambiente,
    Ciudad,
    Rol,
    SistemaOperativo,
    TipoServidor,
    Estado,
    EstadoMantenimiento,
    Motor,
    Razon,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    ambientes: Ambiente[] = [];
    newAmbiente: Ambiente = {
        id: 0,
        descripcion: '',
    };

    ciudades: Ciudad[] = [];
    newCiudad: Ciudad = {
        id: 0,
        descripcion: '',
        idRegion: 0,
    };

    roles: Rol[] = [];
    newRol: Rol = {
        id: 0,
        descripcion: '',
    };

    sistemasOperativos: SistemaOperativo[] = [];
    newSistemaOperativo: SistemaOperativo = {
        id: 0,
        descripcion: '',
    };

    tiposServidores: TipoServidor[] = [];
    newTipoServidor: TipoServidor = {
        id: 0,
        descripcion: '',
    };

    estados: Estado[] = [];
    newEstado: Estado = {
        id: 0,
        descripcion: '',
        ocupado: false,
    };

    estadosMantenimiento: EstadoMantenimiento[] = [];
    newEstadoMantenimiento: EstadoMantenimiento = {
        id: 0,
        descripcion: '',
        terminado: false,
    };

    motores: Motor[] = [];
    newMotor: Motor = {
        id: 0,
        descripcion: '',
    };

    razones: Razon[] = [];
    newRazon: Razon = {
        id: 0,
        descripcion: '',
    };

    VISIBLE_DIALOGS = {
        AMBIENTE: {
            key: 'AMBIENTE',
            value: false,
        },
        CIUDAD: {
            key: 'CIUDAD',
            value: false,
        },
        ROL: {
            key: 'ROL',
            value: false,
        },
        SISTEMA_OPERATIVO: {
            key: 'SISTEMA_OPERATIVO',
            value: false,
        },
        TIPO_SERVIDOR: {
            key: 'TIPO_SERVIDOR',
            value: false,
        },
        ESTADO: {
            key: 'ESTADO',
            value: false,
        },
        ESTADO_MANTENIMIENTO: {
            key: 'ESTADO_MANTENIMIENTO',
            value: false,
        },
        MOTOR: {
            key: 'MOTOR',
            value: false,
        },
        RAZON: {
            key: 'RAZON',
            value: false,
        },
    };

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService
    ) {
        this.getAmbientes();
        this.getCiudades();
        this.getRoles();
        this.getSistemasOperativos();
        this.getTiposServidores();
        this.getEstados();
        this.getEstadosMantenimiento();
        this.getMotores();
        this.getRazones();
    }

    getAmbientes(): void {
        this.generalService.AMBIENTES.get().subscribe((data) => {
            this.ambientes = data;
        });
    }

    getCiudades(): void {
        this.generalService.CIUDADES.get().subscribe((data) => {
            this.ciudades = data;
        });
    }

    getRoles(): void {
        this.generalService.ROLES.get().subscribe((data) => {
            this.roles = data;
        });
    }

    getSistemasOperativos(): void {
        this.generalService.SISTEMAS_OPERATIVOS.get().subscribe((data) => {
            this.sistemasOperativos = data;
        });
    }

    getTiposServidores(): void {
        this.generalService.TIPOS_SERVIDORES.get().subscribe((data) => {
            this.tiposServidores = data;
        });
    }

    getEstados(): void {
        this.generalService.ESTADOS.get().subscribe((data) => {
            this.estados = data;
        });
    }

    getEstadosMantenimiento(): void {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((data) => {
            this.estadosMantenimiento = data;
        });
    }

    getMotores(): void {
        this.generalService.MOTORES.get().subscribe((data) => {
            this.motores = data;
        });
    }

    getRazones(): void {
        this.generalService.RAZONES.get().subscribe((data) => {
            this.razones = data;
        });
    }

    addAmbiente(): void {
        // 1. Validar
        if (!this.newAmbiente.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newAmbiente.id) {
            this.updateAmbiente(this.newAmbiente);
            return;
        }

        this.VISIBLE_DIALOGS.AMBIENTE.value = false;
        this.generalService.AMBIENTES.post(this.newAmbiente).subscribe(() => {
            this.getAmbientes();
        });
    }

    addCiudad(): void {
        // 1. Validar
        if (!this.newCiudad.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        this.VISIBLE_DIALOGS.CIUDAD.value = false;

        // Si tiene id, es una actualización
        if (this.newCiudad.id) {
            this.updateCiudad(this.newCiudad);
            return;
        }

        this.generalService.CIUDADES.post(this.newCiudad).subscribe(() => {
            this.getCiudades();
        });
    }

    addRol(): void {
        // 1. Validar
        if (!this.newRol.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newRol.id) {
            this.updateRol(this.newRol);
            return;
        }

        this.VISIBLE_DIALOGS.ROL.value = false;

        this.generalService.ROLES.post(this.newRol).subscribe(() => {
            this.getRoles();
        });
    }

    addSistemaOperativo(): void {
        // 1. Validar
        if (!this.newSistemaOperativo.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newSistemaOperativo.id) {
            this.updateSistemaOperativo(this.newSistemaOperativo);
            return;
        }

        this.VISIBLE_DIALOGS.SISTEMA_OPERATIVO.value = false;

        this.generalService.SISTEMAS_OPERATIVOS.post(
            this.newSistemaOperativo
        ).subscribe(() => {
            this.getSistemasOperativos();
        });
    }

    addTipoServidor(): void {
        // 1. Validar
        if (!this.newTipoServidor.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newTipoServidor.id) {
            this.updateTipoServidor(this.newTipoServidor);
            return;
        }

        this.VISIBLE_DIALOGS.TIPO_SERVIDOR.value = false;

        this.generalService.TIPOS_SERVIDORES.post(
            this.newTipoServidor
        ).subscribe(() => {
            this.getTiposServidores();
        });
    }

    addEstado(): void {
        // 1. Validar
        if (!this.newEstado.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newEstado.id) {
            this.updateEstado(this.newEstado);
            return;
        }

        this.VISIBLE_DIALOGS.ESTADO.value = false;

        this.generalService.ESTADOS.post(this.newEstado).subscribe(() => {
            this.getEstados();
        });
    }

    addEstadoMantenimiento(): void {
        // 1. Validar
        if (!this.newEstadoMantenimiento.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newEstadoMantenimiento.id) {
            this.updateEstadoMantenimiento(this.newEstadoMantenimiento);
            return;
        }

        this.VISIBLE_DIALOGS.ESTADO_MANTENIMIENTO.value = false;

        this.generalService.ESTADOS_MANTENIMIENTO.post(
            this.newEstadoMantenimiento
        ).subscribe(() => {
            this.getEstadosMantenimiento();
        });
    }

    addMotor(): void {
        // 1. Validar
        if (!this.newMotor.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newMotor.id) {
            this.updateMotor(this.newMotor);
            return;
        }

        this.VISIBLE_DIALOGS.MOTOR.value = false;

        this.generalService.MOTORES.post(this.newMotor).subscribe(() => {
            this.getMotores();
        });
    }

    addRazon(): void {
        // 1. Validar
        if (!this.newRazon.descripcion) {
            this.alerta.warn('Debe ingresar una descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newRazon.id) {
            this.updateRazon(this.newRazon);
            return;
        }

        this.VISIBLE_DIALOGS.RAZON.value = false;

        this.generalService.RAZONES.post(this.newRazon).subscribe(() => {
            this.getRazones();
        });
    }

    updateAmbiente(ambiente: Ambiente): void {
        this.generalService.AMBIENTES.put(ambiente.id, ambiente).subscribe(
            () => {
                this.getAmbientes();
                this.VISIBLE_DIALOGS.AMBIENTE.value = false;
            }
        );
    }

    updateCiudad(ciudad: Ciudad): void {
        this.generalService.CIUDADES.put(ciudad.id, ciudad).subscribe(() => {
            this.getCiudades();
            this.VISIBLE_DIALOGS.CIUDAD.value = false;
        });
    }

    updateRol(rol: Rol): void {
        this.generalService.ROLES.put(rol.id, rol).subscribe(() => {
            this.getRoles();
            this.VISIBLE_DIALOGS.ROL.value = false;
        });
    }

    updateSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        this.generalService.SISTEMAS_OPERATIVOS.put(
            sistemaOperativo.id,
            sistemaOperativo
        ).subscribe(() => {
            this.getSistemasOperativos();
            this.VISIBLE_DIALOGS.SISTEMA_OPERATIVO.value = false;
        });
    }

    updateTipoServidor(tipoServidor: TipoServidor): void {
        this.generalService.TIPOS_SERVIDORES.put(
            tipoServidor.id,
            tipoServidor
        ).subscribe(() => {
            this.getTiposServidores();
            this.VISIBLE_DIALOGS.TIPO_SERVIDOR.value = false;
        });
    }

    updateEstado(estado: Estado): void {
        this.generalService.ESTADOS.put(estado.id, estado).subscribe(() => {
            this.getEstados();
            this.VISIBLE_DIALOGS.ESTADO.value = false;
        });
    }

    updateEstadoMantenimiento(estadoMantenimiento: EstadoMantenimiento): void {
        this.generalService.ESTADOS_MANTENIMIENTO.put(
            estadoMantenimiento.id,
            estadoMantenimiento
        ).subscribe(() => {
            this.getEstadosMantenimiento();
            this.VISIBLE_DIALOGS.ESTADO_MANTENIMIENTO.value = false;
        });
    }

    updateMotor(motor: Motor): void {
        this.generalService.MOTORES.put(motor.id, motor).subscribe(() => {
            this.getMotores();
            this.VISIBLE_DIALOGS.MOTOR.value = false;
        });
    }

    updateRazon(razon: Razon): void {
        this.generalService.RAZONES.put(razon.id, razon).subscribe(() => {
            this.getRazones();
            this.VISIBLE_DIALOGS.RAZON.value = false;
        });
    }

    deleteAmbiente(ambiente: Ambiente): void {
        this.generalService.AMBIENTES.delete(ambiente.id).subscribe(() => {
            this.getAmbientes();
            this.VISIBLE_DIALOGS.AMBIENTE.value = false;
        });
    }

    deleteCiudad(ciudad: Ciudad): void {
        this.generalService.CIUDADES.delete(ciudad.id).subscribe(() => {
            this.getCiudades();
            this.VISIBLE_DIALOGS.CIUDAD.value = false;
        });
    }

    deleteRol(rol: Rol): void {
        this.generalService.ROLES.delete(rol.id).subscribe(() => {
            this.getRoles();
            this.VISIBLE_DIALOGS.ROL.value = false;
        });
    }

    deleteSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        this.generalService.SISTEMAS_OPERATIVOS.delete(
            sistemaOperativo.id
        ).subscribe(() => {
            this.getSistemasOperativos();
            this.VISIBLE_DIALOGS.SISTEMA_OPERATIVO.value = false;
        });
    }

    deleteTipoServidor(tipoServidor: TipoServidor): void {
        this.generalService.TIPOS_SERVIDORES.delete(tipoServidor.id).subscribe(
            () => {
                this.getTiposServidores();
                this.VISIBLE_DIALOGS.TIPO_SERVIDOR.value = false;
            }
        );
    }

    deleteEstado(estado: Estado): void {
        this.generalService.ESTADOS.delete(estado.id).subscribe(() => {
            this.getEstados();
            this.VISIBLE_DIALOGS.ESTADO.value = false;
        });
    }

    deleteEstadoMantenimiento(estadoMantenimiento: EstadoMantenimiento): void {
        this.generalService.ESTADOS_MANTENIMIENTO.delete(
            estadoMantenimiento.id
        ).subscribe(() => {
            this.getEstadosMantenimiento();
            this.VISIBLE_DIALOGS.ESTADO_MANTENIMIENTO.value = false;
        });
    }

    deleteMotor(motor: Motor): void {
        this.generalService.MOTORES.delete(motor.id).subscribe(() => {
            this.getMotores();
            this.VISIBLE_DIALOGS.MOTOR.value = false;
        });
    }

    deleteRazon(razon: Razon): void {
        this.generalService.RAZONES.delete(razon.id).subscribe(() => {
            this.getRazones();
            this.VISIBLE_DIALOGS.RAZON.value = false;
        });
    }

    clearAmbiente(): void {
        this.newAmbiente = {
            id: 0,
            descripcion: '',
        };
    }

    clearCiudad(): void {
        this.newCiudad = {
            id: 0,
            descripcion: '',
            idRegion: 0,
        };
    }

    clearRol(): void {
        this.newRol = {
            id: 0,
            descripcion: '',
        };
    }

    clearSistemaOperativo(): void {
        this.newSistemaOperativo = {
            id: 0,
            descripcion: '',
        };
    }

    clearTipoServidor(): void {
        this.newTipoServidor = {
            id: 0,
            descripcion: '',
        };
    }

    clearEstado(): void {
        this.newEstado = {
            id: 0,
            descripcion: '',
            ocupado: false,
        };
    }

    clearEstadoMantenimiento(): void {
        this.newEstadoMantenimiento = {
            id: 0,
            descripcion: '',
            terminado: false,
        };
    }

    clearMotor(): void {
        this.newMotor = {
            id: 0,
            descripcion: '',
        };
    }

    clearRazon(): void {
        this.newRazon = {
            id: 0,
            descripcion: '',
        };
    }

    openUpdateAmbiente(ambiente: Ambiente): void {
        this.newAmbiente = ambiente;
        this.openDialog('AMBIENTE');
    }

    openUpdateCiudad(ciudad: Ciudad): void {
        this.newCiudad = ciudad;
        this.openDialog('CIUDAD');
    }

    openUpdateRol(rol: Rol): void {
        this.newRol = rol;
        this.openDialog('ROL');
    }

    openUpdateSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        this.newSistemaOperativo = sistemaOperativo;
        this.openDialog('SISTEMA_OPERATIVO');
    }

    openUpdateTipoServidor(tipoServidor: TipoServidor): void {
        this.newTipoServidor = tipoServidor;
        this.openDialog('TIPO_SERVIDOR');
    }

    openUpdateEstado(estado: Estado): void {
        this.newEstado = estado;
        this.openDialog('ESTADO');
    }

    openUpdateEstadoMantenimiento(
        estadoMantenimiento: EstadoMantenimiento
    ): void {
        this.newEstadoMantenimiento = estadoMantenimiento;
        this.openDialog('ESTADO_MANTENIMIENTO');
    }

    openUpdateMotor(motor: Motor): void {
        this.newMotor = motor;
        this.openDialog('MOTOR');
    }

    openUpdateRazon(razon: Razon): void {
        this.newRazon = razon;
        this.openDialog('RAZON');
    }

    openCreateAmbiente(): void {
        this.clearAmbiente();
        this.openDialog('AMBIENTE');
    }

    openCreateCiudad(): void {
        this.clearCiudad();
        this.openDialog('CIUDAD');
    }

    openCreateRol(): void {
        this.clearRol();
        this.openDialog('ROL');
    }

    openCreateSistemaOperativo(): void {
        this.clearSistemaOperativo();
        this.openDialog('SISTEMA_OPERATIVO');
    }

    openCreateTipoServidor(): void {
        this.clearTipoServidor();
        this.openDialog('TIPO_SERVIDOR');
    }

    openCreateEstado(): void {
        this.clearEstado();
        this.openDialog('ESTADO');
    }

    openCreateEstadoMantenimiento(): void {
        this.clearEstadoMantenimiento();
        this.openDialog('ESTADO_MANTENIMIENTO');
    }

    openCreateMotor(): void {
        this.clearMotor();
        this.openDialog('MOTOR');
    }

    openCreateRazon(): void {
        this.clearRazon();
        this.openDialog('RAZON');
    }

    openDialog(dialog: string): void {
        const dialogObj = this.VISIBLE_DIALOGS[dialog] as
            | typeof this.VISIBLE_DIALOGS.AMBIENTE
            | null;

        if (dialogObj) {
            dialogObj.value = true;
        }
    }

    closeDialog(dialog: string): void {
        const dialogObj = this.VISIBLE_DIALOGS[dialog] as
            | typeof this.VISIBLE_DIALOGS.AMBIENTE
            | null;

        if (dialogObj) {
            dialogObj.value = false;
        }
    }
}
