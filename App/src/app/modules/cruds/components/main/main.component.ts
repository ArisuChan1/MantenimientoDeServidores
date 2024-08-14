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
    BaseDeDatos,
    Servidor,
    Usuario,
    Mantenimiento,
} from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    providers: [ConfirmationService],
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

    basesDeDatos: BaseDeDatos[] = [];
    servidores: Servidor[] = [];
    mantenimientos: Mantenimiento[] = [];
    usuarios: Usuario[] = [];

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
        private alerta: AlertaService,
        private confirmationService: ConfirmationService
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
        this.getServidores();
        this.getBasesDeDatos();
        this.getUsuarios();
        this.getnManteminientos();
        this.alerta.info(
            'Bienvenido a la sección de mantenimiento de catálogos'
        );
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

    getUsuarios(): void {
        this.generalService.USUARIOS.get().subscribe((data) => {
            this.usuarios = data;
        });
    }

    getBasesDeDatos(): void {
        this.generalService.BASE_DE_DATOS.get().subscribe((data) => {
            this.basesDeDatos = data;
        });
    }

    getServidores(): void {
        this.generalService.SERVIDORES.get().subscribe((data) => {
            this.servidores = data;
        });
    }

    getnManteminientos(): void {
        this.generalService.MANTENIMIENTOS.get().subscribe((data) => {
            this.mantenimientos = data;
        });
    }

    addAmbiente(): void {
        // 1. Validar
        if (!this.newAmbiente.descripcion) {
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo ambiente, tiene la descripción, repetida, no se agrega
        const ambienteRepetido = this.ambientes
            .filter((x) => !(x.id === this.newAmbiente.id))
            .find(
                (ambiente) =>
                    ambiente.descripcion.toLowerCase().trim() ===
                    this.newAmbiente.descripcion.toLowerCase().trim()
            );

        if (ambienteRepetido) {
            this.alerta.warn('Ya existe un ambiente con esa descripción');
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si la nueva ciudad, tiene la descripción, repetida, no se agrega
        const ciudadRepetida = this.ciudades
            .filter((x) => !(x.id === this.newCiudad.id))
            .find(
                (ciudad) =>
                    ciudad.descripcion.toLowerCase().trim() ===
                    this.newCiudad.descripcion.toLowerCase().trim()
            );

        if (ciudadRepetida) {
            this.alerta.warn('Ya existe una ciudad con esa descripción');
            return;
        }

        // Si tiene id, es una actualización
        if (this.newCiudad.id) {
            this.updateCiudad(this.newCiudad);
            return;
        }

        this.VISIBLE_DIALOGS.CIUDAD.value = false;
        this.generalService.CIUDADES.post(this.newCiudad).subscribe(() => {
            this.getCiudades();
        });
    }

    addRol(): void {
        // 1. Validar
        if (!this.newRol.descripcion) {
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo rol, tiene la descripción, repetida, no se agrega
        const rolRepetido = this.roles
            .filter((x) => !(x.id === this.newRol.id))
            .find(
                (rol) =>
                    rol.descripcion.toLowerCase().trim() ===
                    this.newRol.descripcion.toLowerCase().trim()
            );

        if (rolRepetido) {
            this.alerta.warn('Ya existe un rol con esa descripción');
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo sistema operativo, tiene la descripción, repetida, no se agrega
        const sistemaOperativoRepetido = this.sistemasOperativos
            .filter((x) => !(x.id === this.newSistemaOperativo.id))
            .find(
                (sistemaOperativo) =>
                    sistemaOperativo.descripcion.toLowerCase().trim() ===
                    this.newSistemaOperativo.descripcion.toLowerCase().trim()
            );

        if (sistemaOperativoRepetido) {
            this.alerta.warn(
                'Ya existe un sistema operativo con esa descripción'
            );
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo tipo de servidor, tiene la descripción, repetida, no se agrega
        const tipoServidorRepetido = this.tiposServidores
            .filter((x) => !(x.id === this.newTipoServidor.id))
            .find(
                (tipoServidor) =>
                    tipoServidor.descripcion.toLowerCase().trim() ===
                    this.newTipoServidor.descripcion.toLowerCase().trim()
            );

        if (tipoServidorRepetido) {
            this.alerta.warn(
                'Ya existe un tipo de servidor con esa descripción'
            );
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo estado, tiene la descripción, repetida, no se agrega
        const estadoRepetido = this.estados
            .filter((x) => !(x.id === this.newEstado.id))
            .find(
                (estado) =>
                    estado.descripcion.toLowerCase().trim() ===
                    this.newEstado.descripcion.toLowerCase().trim()
            );

        if (estadoRepetido) {
            this.alerta.warn('Ya existe un estado con esa descripción');
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo estado de mantenimiento, tiene la descripción, repetida, no se agrega
        const estadoMantenimientoRepetido = this.estadosMantenimiento
            .filter((x) => !(x.id === this.newEstadoMantenimiento.id))
            .find(
                (estadoMantenimiento) =>
                    estadoMantenimiento.descripcion.toLowerCase().trim() ===
                    this.newEstadoMantenimiento.descripcion.toLowerCase().trim()
            );

        if (estadoMantenimientoRepetido) {
            this.alerta.warn(
                'Ya existe un estado de mantenimiento con esa descripción'
            );
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si el nuevo motor, tiene la descripción, repetida, no se agrega
        const motorRepetido = this.motores
            .filter((x) => !(x.id === this.newMotor.id))
            .find(
                (motor) =>
                    motor.descripcion.toLowerCase().trim() ===
                    this.newMotor.descripcion.toLowerCase().trim()
            );

        if (motorRepetido) {
            this.alerta.warn('Ya existe un motor con esa descripción');
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
            alert('Debe ingresar una descripción');
            return;
        }

        // Si la nueva razón, tiene la descripción, repetida, no se agrega
        const razonRepetida = this.razones
            .filter((x) => !(x.id === this.newRazon.id))
            .find(
                (razon) =>
                    razon.descripcion.toLowerCase().trim() ===
                    this.newRazon.descripcion.toLowerCase().trim()
            );

        if (razonRepetida) {
            this.alerta.warn('Ya existe una razón con esa descripción');
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
        // Si el ambiente tiene la descripción repetida, no se actualiza
        const ambienteRepetido = this.ambientes
            .filter((x) => !(x.id === ambiente.id))
            .find(
                (a) =>
                    a.descripcion.toLowerCase().trim() ===
                    ambiente.descripcion.toLowerCase().trim()
            );

        if (ambienteRepetido) {
            this.alerta.warn('Ya existe un ambiente con esa descripción');
            return;
        }

        this.generalService.AMBIENTES.put(ambiente.id, ambiente).subscribe(
            () => {
                this.getAmbientes();
                this.VISIBLE_DIALOGS.AMBIENTE.value = false;
            }
        );
    }

    updateCiudad(ciudad: Ciudad): void {
        // Si la ciudad tiene la descripción repetida, no se actualiza
        const ciudadRepetida = this.ciudades
            .filter((x) => !(x.id === ciudad.id))
            .find(
                (c) =>
                    c.descripcion.toLowerCase().trim() ===
                    ciudad.descripcion.toLowerCase().trim()
            );

        if (ciudadRepetida) {
            this.alerta.warn('Ya existe una ciudad con esa descripción');
            return;
        }

        this.generalService.CIUDADES.put(ciudad.id, ciudad).subscribe(() => {
            this.getCiudades();
            this.VISIBLE_DIALOGS.CIUDAD.value = false;
        });
    }

    updateRol(rol: Rol): void {
        // Si el rol tiene la descripción repetida, no se actualiza
        const rolRepetido = this.roles
            .filter((x) => !(x.id === rol.id))
            .find(
                (r) =>
                    r.descripcion.toLowerCase().trim() ===
                    rol.descripcion.toLowerCase().trim()
            );

        if (rolRepetido) {
            this.alerta.warn('Ya existe un rol con esa descripción');
            return;
        }

        this.generalService.ROLES.put(rol.id, rol).subscribe(() => {
            this.getRoles();
            this.VISIBLE_DIALOGS.ROL.value = false;
        });
    }

    updateSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        // Si el sistema operativo tiene la descripción repetida, no se actualiza
        const sistemaOperativoRepetido = this.sistemasOperativos
            .filter((x) => !(x.id === sistemaOperativo.id))
            .find(
                (s) =>
                    s.descripcion.toLowerCase().trim() ===
                    sistemaOperativo.descripcion.toLowerCase().trim()
            );

        if (sistemaOperativoRepetido) {
            this.alerta.warn(
                'Ya existe un sistema operativo con esa descripción'
            );
            return;
        }

        this.generalService.SISTEMAS_OPERATIVOS.put(
            sistemaOperativo.id,
            sistemaOperativo
        ).subscribe(() => {
            this.getSistemasOperativos();
            this.VISIBLE_DIALOGS.SISTEMA_OPERATIVO.value = false;
        });
    }

    updateTipoServidor(tipoServidor: TipoServidor): void {
        // Si el tipo de servidor tiene la descripción repetida, no se actualiza
        const tipoServidorRepetido = this.tiposServidores
            .filter((x) => !(x.id === tipoServidor.id))
            .find(
                (ts) =>
                    ts.descripcion.toLowerCase().trim() ===
                    tipoServidor.descripcion.toLowerCase().trim()
            );

        if (tipoServidorRepetido) {
            this.alerta.warn(
                'Ya existe un tipo de servidor con esa descripción'
            );
            return;
        }

        this.generalService.TIPOS_SERVIDORES.put(
            tipoServidor.id,
            tipoServidor
        ).subscribe(() => {
            this.getTiposServidores();
            this.VISIBLE_DIALOGS.TIPO_SERVIDOR.value = false;
        });
    }

    updateEstado(estado: Estado): void {
        // Si el estado tiene la descripción repetida, no se actualiza
        const estadoRepetido = this.estados
            .filter((x) => !(x.id === estado.id))
            .find(
                (e) =>
                    e.descripcion.toLowerCase().trim() ===
                    estado.descripcion.toLowerCase().trim()
            );

        if (estadoRepetido) {
            this.alerta.warn('Ya existe un estado con esa descripción');
            return;
        }

        this.generalService.ESTADOS.put(estado.id, estado).subscribe(() => {
            this.getEstados();
            this.VISIBLE_DIALOGS.ESTADO.value = false;
        });
    }

    updateEstadoMantenimiento(estadoMantenimiento: EstadoMantenimiento): void {
        // Si el estado de mantenimiento tiene la descripción repetida, no se actualiza
        const estadoMantenimientoRepetido = this.estadosMantenimiento
            .filter((x) => !(x.id === estadoMantenimiento.id))
            .find(
                (em) =>
                    em.descripcion.toLowerCase().trim() ===
                    estadoMantenimiento.descripcion.toLowerCase().trim()
            );

        if (estadoMantenimientoRepetido) {
            this.alerta.warn(
                'Ya existe un estado de mantenimiento con esa descripción'
            );
            return;
        }

        this.generalService.ESTADOS_MANTENIMIENTO.put(
            estadoMantenimiento.id,
            estadoMantenimiento
        ).subscribe(() => {
            this.getEstadosMantenimiento();
            this.VISIBLE_DIALOGS.ESTADO_MANTENIMIENTO.value = false;
        });
    }

    updateMotor(motor: Motor): void {
        // Si el motor tiene la descripción repetida, no se actualiza
        const motorRepetido = this.motores
            .filter((x) => !(x.id === motor.id))
            .find(
                (m) =>
                    m.descripcion.toLowerCase().trim() ===
                    motor.descripcion.toLowerCase().trim()
            );

        if (motorRepetido) {
            this.alerta.warn('Ya existe un motor con esa descripción');
            return;
        }

        this.generalService.MOTORES.put(motor.id, motor).subscribe(() => {
            this.getMotores();
            this.VISIBLE_DIALOGS.MOTOR.value = false;
        });
    }

    updateRazon(razon: Razon): void {
        // Si la razón tiene la descripción repetida, no se actualiza
        const razonRepetida = this.razones
            .filter((x) => !(x.id === razon.id))
            .find(
                (r) =>
                    r.descripcion.toLowerCase().trim() ===
                    razon.descripcion.toLowerCase().trim()
            );

        if (razonRepetida) {
            this.alerta.warn('Ya existe una razón con esa descripción');
            return;
        }

        this.generalService.RAZONES.put(razon.id, razon).subscribe(() => {
            this.getRazones();
            this.VISIBLE_DIALOGS.RAZON.value = false;
        });
    }

    deleteAmbiente(ambiente: Ambiente): void {
        // Si el ambiente está siendo usado por algún servidor, no se puede eliminar
        const servidoresConAmbiente = this.servidores.filter(
            (servidor) => servidor.idAmbiente === ambiente.id
        );
        const basesDeDatosConAmbiente = this.basesDeDatos.filter(
            (baseDeDatos) => baseDeDatos.idAmbiente === ambiente.id
        );

        if (servidoresConAmbiente.length || basesDeDatosConAmbiente.length) {
            this.alerta.warn(
                'No se puede eliminar el ambiente, ya que está siendo usado por algún servidor o base de datos'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar ambiente',
            message: '¿Estás seguro de que deseas eliminar el ambiente?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.AMBIENTES.delete(ambiente.id).subscribe(
                    () => {
                        this.getAmbientes();
                    }
                );
            },
        });
    }

    deleteCiudad(ciudad: Ciudad): void {
        // Si la ciudad está siendo usada por algún servidor, no se puede eliminar
        const servidoresConCiudad = this.servidores.filter(
            (servidor) => servidor.idCiudad === ciudad.id
        );

        if (servidoresConCiudad.length) {
            this.alerta.warn(
                'No se puede eliminar la ciudad, ya que está siendo usada por algún servidor'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar ciudad',
            message: '¿Estás seguro de que deseas eliminar la ciudad?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.CIUDADES.delete(ciudad.id).subscribe(() => {
                    this.getCiudades();
                    this.VISIBLE_DIALOGS.CIUDAD.value = false;
                });
            },
        });
    }

    deleteRol(rol: Rol): void {
        // Si el rol está siendo usado por algún usuario, no se puede eliminar
        const usuariosConRol = this.usuarios.filter(
            (usuario) => usuario.idRol === rol.id
        );

        if (usuariosConRol.length) {
            this.alerta.warn(
                'No se puede eliminar el rol, ya que está siendo usado por algún usuario'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar rol',
            message: '¿Estás seguro de que deseas eliminar el rol?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.ROLES.delete(rol.id).subscribe(() => {
                    this.getRoles();
                    this.VISIBLE_DIALOGS.ROL.value = false;
                });
            },
        });
    }

    deleteSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        // Si el sistema operativo está siendo usado por algún servidor, no se puede eliminar
        const servidoresConSistemaOperativo = this.servidores.filter(
            (servidor) => servidor.idSistemaOperativo === sistemaOperativo.id
        );

        if (servidoresConSistemaOperativo.length) {
            this.alerta.warn(
                'No se puede eliminar el sistema operativo, ya que está siendo usado por algún servidor'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar sistema operativo',
            message:
                '¿Estás seguro de que deseas eliminar el sistema operativo?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.SISTEMAS_OPERATIVOS.delete(
                    sistemaOperativo.id
                ).subscribe(() => {
                    this.getSistemasOperativos();
                    this.VISIBLE_DIALOGS.SISTEMA_OPERATIVO.value = false;
                });
            },
        });
    }

    deleteTipoServidor(tipoServidor: TipoServidor): void {
        // Si el tipo de servidor está siendo usado por algún servidor, no se puede eliminar
        const servidoresConTipoServidor = this.servidores.filter(
            (servidor) => servidor.idTipo === tipoServidor.id
        );

        if (servidoresConTipoServidor.length) {
            this.alerta.warn(
                'No se puede eliminar el tipo de servidor, ya que está siendo usado por algún servidor'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar tipo de servidor',
            message:
                '¿Estás seguro de que deseas eliminar el tipo de servidor?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.TIPOS_SERVIDORES.delete(
                    tipoServidor.id
                ).subscribe(() => {
                    this.getTiposServidores();
                    this.VISIBLE_DIALOGS.TIPO_SERVIDOR.value = false;
                });
            },
        });
    }

    deleteEstado(estado: Estado): void {
        // Si el estado está siendo usado por algún servidor o base de datos, no se puede eliminar
        const servidoresConEstado = this.servidores.filter(
            (servidor) => servidor.idEstado === estado.id
        );
        const basesDeDatosConEstado = this.basesDeDatos.filter(
            (baseDeDatos) => baseDeDatos.idEstado === estado.id
        );

        if (servidoresConEstado.length || basesDeDatosConEstado.length) {
            this.alerta.warn(
                'No se puede eliminar el estado, ya que está siendo usado por algún servidor o base de datos'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar estado',
            message: '¿Estás seguro de que deseas eliminar el estado?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.ESTADOS.delete(estado.id).subscribe(() => {
                    this.getEstados();
                    this.VISIBLE_DIALOGS.ESTADO.value = false;
                });
            },
        });
    }

    deleteEstadoMantenimiento(estadoMantenimiento: EstadoMantenimiento): void {
        // Si el estado de mantenimiento está siendo usado por algún mantenimiento, no se puede eliminar
        const mantenimientosConEstadoMantenimiento = this.mantenimientos.filter(
            (servidor) => servidor.idEstado === estadoMantenimiento.id
        );

        if (mantenimientosConEstadoMantenimiento.length) {
            this.alerta.warn(
                'No se puede eliminar el estado de mantenimiento, ya que está siendo usado por algún mantenimiento'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar estado de mantenimiento',
            message:
                '¿Estás seguro de que deseas eliminar el estado de mantenimiento?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.ESTADOS_MANTENIMIENTO.delete(
                    estadoMantenimiento.id
                ).subscribe(() => {
                    this.getEstadosMantenimiento();
                    this.VISIBLE_DIALOGS.ESTADO_MANTENIMIENTO.value = false;
                });
            },
        });
    }

    deleteMotor(motor: Motor): void {
        // Si el motor está siendo usado por alguna base de datos, no se puede eliminar
        const servidoresConMotor = this.basesDeDatos.filter(
            (db) => db.idMotor === motor.id
        );

        if (servidoresConMotor.length) {
            this.alerta.warn(
                'No se puede eliminar el motor, ya que está siendo usado por alguna base de datos'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar motor',
            message: '¿Estás seguro de que deseas eliminar el motor?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.MOTORES.delete(motor.id).subscribe(() => {
                    this.getMotores();
                    this.VISIBLE_DIALOGS.MOTOR.value = false;
                });
            },
        });
    }

    deleteRazon(razon: Razon): void {
        // Si la razón está siendo usada por algún mantenimiento, no se puede eliminar
        const mantenimientosConRazon = this.mantenimientos.filter(
            (mantenimiento) => mantenimiento.idRazon === razon.id
        );

        if (mantenimientosConRazon.length) {
            this.alerta.warn(
                'No se puede eliminar la razón, ya que está siendo usada por algún mantenimiento'
            );
            return;
        }

        this.confirmationService.confirm({
            header: 'Eliminar razón',
            message: '¿Estás seguro de que deseas eliminar la razón?',
            acceptButtonStyleClass: 'bg-red-700 text-white rounded-md p-2 m-2',
            rejectButtonStyleClass:
                'bg-gray-200 text-gray-800 rounded-md p-2 m-2',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            accept: () => {
                this.generalService.RAZONES.delete(razon.id).subscribe(() => {
                    this.getRazones();
                    this.VISIBLE_DIALOGS.RAZON.value = false;
                });
            },
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
        this.newAmbiente = structuredClone(ambiente);
        this.openDialog('AMBIENTE');
    }

    openUpdateCiudad(ciudad: Ciudad): void {
        this.newCiudad = structuredClone(ciudad);
        this.openDialog('CIUDAD');
    }

    openUpdateRol(rol: Rol): void {
        this.newRol = structuredClone(rol);
        this.openDialog('ROL');
    }

    openUpdateSistemaOperativo(sistemaOperativo: SistemaOperativo): void {
        this.newSistemaOperativo = structuredClone(sistemaOperativo);
        this.openDialog('SISTEMA_OPERATIVO');
    }

    openUpdateTipoServidor(tipoServidor: TipoServidor): void {
        this.newTipoServidor = structuredClone(tipoServidor);
        this.openDialog('TIPO_SERVIDOR');
    }

    openUpdateEstado(estado: Estado): void {
        this.newEstado = structuredClone(estado);
        this.openDialog('ESTADO');
    }

    openUpdateEstadoMantenimiento(
        estadoMantenimiento: EstadoMantenimiento
    ): void {
        this.newEstadoMantenimiento = structuredClone(estadoMantenimiento);
        this.openDialog('ESTADO_MANTENIMIENTO');
    }

    openUpdateMotor(motor: Motor): void {
        this.newMotor = structuredClone(motor);
        this.openDialog('MOTOR');
    }

    openUpdateRazon(razon: Razon): void {
        this.newRazon = structuredClone(razon);
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
