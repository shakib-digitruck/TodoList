import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {map} from "rxjs/operators";

import { Todo } from './todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  isEdit : Boolean = false;
  selectedTodo: Todo;
  todos: Todo[];

  readonly baseURL = 'http://localhost:3000/todos';

  constructor(private http : HttpClient ) {

  }

  postTodo(emp : Todo){
    return this.http.post(this.baseURL, emp);
  }

  getTodoList(){
    return this.http.get(this.baseURL);
  }

  putTodo(emp : Todo){
    return this.http.put(this.baseURL + '/' + emp._id, emp);
  }

  deleteTodo(_id : string){
    return this.http.delete(this.baseURL + '/' + _id);
  }
}
