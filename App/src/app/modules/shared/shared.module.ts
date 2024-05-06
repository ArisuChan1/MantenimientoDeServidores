import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [HeaderComponent, LayoutComponent],
    exports: [HeaderComponent, LayoutComponent],
})
export class SharedModule {}
