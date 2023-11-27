import { HttpClient } from '@angular/common/http';
import { Injectable, getNgModuleById } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = "https://localhost:7089";

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> 
  {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/ToDo');
  }

  addTodo(newTodo: Todo): Observable<Todo>
  {
    //Empty Guid
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Todo>(this.baseApiUrl + '/api/ToDo', newTodo);
  
  }

  updateTodo(id: string, todo: Todo): Observable<Todo>
  {
    return this.http.put<Todo>(this.baseApiUrl + '/api/ToDo/' + id, todo)
  }

  deleteTodo(id: string): Observable<Todo>
  {
    return this.http.delete<Todo>(this.baseApiUrl + '/api/ToDo/' + id);
  }

  getAllDeletedTodos(): Observable<Todo[]>
  {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/ToDo/get-deleted-todos');
  }
  undoDeleteTodo(id: string, todo: Todo): Observable<Todo>
  {
    return this.http.put<Todo>(this.baseApiUrl + '/api/ToDo/undo-deleted-todo/' + id, todo);
  }
}
