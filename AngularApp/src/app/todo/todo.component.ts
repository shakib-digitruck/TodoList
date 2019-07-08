import { Component, OnInit } from '@angular/core';

import {TodoService} from "../shared/todo.service";
import {NgForm} from "@angular/forms";
import {Todo} from "../shared/todo.model";
declare var M: any;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})



export class TodoComponent implements OnInit {



  constructor(private todoService: TodoService) { }


  ngOnInit() {
    this.resetForm();
    this.refreshTodoList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.todoService.selectedTodo = {
      status: "",
      _id: "",
      name: "",
      duration: null
    }
  }

  onSubmit(form: NgForm) {
    if(this.todoService.isEdit == false) {
      this.todoService.postTodo(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTodoList();
        M.toast({html: 'Saved successfully', classes: 'rounded'});
      });
    }
    else{
      this.todoService.putTodo(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTodoList();
        M.toast({html: 'Updated successfully', classes: 'rounded'});
      });
      this.todoService.isEdit = false;
    }
  }

  refreshTodoList(){
    var new_obj : Todo[] = [];
    this.todoService.getTodoList().subscribe((res) => {
      //this.todoService.todos = res as Todo[];
      for (var obj of res as Todo[]){
        if(obj.status == "Active"){
          new_obj.push(obj);
        }
      }
      this.todoService.todos = new_obj;
    });
  }


  onEdit(emp : Todo){
    this.todoService.selectedTodo = emp;
    this.todoService.isEdit = true;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are You sure to delete?') == true){
      this.todoService.deleteTodo(_id).subscribe((res) => {
        this.refreshTodoList();
        this.resetForm(form);
        M.toast({html : 'Deleted Successfully', classes: 'rounded'});
      });
    }
  }

  onEditStatus(emp: Todo) {
    emp.status = "Inactive";
    this.todoService.selectedTodo = emp;
    //form.value.status = "Inactive";
    this.todoService.isEdit = true;
    //this.onSubmit(this.todoService.)

    this.todoService.putTodo(this.todoService.selectedTodo).subscribe((res) => {
      //this.resetForm();
      this.refreshTodoList();
      M.toast({html: 'Status Updated successfully', classes: 'rounded'});
    });
  }
}
