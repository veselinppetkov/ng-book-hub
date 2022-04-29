import { Component, OnInit } from '@angular/core';

import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {

  ngOnInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyCMGBysSzzJUJtCQI351bJxX1g8-mqyg7',
      version: "weekly",
      libraries: ["places"]
    });

    const mapOptions = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 4
    };

    loader
      .load()
      .then((google) => {
        new google.maps.Map(document.getElementById("map")!, mapOptions);
      })
      .catch(e => {
        // do something
      });
  }

}
