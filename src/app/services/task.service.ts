import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _storage: Storage | null = null;
  private _prefixKey = 'task_';

  constructor(private storage: Storage, private datepipe: DatePipe) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public insert(task: Task) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, task);
  }

  public update(key: string, task: Task) {
    return this.storage.set(key, task);
  }

  private save(key: string, task: Task) {
    return this.storage.set(this._prefixKey + key, task);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public async get(key: string) {
    const obj = await this.storage.get(key);
    return obj;
  }

  public getAllTasks() {
    let tasks: TaskList[] = [];

    return this.storage.forEach((value: Task, key: string, iterationNumber: Number) => {
      let task = new TaskList();
      if (key.includes(this._prefixKey)) {
        task.key = key;
        task.task = value;
        tasks.push(task);
      }
    })
      .then(() => {
        return Promise.resolve(tasks);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getTaskFromProject(projectKey: string) {
    let tasks: TaskList[] = [];

    return this.storage.forEach((value: Task, key: string, iterationNumber: Number) => {
      let task = new TaskList();
      if (key.includes(this._prefixKey)) {
        if (value._project == projectKey) {
          task.key = key;
          task.task = value;
          tasks.push(task);
        }
      }
    })
      .then(() => {
        return Promise.resolve(tasks);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class TaskList {
  key: string;
  public task: Task;
}
