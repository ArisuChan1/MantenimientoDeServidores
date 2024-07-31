import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BasesdeDatosComponent } from './components/bases-de-datos/main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
            },
            {
                path: 'bases-de-datos',
                component: BasesdeDatosComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ServidoresRoutingModule {}
