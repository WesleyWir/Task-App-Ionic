import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.page.html',
  styleUrls: ['./register-project.page.scss'],
})
export class RegisterProjectPage implements OnInit {
  private _formCreateProject: FormGroup;
  private _isSubmitted: boolean = false;

  private model: Project;
  private key: string;

  private headerTitle: string;
  constructor(
      public router: Router,
      public alertController: AlertController,
      private ProjectService: ProjectService,
      public formBuilder: FormBuilder
      ) { 
    this.model = new Project();
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Projeto";

    this._formCreateProject = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  public submitForm() {
    this._isSubmitted = true;
    if (!this._formCreateProject.valid) {
      this.alert("Projeto", "ERRO - Campos Vazios", "Todos os campos são obrigatórios");
      return false;
    }

    this.model.title = this._formCreateProject.value["title"];
    this.model.description = this._formCreateProject.value["description"];

    this.save();
  }

  get errorControl() {
    return this._formCreateProject.controls;
  }

  save() {
    this.saveProject()
      .then(() => {
        this.alert("PROJETO", "SUCESSO", "Projeto cadastrado!");
        this.router.navigate(["/register-task"]);
      })
      .catch(() => {
        this.alert("PROJETO", "ERRO", "Não foi possível criar o projeto.");
      });
  }

  private saveProject() {
    return this.ProjectService.insert(this.model);
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
