import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AlertaService } from './services/alerta.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService, AlertaService],
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
