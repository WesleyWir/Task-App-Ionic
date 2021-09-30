import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { ProjectList, ProjectService } from 'src/app/services/project.service';
import { TaskList, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  private headerTitle: string;

  public projectList: ProjectList[];
  public taskList: TaskList[];

  constructor(
    public router: Router,
    private ProjectService: ProjectService,
    private TaskService: TaskService,
  ){

  }

  ngOnInit() {
    this.headerTitle = "Lista de Tarefas";
  }

  async ionViewDidEnter() {
    this.projectList = await this.getProjectsToSelect();
  }

  // SERVICES

  private async getProjectsToSelect() {
    let projects = await this.ProjectService.getAllProjects()
                  .then((result) => result)
                  .then(data => data);

    return projects;
  }

  private async getTasksFromProject(key: string){
    let tasks = await this.TaskService.getTaskFromProject(key)
                .then((result) => result)
                .then(data => data);
    return tasks;
  }

  // EVENTS;

  private async changeProject(event){
    let selectedProject = event.target.value;

    this.taskList = await this.getTasksFromProject(selectedProject);
  }

  private goToEdit(item: Task){
    this.router.navigateByUrl('/details-task', {state: {item}});
  }

  // HELPERS;

  private formatDate(date: string): string {
    let dateSliced = date.slice(0, 10);
    let dateSplitted = dateSliced.split("-");

    let dateFormatted = dateSplitted[2];
    dateFormatted += "/" + dateSplitted[1] + "/";
    dateFormatted += dateSplitted[0];

    return dateFormatted;
  }
}
