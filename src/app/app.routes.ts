import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Shop } from './features/shop/shop';
import { Services } from './features/services/services';
import { Contact } from './features/contact/contact';
import { Blog } from './features/blog/blog';
import { Cart } from './features/cart/cart';
import { Login } from './features/login/login';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  // composant Pere
  {
    path: '',
    component: MainLayout,
    children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'about',
          component: About
        },
        {
          path: 'shop',
          component: Shop
        },
        {
          path: 'services',
          component: Services
        },
        {
          path: 'contact',
          component: Contact
        },
        {
          path: 'blog',
          component: Blog
        },
        {
          path: 'cart',
          component: Cart
        }
    ]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '**',
    redirectTo: ''
  }
];
