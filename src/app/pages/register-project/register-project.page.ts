import { Component, OnInit } from '@angular/core';
// import { ProjectService } from 'src/app/services/project.service';
import { CrudProjectService } from 'src/app/services/crud-project.service';
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
  private data : any;

  private headerTitle: string;

  constructor(
    public router: Router,
    private ProjectService: CrudProjectService,
    public toast: ToastController
  ) {
  }

  ngOnInit() {
    this.headerTitle = "Cadastrar Projeto";
    this.getProjects();
  }

  getProjects(){
    this.data = this.ProjectService.getProjects();
    this.data.forEach(data => {
      const lista = data as Array<any>;
      this.projects = [];
      lista.forEach(c=> {
        console.log(c);
        let project = new Project();
        project.id = c.key;
        project.title = c.data.title;
        project.description = c.data.description;
        this.projects.push(project);
      });
    });
    console.log(this.projects);
  }

  save() {
    this.saveProject();
  }

  private saveProject() {
    if(this.project.id != undefined){
      this.ProjectService.editProject(this.project.id, this.project);
    }else{
      this.ProjectService.saveProject(this.project);
    }

    this.getProjects();
  }

  edit(project: Project)
  {
    this.project = project;
  }

  delete(project: Project)
  {
    this.ProjectService.deleteProject(project.id);
  }


  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

}
