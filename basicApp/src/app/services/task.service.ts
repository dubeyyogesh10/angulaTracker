import { Injectable } from '@angular/core';
import { TASK } from '../mock-task';
import { Task } from 'src/app/interface/interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeStamp } from 'console';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:5000/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks = (): Observable<Task[]> => {
    return this.httpClient.get<Task[]>(this.url);
  };

  deleteTask = (taskId: number): Observable<Task> => {
    return this.httpClient.delete<Task>(this.url + '/' + taskId);
  };

  updateTaskReminder = (task: Task): Observable<Task> => {
    const url1 = `${this.url}/${task.id}`;
    return this.httpClient.put<Task>(url1, task, httpOption);
  };

  AddTask = (task: Task): Observable<Task> => {
    return this.httpClient.post<Task>(this.url, task, httpOption);
  };
}
