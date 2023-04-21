import { Component } from '@angular/core';
import {WeatherWidgetService} from "./weather-widget.service";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent {
  WeatherData: any;
  city: string;
  weatherType: string;
  temperature: number;
  iconUrl: string;

  constructor(private weatherService: WeatherWidgetService){}

  ngOnInit(){
    this.getLocationCity();
  }

  getWeatherData(){
      this.weatherService.getWeather(this.city)
        .subscribe((data: any) => {
          this.temperature = Math.round(data.main.temp - 273.15);
          this.weatherType = data.weather[0].icon;
          this.iconUrl = `http://openweathermap.org/img/w/${this.weatherType}.png`;
        });
  }

  getLocationCity(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const city = data.address.city || data.address.town || data.address.village || '';
            this.city = city;
            this.getWeatherData();
          })
          .catch((error) => console.log(error));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

}
