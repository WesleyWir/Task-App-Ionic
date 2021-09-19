import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ionic-header',
  templateUrl: './ionic-header.component.html',
  styleUrls: ['./ionic-header.component.scss'],
})
export class IonicHeaderComponent implements OnInit {

  @Input() title: string;

  constructor() { }


  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
      return;
    }

    document.body.setAttribute('color-theme', 'light');
  }


  ngOnInit() {}

}
