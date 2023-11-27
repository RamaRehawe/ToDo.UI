import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todos.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit{
  todos: Todo[] = [];
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date(),
    isDeleted: false,
    deletedDate: new Date()
  };

  constructor(private todoservice: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoservice.getAllTodos()
      .subscribe({
        next: (todos) => {
          this.todos= todos;
        }
      });
  }

  addTodo(){
    console.log(this.newTodo);
    this.todoservice.addTodo(this.newTodo)
      .subscribe({
        next: (todo) =>{
          this.getAllTodos();
        }

      });
  }

  onCompletetedChange(id: string, todo: Todo)
  {
    todo.isCompleted = !todo.isCompleted;
    this.todoservice.updateTodo(id, todo)
      .subscribe({
        next: (Response)=> {
          this.getAllTodos();
        }
      });
  }
  deleteTodo(id: string){
    this.todoservice.deleteTodo(id)
    .subscribe({
      next: (Response) => {
        this.getAllTodos();
      }
    })
  }

}
