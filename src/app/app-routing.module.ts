import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    data: {
      title: 'Login Page ',
    },
  },
  {
    component: ForgotPasswordComponent,
    path: 'forgot-password',
    data: {
      title: 'Forgot Page ',
    },
  },
  {
    component: DashboardComponent,
    path: '',
    data: {
      breadcrumb: 'Home',
      title: 'Dashboard',
    },
    canActivate: [AuthGuard],
    children: [],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
