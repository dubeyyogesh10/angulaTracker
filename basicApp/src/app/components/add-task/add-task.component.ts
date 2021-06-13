import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interface/interface';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() addTaskEmit = new EventEmitter<Task>();
  text: string;
  day: string;
  reminder = false;
  showAddTask: boolean;
  subscription: Subscription;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((e) => (this.showAddTask = e));
  }

  ngOnInit(): void {}

  onSubmit = () => {
    console.log(this.text + this.day + this.reminder);
    if (this.text === null || this.text === undefined) {
      alert('Please enter the Task');
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.addTaskEmit.emit(newTask);
    this.clearForm();
  };

  clearForm = () => {
    this.day = this.text = '';
    this.reminder = false;
  };
}
