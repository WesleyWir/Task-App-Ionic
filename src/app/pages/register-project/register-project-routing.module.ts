import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterProjectPage } from './register-project.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterProjectPageRoutingModule {}
