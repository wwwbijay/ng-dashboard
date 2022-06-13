import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptor } from './shared/interceptor/token.interceptor';

/* Material Modules Import */
import { MaterialModule } from './material.module';

/* Components Import*/
import { CreateClientComponent } from './dialogs/create-client/create-client.component';
import { EditClientComponent } from './dialogs/edit-client/edit-client.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientDetailsComponent } from './partials/client-details/client-details.component';
import { TopNavComponent } from './shared/layout/top-nav/top-nav.component';
import { SingleCompanyComponent } from './pages/single-company/single-company.component';
import { CreateAppClientComponent } from './dialogs/create-app-client/create-app-client.component';
import { EditAppClientComponent } from './dialogs/edit-app-client/edit-app-client.component';
import { ChangeSecretComponent } from './dialogs/change-secret/change-secret.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ClientDetailsComponent,
    TopNavComponent,
    CreateClientComponent,
    EditClientComponent,
    SingleCompanyComponent,
    CreateAppClientComponent,
    EditAppClientComponent,
    ChangeSecretComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
