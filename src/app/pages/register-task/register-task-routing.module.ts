import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterTaskPage } from './register-task.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterTaskPageRoutingModule {}
