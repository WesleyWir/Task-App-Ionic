import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProjectPageRoutingModule } from './register-project-routing.module';

import { RegisterProjectPage } from './register-project.page';
import { IonicTabsComponent } from 'src/app/components/ionic-tabs/ionic-tabs.component';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterProjectPageRoutingModule
  ],
  declarations: [RegisterProjectPage, IonicTabsComponent, IonicHeaderComponent]
})
export class RegisterProjectPageModule {}
