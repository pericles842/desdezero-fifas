import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web/web/web.component';
import { LoginComponent } from './standalone/login/login.component';
import { AuthAdminGuard } from './auth-admin.guard';

const routes: Routes = [
  { path: '', component: WebComponent },
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthAdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
