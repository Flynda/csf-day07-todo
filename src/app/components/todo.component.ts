import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  tasksArray: FormArray;

  @Input()
  todoDetail: Todo;

  get todo(): Todo {
    const t:Todo = this.todoForm.value as Todo
    t.tasks = t.tasks.map(v => {
      // @ts-ignore
      v.priority = parseInt(v.priority)
      return v
    })
    return t
  }
  set todo(t : Todo) {
    // this.todoForm.value.title = t.title
    // this.todoForm.value.tasks = t.tasks
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createTodo()
    this.tasksArray = this.todoForm.get('tasks') as FormArray
  }

  addNewTask(){
    console.info('I added more tasks!')
    const task = this.createTasks()
    this.tasksArray.push(task)
  }

  showValues(){
    console.info('form values:', this.todoForm.value)
    console.info('in here: ', this.todoDetail)
  }

  deleteTask(index: number){
    console.info('I have deleted a task!')
    this.tasksArray.removeAt(index)
  }

  private createTodo(singleTodo: Todo = null): FormGroup {
    return this.fb.group({
      title: this.fb.control(singleTodo?.title, [ Validators.required ]),
      tasks: this.fb.array([])
    })
  }

  private createTasks(): FormGroup {
    return this.fb.group({
      description: this.fb.control('', [ Validators.required]),
      priority: this.fb.control(0)
    })
  }

}
