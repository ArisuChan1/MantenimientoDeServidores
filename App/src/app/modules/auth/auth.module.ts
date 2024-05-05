import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.module.routing';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng/primeng.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AlertaService } from 'src/app/services/alerta.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgModule,
        AuthRoutingModule,
        HttpClientModule,
    ],
    providers: [AlertaService, AuthService],
    declarations: [LoginComponent],
})
export class AuthModule {}
