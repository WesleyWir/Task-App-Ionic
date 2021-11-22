import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Task } from 'src/app/model/task';
import { CrudProjectService } from 'src/app/services/crud-project.service';
import { CrudTaskService } from 'src/app/services/crud-task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  private headerTitle: string;
  selectedProject: number;

  public projectList: Project[];
  public taskList: Task[];
  private data : any;

  constructor(
    public router: Router,
    private ProjectService: CrudProjectService,
    private TaskService: CrudTaskService,
  ){

  }

  ngOnInit() {
    this.headerTitle = "Lista de Tarefas";
  }

  async ionViewDidEnter() {
    this.getProjectsToSelect();
  }

  async ionViewWillEnter(){
    // TODO LISTAGEM
    // if(this.selectedProject){
    //   this.getTasksFromProject(this.selectedProject);
    // }
  }

  // SERVICES

  private getProjectsToSelect() {
    this.data = this.ProjectService.getProjects();
    this.data.forEach(data => {
      const lista = data as Array<any>;
      this.projectList = [];
      lista.forEach(c=> {
        let project = new Project();
        project.id = c.key;
        project.title = c.data.title;
        project.description = c.data.description;
        this.projectList.push(project);
      });
    });
  }

  private async getTasksFromProject(key: string){
    this.TaskService.getTasksFromProject(key);
  }

  public async deleteTask(task : Task){
    console.log(task);
    // this.TaskService.deleteTask(task);
  }

  // EVENTS;

  private async changeProject(event){
    let selectedProject = event.target.value;

    this.getTasksFromProject(selectedProject);
  }

  private async completeTask(event){
    let key = parseInt(event.target.value);

    // this.TaskService.getTask(key);
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
