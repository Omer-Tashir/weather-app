import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string, units?: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units ?? 'metric'}&appid=0d7303c17ee3d3482cd82a2ad273a90d`;
    return this.http.get<any>(path).pipe(
      map(data => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
      delay(500)
    );
  }
}
