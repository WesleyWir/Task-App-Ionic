import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';

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
  public projectList: Project[];

  constructor(
    public router: Router,
    private TaskService: TaskService,
    private ProjectService: ProjectService,
    public formBuilder: FormBuilder,
    private toast: ToastController
  ) {
    this.model = new Task();
  }

  async ionViewDidEnter() {
    this.getProjectsToSelect();
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Tarefa";

    this._formCreateTask = this.formBuilder.group({
      project: [, [Validators.required]],
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
      this.presentToast("ERRO - Campos Vazios, Todos os campos são obrigatórios");
      return false;
    }

    this.model.projectId = this._formCreateTask.value["project"];
    this.model.title = this._formCreateTask.value["title"];
    this.model.description = this._formCreateTask.value["description"];
    this.model.priority = this._formCreateTask.value["priority"];
    this.model.entryDate = this._formCreateTask.value["entryDate"];
    this.model.deadlineDate = this._formCreateTask.value["deadlineDate"];
    this.model.rememberMe = this._formCreateTask.value["rememberMe"];

    this.save();
  }

  save() {
    this.saveTask(this.model);
  }

  private saveTask(task: Task) {
    return this.TaskService.saveTask(task)
    .subscribe(() => {
      this.presentToast(`Tarefa Criada`)
    });
  }

  private getProjectsToSelect() {
    let projects = this.ProjectService.getProjects()
    .subscribe((projects: Project[]) => {
      this.projectList = projects;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
