import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register-project',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
