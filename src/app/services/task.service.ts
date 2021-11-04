import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_TASK_ROUTE = "http://localhost:3000/tasks";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    header: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_TASK_ROUTE)
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  };

  getTasksFromProject(key: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_TASK_ROUTE, {
      params: { _projectId: key }
    })
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  };

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.API_TASK_ROUTE}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  }

  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.API_TASK_ROUTE,
      this.setModelFormatted(task))
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.API_TASK_ROUTE}/${task.id}`, this.setModelFormatted(task))
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  }

  completedTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.API_TASK_ROUTE}/${task.id}`, this.setModelFormatted(task))
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.API_TASK_ROUTE}/${task.id}`)
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  };

  handlerError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código de erro: ${error.status} mensagem ${errorMessage}`;
      return throwError(errorMessage);
    }
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
