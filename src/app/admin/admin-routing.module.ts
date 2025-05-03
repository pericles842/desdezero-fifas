import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RifasFormComponent } from './components/rifas-form/rifas-form.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ConfigComponent } from './components/config/config.component';
import { PayMethodsComponent } from './components/pay-methods/pay-methods.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'estadisticas', pathMatch: 'full' }, // Ruta por defecto dentro de 'admin'
      { path: 'rifas', component: RifasFormComponent },
      { path: 'estadisticas', component: StatisticsComponent },
      { path: 'configuracion', component: ConfigComponent },
      { path: 'metodos-pagos', component: PayMethodsComponent },
      { path: 'ventas', component: VentasComponent }
    ]
  },
  { path: '**', redirectTo: '/admin/estadisticas' } // Ruta no encontrada redirige a 'admin/estadisticas'
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }