import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterTaskPageRoutingModule } from './register-task-routing.module';

import { RegisterTaskPage } from './register-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterTaskPageRoutingModule
  ],
  declarations: [RegisterTaskPage]
})
export class RegisterTaskPageModule {}
