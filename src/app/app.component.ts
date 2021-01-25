import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  citiesData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  units = [{key: "°C", value: "metric"}, { key: "°F", value: "imperial" }];
  cities = ["Kyiv", "Tel Aviv"];

  cityControl: FormControl = new FormControl('');
  unitsControl: FormControl = new FormControl('metric');

  constructor() {
    merge(
      this.cityControl.valueChanges,
      this.unitsControl.valueChanges
    ).subscribe(() => this.citiesData.next({cities: this.cityControl.value, units: this.unitsControl.value}));
  }
}
