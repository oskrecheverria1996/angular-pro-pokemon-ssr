import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about-page.component'),
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing-page.component'),
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact-page.component'),
    },

    // {
    //     path: '**',
    //     redirectTo: 'about'
    // },
    // min 7:30 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44958075#overview
    {
        path: '**',
        redirectTo: () => {
            // const authService = inject(AuthService)
            
            return 'about'
        }
    },
];
