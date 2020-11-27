import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  tasksArray: FormArray;

  @Input()
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
    this.todoForm = this.createTodo(t)
    this.tasksArray = this.todoForm.get('tasks') as FormArray
    t?.tasks.map( i => {
      const task = this.createTasks(i)
      this.tasksArray.push(task)
    })

    // this.todoForm.setValue({title: t.title})
    // t.tasks.map(i => {
    //   const task: Task = {description: i.description, priority: i.priority}
    //   const addTask: FormGroup = this.createTasks(task)
    //   this.tasksArray.push(addTask)
    // })
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
    // console.info('in here: ', this.todoDetail)
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

  private createTasks(singleTask: Task = null): FormGroup {
    return this.fb.group({
      description: this.fb.control(singleTask?.description, [ Validators.required]),
      priority: this.fb.control((singleTask?.priority || 0))
    })
  }

}
