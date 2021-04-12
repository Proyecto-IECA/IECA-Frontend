import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

  slides = [{image: '1'}, {image: '2'}, {image: '3'}]

  constructor() { }

  ngOnInit(): void {
  }

}
