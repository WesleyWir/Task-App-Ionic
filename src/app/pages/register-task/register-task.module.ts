import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterTaskPageRoutingModule } from './register-task-routing.module';

import { RegisterTaskPage } from './register-task.page';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';
import { IonicTabsComponent } from 'src/app/components/ionic-tabs/ionic-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterTaskPageRoutingModule
  ],
  declarations: [RegisterTaskPage, IonicTabsComponent, IonicHeaderComponent]
})
export class RegisterTaskPageModule {}
