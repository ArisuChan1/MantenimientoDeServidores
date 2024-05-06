import { Component } from '@angular/core';
import { routesConfig } from 'src/app/routes/routesConfig';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent {
    routes = routesConfig;
}
