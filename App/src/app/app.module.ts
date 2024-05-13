import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './modules/primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertaService } from './services/alerta.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        PrimeNgModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        AlertaService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
