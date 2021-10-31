import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  API_PROJECTS_ROUTE = "http://localhost:3000/projects";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
      header: new HttpHeaders({"Content-Type": "application/json"}),
  };

  getProjects(): Observable<Project[]> 
  {
    return this.httpClient.get<Project[]>(this.API_PROJECTS_ROUTE)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  };

  getProject(id: number): Observable<Project>
  {
    return this.httpClient.get<Project>(`${this.API_PROJECTS_ROUTE}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  saveProject(team: Project): Observable<Project>{
    return this.httpClient.post<Project>(this.API_PROJECTS_ROUTE, team)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  updateProject(team: Project): Observable<Project>{
    return this.httpClient.put<Project>(`${this.API_PROJECTS_ROUTE}/${team.id}`, team)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  deleteProject(project: Project): Observable<Project>{
    return this.httpClient.delete<Project>(`${this.API_PROJECTS_ROUTE}/${project.id}`)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  };

  handlerError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }else{
      errorMessage = `Código de erro: ${error.status} mensagem ${errorMessage}`;
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  }
}