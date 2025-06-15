import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';
import { RifasFormComponent } from './components/rifas-form/rifas-form.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CardStatiticsComponent } from './components/card-statitics/card-statitics.component';
import { ConfigComponent } from './components/config/config.component';
import { PayMethodsComponent } from './components/pay-methods/pay-methods.component';
import { TableModule } from 'primeng/table';
import { VentasComponent } from './components/ventas/ventas.component';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MinimalTableComponent } from "./components/minimal-table/minimal-table.component";
import { LoadingComponent } from '../web/components/loading/loading.component';
import { PremiosEntregadosComponent } from './components/premios-entregados/premios-entregados.component';



@NgModule({
  declarations: [
    LayoutComponent,
    RifasFormComponent,
    HeaderButtonsComponent,
    StatisticsComponent,
    CardStatiticsComponent,
    ConfigComponent,
    PayMethodsComponent,
    VentasComponent,
    MinimalTableComponent,
    PremiosEntregadosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    TooltipModule,
    OverlayPanelModule,
    FormsModule,
    DialogModule,
    LoadingComponent
]
})
export class AdminModule { }
