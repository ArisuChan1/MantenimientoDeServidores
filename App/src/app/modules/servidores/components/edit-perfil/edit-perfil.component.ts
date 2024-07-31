import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    Mantenimiento,
    MantenimientoPostOrUpdate,
} from 'src/app/interfaces/types';
import { AlertaService } from 'src/app/services/alerta.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-edit-perfil',
    templateUrl: './edit-perfil.component.html',
})
export class EditPerfilComponent {
    mantenimiento: MantenimientoPostOrUpdate | null = null;
    idMantenimiento: number | null = null;

    constructor(
        private dialogRef: DynamicDialogRef,
        private alerta: AlertaService,
        private dialogConfig: DynamicDialogConfig,
        private generalService: GeneralService
    ) {
        this.getDataFromConfig();
    }

    getDataFromConfig() {
        this.mantenimiento = this.dialogConfig.data.mantenimiento;
        this.idMantenimiento = this.dialogConfig.data.idMantenimiento;
    }

    close() {
        this.dialogRef.close();
    }

    sendData() {
        this.dialogRef.close(this.mantenimiento);
    }

    updateMantenimiento() {
        this.generalService.MANTENIMIENTOS.put(
            this.idMantenimiento,
            this.mantenimiento
        ).subscribe(
            () => {
                this.alerta.success('Mantenimiento actualizado correctamente');
                this.sendData();
            },
            () => {
                this.alerta.error('Error al actualizar mantenimiento');
            }
        );
    }
}
