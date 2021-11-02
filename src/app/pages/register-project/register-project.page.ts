import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.page.html',
  styleUrls: ['./register-project.page.scss'],
})
export class RegisterProjectPage implements OnInit {
  project = {} as Project;
  projects : Project[];

  private headerTitle: string;

  constructor(
    public router: Router,
    private ProjectService: ProjectService,
    public toast: ToastController
  ) {
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Projeto";
    this.getProjects();
  }

  getProjects(){
    this.ProjectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      console.log(this.projects);
    });
  }

  save() {
    this.saveProject();
  }

  private saveProject() {
    if(this.project.id != undefined){
      this.ProjectService.updateProject(this.project)
      .subscribe(() => {
        this.presentToast("Salvou o seu novo projeto.");
      })
    }else{
      this.ProjectService.saveProject(this.project)
      .subscribe(() => {
        this.presentToast(`Atualizou o projeto ${this.project.title}.`)
      })
    }
  }

  edit(project: Project)
  {
    this.project = project;
  }

  delete(project: Project)
  {
    this.ProjectService.deleteProject(project)
    .subscribe(() => {
      this.presentToast("Deletou o Time.");
    })
  }


  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

}
