import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';
import { RifasFormComponent } from './components/rifas-form/rifas-form.component';



@NgModule({
  declarations: [
    LayoutComponent,
    RifasFormComponent,
    HeaderButtonsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
