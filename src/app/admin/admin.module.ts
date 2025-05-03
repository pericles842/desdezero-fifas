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



@NgModule({
  declarations: [
    LayoutComponent,
    RifasFormComponent,
    HeaderButtonsComponent,
    StatisticsComponent,
    CardStatiticsComponent,
    ConfigComponent,
    PayMethodsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
