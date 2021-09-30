import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ProjectList, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage implements OnInit {
  private headerTitle: string;
  private _task: Task;
  private model: Task;
  private _formDetailTask: FormGroup;
  private _isSubmitted: boolean = false;
  private _editar: boolean = false;
  public projectList: ProjectList[];

  constructor(
    private router: Router,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public TaskService: TaskService,
    public ProjectService: ProjectService,
  ) { 
  }

  async ngOnInit() {
    this.headerTitle = "Editar Tarefa";
    
    const nav = this.router.getCurrentNavigation();
    this._task = new Task();
    
    this._task.key = nav.extras.state.item.key;
    this._task.project = nav.extras.state.item.task._project;
    this._task.title = nav.extras.state.item.task._title;
    this._task.description = nav.extras.state.item.task._description;
    this._task.priority = nav.extras.state.item.task._priority;
    this._task.entryDate = nav.extras.state.item.task._entryDate;
    this._task.deadlineDate = nav.extras.state.item.task._deadlineDate;
    this._task.rememberMe = nav.extras.state.item.task._rememberMe;

    this._formDetailTask = this.formBuilder.group({
      key: [this._task.key, [Validators.required]],
      project: [this._task.project, [Validators.required]],
      title: [this._task.title, [Validators.required]],
      description: [this._task.description, [Validators.required]],
      priority: [this._task.priority, [Validators.required]],
      entryDate: [this._task.entryDate, [Validators.required]],
      deadlineDate: [this._task.deadlineDate, [Validators.required]],
      rememberMe: [this._task.rememberMe, [Validators.required]],
    });
  }

  async ionViewDidEnter() {
    this.projectList = await this.getProjectsToSelect();
  }

  public submitForm() {
    this._isSubmitted = true;
    this.model = new Task();

    this.model.key = this._formDetailTask.value["key"];
    this.model.project = this._formDetailTask.value["project"];
    this.model.title = this._formDetailTask.value["title"];
    
    this.model.description = this._formDetailTask.value["description"];
    this.model.priority = this._formDetailTask.value["priority"];
    this.model.entryDate = this._formDetailTask.value["entryDate"];
    this.model.deadlineDate = this._formDetailTask.value["deadlineDate"];
    this.model.rememberMe = this._formDetailTask.value["rememberMe"];

    this.update(this.model.key);
  }

  private async getProjectsToSelect() {
    let projects = await this.ProjectService.getAllProjects()
      .then((result) => result)
      .then(data => data);
    return projects;
  }

  update(key) {
    this.updateTask(key)
      .then(() => {
        this.alert("TAREFA", "SUCESSO", "Tarefa Atualizada!");
        this.router.navigate(["/task-list"]);
      })
      .catch(() => {
        this.alert("TAREFA", "ERRO", "Não foi possível atualizar a tarefa :(");
      });
  }

  private updateTask(key) {
    return this.TaskService.update(key, this.model);
  }

  async alert(title: string, subtitle: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public delete(){
    this.presentAlertConfirm("TAREFA", "Deseja realmente deletar a tarefa?");
  }

  async presentAlertConfirm(title : string, message : string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteTask();
          }
        }
      ]
    });

    await alert.present();
  }

  public deleteTask(){
    this.updateTask(this._task.key)
      .then(() => {
        this.alert("TAREFA", "SUCESSO", "Tarefa Removida!");
        this.router.navigate(["/task-list"]);
      })
      .catch(() => {
        this.alert("TAREFA", "ERRO", "Não foi possível atualizar a tarefa :(");
      });
  }

}
