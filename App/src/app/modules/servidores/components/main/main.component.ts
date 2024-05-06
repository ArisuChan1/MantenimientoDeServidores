import { Component } from '@angular/core';
import { Servidor } from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    servidores: Servidor[] = [];
    constructor(private generalService: GeneralService) {
        this.getServidores();
    }

    getServidores() {
        this.generalService.SERVIDORES.get().subscribe((res) => {
            console.log({ res });

            this.servidores = res;
        });
    }
}
