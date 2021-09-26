import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.page.html',
  styleUrls: ['./register-project.page.scss'],
})
export class RegisterProjectPage implements OnInit {

  private headerTitle: string;
  constructor() { }

  ngOnInit() {
    this.headerTitle = "Cadastrar Projeto";
  }

}
