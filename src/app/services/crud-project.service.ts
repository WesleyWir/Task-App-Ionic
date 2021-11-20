import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Project } from '../model/project';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CrudProjectService {
  private _PATH: string = 'projects/';
  private _user: User;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this._user = this.auth.getUsuarioLogado();
    this._PATH = this._PATH + "" + this._user.uid;
  }

  public saveProject(project: Project)
  {
    return this.db.database.ref(this._PATH).push(this.setModelFormatted(project));
  }

  public editProject(key: string, project: Project)
  {
    return this.db.database.ref(this._PATH).child(key).update(this.setModelFormatted(project));
  }

  public deleteProject(key : string)
  {
    return this.db.database.ref(this._PATH+"/"+key).remove();
  }

  public getProjects() {
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }

  public getProject(key: string) {
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }

  setModelFormatted(project: Project): object{
    return {
      id: project.id,
      title: project.title,
      description: project.description
    };
  }
}
