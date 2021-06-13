import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interface/interface';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() reminderToogle = new EventEmitter<Task>();
  faTimes = faTimes;
  constructor() {}

  ngOnInit(): void {}

  onDelete = (task: Task) => {
    console.log('task item delted clciedk');
    this.deleteTask.emit(task);
  };

  onToggle = (task: Task) => {
    this.reminderToogle.emit(task);
  };
}
