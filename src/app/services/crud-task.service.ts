import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Task } from '../model/task';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CrudTaskService {
  private _PATH: string = 'tasks/';
  private _user: User;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this._user = this.auth.getUsuarioLogado();
    this._PATH = this._PATH + "" + this._user.uid;
  }

  public saveTask(task: Task)
  {
    return this.db.database.ref(this._PATH).push(this.setModelFormatted(task));
  }

  public editTask(key: string, task: Task)
  {
    return this.db.database.ref(this._PATH).child(key).update(this.setModelFormatted(task));
  }

  public deleteTask(key : string)
  {
    return this.db.database.ref(this._PATH+"/"+key).remove();
  }

  public getTasks() {
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }

  getTasksFromProject(key: string) {
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  };

  public getTask(key: string) {
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key: c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }


  setModelFormatted(task: Task): object{
    return {
      projectId: task.projectId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      entryDate: task.entryDate,
      deadlineDate: task.deadlineDate,
      rememberMe: task.rememberMe,
      completed: task.completed
    }
  }
}
