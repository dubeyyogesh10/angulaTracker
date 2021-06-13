import { Component, OnInit } from '@angular/core';
import { TASK } from '../../mock-task';
import { Task } from 'src/app/interface/interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaskFromService();
  }

  getTaskFromService = () => {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (err) => console.log('error occured  ' + err)
    );
  };

  deleteTaskItem = (task: Task) => {
    console.log('Task deleted from task compoent ' + task.text);
    this.taskService.deleteTask(task.id).subscribe(
      () => {
        this.tasks = this.tasks.filter((x) => x.id !== task.id);
      },
      (err) => console.log('errror ' + err)
    );
  };

  onReminderToggle = (task: Task) => {
    console.log('Reminder toggle clicked ' + task.text);
    this.tasks.map((x) => {
      if (x.id === task.id) {
        x.reminder = !task.reminder;
      }
    });

    this.taskService.updateTaskReminder(task).subscribe();
  };

  OnaddTask = (task: Task) => {
    console.log('Add task' + task.text);
    this.taskService.AddTask(task).subscribe(
      () => {
        this.tasks.push(task);
      },
      (err) => console.log(err)
    );
  };
}
