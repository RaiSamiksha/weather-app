
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/main.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  city: string = '';
  currentTime: Date = new Date(); // ✅ Declare currentTime variable
  weatherData: any;
  forecastData: any[] = [];
  sunriseTime: string = '';
  sunsetTime: string = '';

  ngOnInit(): void {
    // ✅ Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
  

  constructor(private weatherService: WeatherService) {}

  getWeatherData(): void {
    if (!this.city.trim()) {
      alert('Please enter a city name!');
      return;
    }

    // Get current weather
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        console.log('Weather Data:', data);
        this.weatherData = data;
        this.sunriseTime = new Date(this.weatherData.sys.sunrise * 1000).toLocaleTimeString();
        this.sunsetTime = new Date(this.weatherData.sys.sunset * 1000).toLocaleTimeString();
      },
      error: (error) => console.error('Error fetching weather:', error)
    });

    // Get 5-day forecast
    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => {
        console.log('Forecast Data:', data);
        
        // Filter only today's forecast
        const today = new Date().getDate();
        this.forecastData = data.list.filter((item: any) => {
          return new Date(item.dt * 1000).getDate() === today;
        });
      },
      error: (error) => console.error('Error fetching forecast:', error)
    });
  }

  getWeatherIcon(description: string): string {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return 'fa-solid fa-sun'; // Sun icon for clear sky
      case 'scattered clouds':
        return 'fa-solid fa-cloud'; // Cloud icon for scattered clouds
      case 'broken clouds':
        return 'fa-solid fa-cloud-sun'; // Partially cloudy icon
      case 'few clouds':
        return 'fa-solid fa-cloud-sun-rain'; // Few clouds with sun
      default:
        return 'fa-solid fa-smog'; // Default icon for unknown conditions
    }
  }
  
}

