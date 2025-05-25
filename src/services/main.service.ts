import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '41bcae88a7f498f92b458ad39681d672';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
