import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RifasFormComponent } from './components/rifas-form/rifas-form.component';

const routes: Routes = [
    {
      path: 'dashboard',
      component: LayoutComponent,
      children: [
        { path: 'crear-rifas', component: RifasFormComponent },  // Ruta hija dentro de LayoutComponent
      ]
    },
    { path: '**', redirectTo: '' }  // Ruta no encontrada redirige a la raíz
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }