import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _storage: Storage | null = null;
  private _prefixKey = 'project_';
  constructor(private storage: Storage, private datepipe: DatePipe) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public insert(project: Project) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, project);
  }

  public update(key: string, project: Project) {
    return this.save(key, project);
  }

  private save(key: string, project: Project) {
    return this.storage.set(this._prefixKey + key, project);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAllProjects() {
    let projects: ProjectList[] = [];

    return this.storage.forEach((value: Project, key: string, iterationNumber: Number) => {
      let project = new ProjectList();
      if (key.includes(this._prefixKey)) {
        project.key = key;
        project.project = value;
        projects.push(project);
      }
    })
      .then(() => {
        return Promise.resolve(projects);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class ProjectList {
  key: string;
  project: Project;
}
