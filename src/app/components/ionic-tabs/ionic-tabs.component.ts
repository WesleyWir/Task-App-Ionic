import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ionic-tabs',
  templateUrl: './ionic-tabs.component.html',
  styleUrls: ['./ionic-tabs.component.scss'],
})
export class IonicTabsComponent implements OnInit {

  constructor(private router : Router) { 

  }

  ngOnInit() {}

  public goToTaskList(): void {
    this.router.navigate(['/task-list']);
  }

  public goToRegisterTask(): void {
    this.router.navigate(['/register-task']);
  }

  public goToRegisterProject(): void {
    this.router.navigate(['/register-project']);
  }
}
