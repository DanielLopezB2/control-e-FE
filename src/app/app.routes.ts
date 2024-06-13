import { Routes } from '@angular/router';
import { NavContentComponent } from './layout/nav-content/nav-content.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/index' },
    {
        path: 'index', component: NavContentComponent, children: [
            { path: 'main', component: MainComponent },
    ] },
];
