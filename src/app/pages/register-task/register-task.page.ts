import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ProjectList, ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-task',
  templateUrl: './register-task.page.html',
  styleUrls: ['./register-task.page.scss'],
})
export class RegisterTaskPage implements OnInit {
  private headerTitle: string;
  private _formCreateTask: FormGroup;
  private _isSubmitted: boolean = false;

  private model: Task;
  private key: string;

  public projectList: ProjectList[];

  constructor(
    public router: Router,
    public alertController: AlertController,
    private TaskService: TaskService,
    private ProjectService: ProjectService,
    public formBuilder: FormBuilder
  ) {
    this.model = new Task();
  }

  async ionViewDidEnter() {
    this.projectList = await this.getProjectsToSelect();
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Tarefa";

    this._formCreateTask = this.formBuilder.group({
      project: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      entryDate: ['', [Validators.required]],
      deadlineDate: ['', [Validators.required]],
      rememberMe: ['', [Validators.required]],
    });
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formCreateTask.valid) {
      this.alert("Projeto", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
      return false;
    }

    this.model.project = this._formCreateTask.value["project"];
    this.model.title = this._formCreateTask.value["title"];
    this.model.description = this._formCreateTask.value["description"];
    this.model.priority = this._formCreateTask.value["priority"];
    this.model.entryDate = this._formCreateTask.value["entryDate"];
    this.model.deadlineDate = this._formCreateTask.value["deadlineDate"];
    this.model.rememberMe = this._formCreateTask.value["rememberMe"];

    this.save();
  }

  save() {
    this.saveTask()
      .then(() => {
        this.alert("TAREFA", "SUCESSO", "Tarefa criada!");
        this.router.navigate(["/task-list"]);
      })
      .catch(() => {
        this.alert("TAREFA", "ERRO", "Não foi possível criar a tarefa :(");
      });
  }

  private saveTask() {
    return this.TaskService.insert(this.model);
  }

  private async getProjectsToSelect() {
    let projects = await this.ProjectService.getAllProjects()
      .then((result) => result)
      .then(data => data);

    return projects;
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

}
