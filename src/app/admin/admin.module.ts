import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
