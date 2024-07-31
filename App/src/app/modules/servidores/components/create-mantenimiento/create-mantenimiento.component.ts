import { Component } from '@angular/core';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
    BaseDeDatos,
    EstadoMantenimiento,
    Mantenimiento,
    MantenimientoPostOrUpdate,
    Razon,
    Servidor,
    Usuario,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';
import { SESSION_KEY_USER } from 'src/config/config';
import { EditPerfilComponent } from '../edit-perfil/edit-perfil.component';

@Component({
    selector: 'app-create-mantenimiento',
    templateUrl: './create-mantenimiento.component.html',
})
export class CreateMantenimientoComponent {
    newMantenimiento: MantenimientoPostOrUpdate = {
        descripcion: '',
        idServidor: 0,
        idEstado: 1,
        idRazon: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        idUsuario: 0,
        idBaseDeDatos: 0,
        automatica: false,
        requierePerfil: false,
        planB: '',
        codigoPerfil: null,
        agenciasAfectadas: null,
        afectacionAS400: null,
        autorizacionTarjetasDebito: null,
        soporteProveedores: null,
        personalInvolucrado: null,
        puntosDeVerificacion: null,
        idUsuarioResponsable: 0,
    };

    estados: EstadoMantenimiento[] = [];
    razones: Razon[] = [];
    opciones = [
        {
            label: 'Servidor',
            value: 'servidor',
        },
        {
            label: 'Base de datos',
            value: 'baseDeDatos',
        },
    ];
    opcionSeleccionada: (typeof this.opciones)[0] = this.opciones[0];

    servidores: Servidor[] = [];
    basesDeDatos: BaseDeDatos[] = [];

    data: {
        id: number;
        idServidor: number;
        idBaseDeDatos: number;
        mantenimiento: Mantenimiento;
    } | null = null;

    usuarios: Usuario[] = [];

    constructor(
        private generalService: GeneralService,
        private alerta: AlertaService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private dialogService: DialogService
    ) {
        this.getRazones();
        this.getEstados();
        this.getServidores();
        this.getBasesDeDatos();
        this.getUsuarios();
        this.getDataFromConfig();
    }

    getEstados() {
        this.generalService.ESTADOS_MANTENIMIENTO.get().subscribe((res) => {
            this.estados = res;
        });
    }

    getRazones() {
        this.generalService.RAZONES.get().subscribe((res) => {
            this.razones = res;
        });
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            this.servidores = res;
        });
    }

    getBasesDeDatos() {
        this.generalService.BASE_DE_DATOS.get().subscribe((res) => {
            this.basesDeDatos = res;
        });
    }

    getUsuarios() {
        this.generalService.USUARIOS.get().subscribe((res) => {
            this.usuarios = res;
        });
    }

    getDataFromConfig() {
        this.data = this.dialogConfig.data;

        if (this.data?.idServidor) {
            this.newMantenimiento.idServidor = this.data.idServidor;
            this.opcionSeleccionada = this.opciones[0];
        }

        if (this.data?.idBaseDeDatos) {
            this.newMantenimiento.idBaseDeDatos = this.data.idBaseDeDatos;
            this.opcionSeleccionada = this.opciones[1];
        }

        if (this.data?.mantenimiento) {
            this.newMantenimiento = {
                descripcion: this.data.mantenimiento.descripcion,
                idServidor: this.data.mantenimiento.idServidor,
                idBaseDeDatos: this.data.mantenimiento.idBaseDeDatos,
                idEstado: this.data.mantenimiento.idEstado,
                idRazon: this.data.mantenimiento.idRazon,
                fechaInicio: new Date(this.data.mantenimiento.fechaInicio),
                fechaFin: new Date(this.data.mantenimiento.fechaFin),
                idUsuario: this.data.mantenimiento.idUsuario,
                idUsuarioResponsable:
                    this.data.mantenimiento.idUsuarioResponsable,
                automatica: this.data.mantenimiento.automatica,
                requierePerfil: this.data.mantenimiento.requierePerfil,
                planB: this.data.mantenimiento.planB,
                codigoPerfil: this.data.mantenimiento.codigoPerfil,
                agenciasAfectadas: this.data.mantenimiento.agenciasAfectadas,
                afectacionAS400: this.data.mantenimiento.afectacionAS400,
                autorizacionTarjetasDebito:
                    this.data.mantenimiento.autorizacionTarjetasDebito,
                soporteProveedores: this.data.mantenimiento.soporteProveedores,
                personalInvolucrado:
                    this.data.mantenimiento.personalInvolucrado,
                puntosDeVerificacion:
                    this.data.mantenimiento.puntosDeVerificacion,
            };
        }
    }

    validateForm() {
        return (
            this.newMantenimiento.descripcion &&
            (this.newMantenimiento.idServidor ||
                this.newMantenimiento.idBaseDeDatos) &&
            this.newMantenimiento.idEstado &&
            this.newMantenimiento.idRazon &&
            this.newMantenimiento.fechaInicio &&
            this.newMantenimiento.fechaFin &&
            this.newMantenimiento.idUsuario
        );
    }

    close() {
        this.dialogRef.close();
    }

    openModalEditPerfil() {
        const ref = this.dialogService.open(EditPerfilComponent, {
            header: 'Editar perfil',
            data: {
                idMantenimiento: this.data?.id,
                mantenimiento: this.newMantenimiento,
            },
        });

        ref.onClose.subscribe((mantenimiento: MantenimientoPostOrUpdate) => {
            if (!mantenimiento) {
                return;
            }
            this.newMantenimiento = mantenimiento;
        });
    }

    createOrUpdateMantenimiento() {
        const usuario = JSON.parse(
            sessionStorage.getItem(SESSION_KEY_USER) || '{}'
        ) as Usuario;

        this.newMantenimiento.idUsuario = usuario.id;

        this.newMantenimiento.idServidor =
            this.newMantenimiento.idServidor || null;
        this.newMantenimiento.idBaseDeDatos =
            this.newMantenimiento.idBaseDeDatos || null;

        if (this.opcionSeleccionada.value === 'servidor') {
            this.newMantenimiento.idBaseDeDatos = null;
        }

        if (this.opcionSeleccionada.value === 'baseDeDatos') {
            this.newMantenimiento.idServidor = null;
        }

        if (!this.validateForm()) {
            alert('Faltan campos por llenar');
            return;
        }

        if (this.data.id) {
            this.generalService.MANTENIMIENTOS.put(
                this.data.id,
                this.newMantenimiento
            ).subscribe(
                () => {
                    this.alerta.success(
                        'Mantenimiento actualizado correctamente'
                    );
                    this.dialogRef.close();
                },
                () => {
                    this.alerta.error('Error al actualizar mantenimiento');
                }
            );
        } else {
            this.generalService.MANTENIMIENTOS.post(
                this.newMantenimiento
            ).subscribe(
                () => {
                    this.alerta.success('Mantenimiento creado correctamente');
                    this.dialogRef.close();
                },
                () => {
                    this.alerta.error('Error al crear mantenimiento');
                }
            );
        }
    }
}
