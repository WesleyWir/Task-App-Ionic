import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

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
    this.getProjectsToSelect();
  }

  async ionViewWillEnter(){
    // TODO LISTAGEM
    if(this.selectedProject){
      this.getTasksFromProject(this.selectedProject);
    }
  }

  // SERVICES

  private getProjectsToSelect() {
    this.ProjectService.getProjects()
    .subscribe((projects: Project[]) => {
      this.projectList = projects;

    });
    
  }

  private async getTasksFromProject(key: number){
    this.TaskService.getTasksFromProject(key).subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  public async deleteTask(task : Task){
    this.TaskService.deleteTask(task)
    .subscribe(() => {
      //this.alert("TAREFA", "SUCESSO", "Tarefa Removida!");
      this.router.navigate(["/task-list"]);
    });
  }

  // EVENTS;

  private async changeProject(event){
    let selectedProject = parseInt(event.target.value);

    this.getTasksFromProject(selectedProject);
  }

  private async completeTask(event){
    let key = parseInt(event.target.value);
    console.log(key);


    this.TaskService.getTask(key).subscribe((task: Task) => {
      this.deleteTask(task);
    });
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
