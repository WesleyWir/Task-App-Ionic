import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTaskPageRoutingModule } from './details-task-routing.module';

import { DetailsTaskPage } from './details-task.page';
import { IonicHeaderComponent } from 'src/app/components/ionic-header/ionic-header.component';
import { IonicTabsComponent } from 'src/app/components/ionic-tabs/ionic-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTaskPageRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DetailsTaskPage, IonicTabsComponent, IonicHeaderComponent]
})
export class DetailsTaskPageModule {}
