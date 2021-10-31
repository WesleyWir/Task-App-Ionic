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
}

export class TaskList {
  key: string;
  public task: Task;
}
