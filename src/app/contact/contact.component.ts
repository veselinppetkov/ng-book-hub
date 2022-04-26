import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  marker: any = {
    position: {
      lat: ((Math.random() - 0.5) * 2) / 10,
      lng: ((Math.random() - 0.5) * 2) / 10,
    },
    label: {
      color: 'red',
      text: 'Marker label ' + (Math.random() + 1),
    },
    title: 'Marker title ' + (Math.random() + 1),
    options: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
