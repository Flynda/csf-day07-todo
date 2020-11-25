import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from './todo.database';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todoId = ''
  todoDetail: Todo

  @ViewChild('myTodo')
  todoRef: TodoComponent

  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.todoDB.getTodo(this.todoId)
      .then(result => {
        this.todoDetail = result
        console.info('testing: ', this.todoDetail)
      })
  }

  async updateTodo() {
    const todo = this.todoRef.todo
    todo.id = this.todoId

    await this.todoDB.addTodo(todo)
    this.router.navigate(['/'])
  }

  async deleteTodo() {
    await this.todoDB.deleteTodo(this.todoId)
    this.router.navigate(['/'])
  }

}
