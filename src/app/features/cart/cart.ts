import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Hero } from '../../shared/hero/hero';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-cart',
  imports: [Header, Hero, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {}
