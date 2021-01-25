import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {
  @Input() citiesData: BehaviorSubject<any>;

  data: any;
  units: any;
  today: Date = new Date();
  loading = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.citiesData.subscribe(data => {
      this.data = [];
      if (data?.cities?.length > 0 && data?.units) {
        this.units = data.units;
        this.loading = true;

        forkJoin(data.cities.map(city => { return this.weatherService.getWeatherForCity(city, this.units) })).subscribe(results => {
          this.data = results;
          this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
      }
    });
  }
}
