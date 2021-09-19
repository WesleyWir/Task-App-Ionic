import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  private headerTitle: string;

  ngOnInit() {
    this.headerTitle = "Lista de Tarefas";
  }
}
