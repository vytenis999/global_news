import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherWidgetService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'a0796ab83f0e5738d69ac43e73f9183e';
  private cacheKey: string;

  constructor(private http: HttpClient) { }

  // getWeather(city: string) {
  //   return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`);
  // }

  getWeather(city: string): Observable<any> {
    this.cacheKey = `weather_${city}`;
    const cachedWeatherData = this.getCachedWeatherData();
    if (cachedWeatherData) {
      return of(cachedWeatherData);
    } else {
      return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`)
        .pipe(
          map((data: any) => {
            const weatherData = {
              ...data,
              timestamp: new Date().getTime()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(weatherData));
            return weatherData;
          })
        );
    }
  }

  private getCachedWeatherData() {
    const cachedWeatherData = localStorage.getItem(this.cacheKey);
    if (cachedWeatherData) {
      const parsedData = JSON.parse(cachedWeatherData);
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parsedData.timestamp;
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff < 1) {
        return parsedData;
      } else {
        localStorage.removeItem(this.cacheKey);
      }
    }
    return null;
  }
}
