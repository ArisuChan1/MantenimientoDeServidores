import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'any',
})
export class AlertaService {
    private KEY = 'general-alert';
    constructor(private messageService: MessageService) {}

    error(mensaje: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: mensaje,
            key: this.KEY,
        });
    }

    success(mensaje: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: mensaje,
            key: this.KEY,
        });
    }

    info(mensaje: string) {
        this.messageService.add({
            severity: 'info',
            summary: 'Información',
            detail: mensaje,
            key: this.KEY,
        });
    }

    warn(mensaje: string) {
        console.log(
            '🚀 ~ file: alerta.service.ts ~ line 33 ~ AlertaService ~ warn ~ mensaje',
            mensaje
        );

        this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: mensaje,
            key: this.KEY,
        });
    }

    clear() {
        this.messageService.clear();
    }

    showLoading(mensaje: string) {
        this.messageService.add({
            severity: 'info',
            summary: 'Cargando',
            detail: mensaje,
            key: this.KEY,
            closable: false,
        });
    }

    hideLoading() {
        this.messageService.clear();
    }

    custom(message: Message) {
        this.messageService.add({
            key: this.KEY,
            ...message,
        });
    }
}
