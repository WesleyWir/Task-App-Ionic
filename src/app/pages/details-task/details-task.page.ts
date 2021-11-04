import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';

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
  public projectList: Project[];

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
    
    this._task.id = nav.extras.state.item._id;
    this._task.projectId = nav.extras.state.item._projectId;
    this._task.title = nav.extras.state.item._title;
    this._task.description = nav.extras.state.item._description;
    this._task.priority = nav.extras.state.item._priority;
    this._task.entryDate = nav.extras.state.item._entryDate;
    this._task.deadlineDate = nav.extras.state.item._deadlineDate;
    this._task.rememberMe = nav.extras.state.item._rememberMe;

    this._formDetailTask = this.formBuilder.group({
      id: [this._task.id, [Validators.required]],
      projectId: [this._task.projectId, [Validators.required]],
      title: [this._task.title, [Validators.required]],
      description: [this._task.description, [Validators.required]],
      priority: [this._task.priority, [Validators.required]],
      entryDate: [this._task.entryDate, [Validators.required]],
      deadlineDate: [this._task.deadlineDate, [Validators.required]],
      rememberMe: [this._task.rememberMe, [Validators.required]],
    });
  }

  async ionViewDidEnter() {
    this.getProjectsToSelect();
  }

  public submitForm() {
    this._isSubmitted = true;
    this.model = new Task();

    this.model.id = this._formDetailTask.value["id"];
    this.model.projectId = this._formDetailTask.value["projectId"];
    this.model.title = this._formDetailTask.value["title"];
    
    this.model.description = this._formDetailTask.value["description"];
    this.model.priority = this._formDetailTask.value["priority"];
    this.model.entryDate = this._formDetailTask.value["entryDate"];
    this.model.deadlineDate = this._formDetailTask.value["deadlineDate"];
    this.model.rememberMe = this._formDetailTask.value["rememberMe"];

    this.update(this.model);
  }

  private getProjectsToSelect() {
    this.ProjectService.getProjects()
    .subscribe((projects: Project[]) => {
      this.projectList = projects;
    });
  }

  update(model) {
    this.TaskService.updateTask(model)
    .subscribe(() => {
      this.alert("TAREFA", "SUCESSO", "Tarefa Atualizada!");
        this.router.navigate(["/task-list"]);
    });
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
            this.deleteTask(this._task);
          }
        }
      ]
    });

    await alert.present();
  }

  public deleteTask(task: Task){
    this.TaskService.deleteTask(task)
    .subscribe(() => {
      this.alert("TAREFA", "SUCESSO", "Tarefa Removida!");
      this.router.navigate(["/task-list"]);
    });
        
  }
}
