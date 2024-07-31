import { Component } from '@angular/core';
import { ChangeLog } from 'src/app/interfaces/types';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-change-logs',
    templateUrl: './change-logs.component.html',
})
export class ChangeLogsComponent {
    changeLogs: ChangeLog[] = [];

    constructor(private generalService: GeneralService) {
        this.getChangeLogs();
    }

    getChangeLogs() {
        this.generalService.CHANGE_LOGS.get().subscribe((res) => {
            this.changeLogs = res;
        });
    }
}
