import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from '../main/main.component';

export const routes: Routes = [
    
    { path: '', component: AppComponent},
    {path: 'main', component: MainComponent},

];
