import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then( m => m.TaskListPageModule)
  },
  {
    path: 'register-task',
    loadChildren: () => import('./pages/register-task/register-task.module').then( m => m.RegisterTaskPageModule)
  },
  {
    path: 'register-project',
    loadChildren: () => import('./pages/register-project/register-project.module').then( m => m.RegisterProjectPageModule)
  },
  {
    path: 'details-task',
    loadChildren: () => import('./pages/details-task/details-task.module').then( m => m.DetailsTaskPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
