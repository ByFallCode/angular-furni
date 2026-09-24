import { Component } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';
import { Hero } from '../../shared/hero/hero';
import { ProductItem } from '../../shared/product-item/product-item';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, Hero, ProductItem],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  hero = {
    titre: 'Modern Interior \n Design Studio',
    description: 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.',
    cta1: 'Shop Now',
    cta2: 'Learn More',
    imageUrl: 'images/couch.png'
  }

  products = [
    {
      imageUrl: 'images/product-1.png',
      title: 'Nordic Chair',
      price: '$50.00',
      detailPageUrl: 'product-detail.html'
    },
    {
      imageUrl: 'images/product-2.png',
      title: 'Kruzo Aero Chair',
      price: '$70008.00',
      detailPageUrl: 'product-detail.html'
    },
    {
      imageUrl: 'images/product-3.png',
      title: 'Ergonomic Chair',
      price: '$43.00',
      detailPageUrl: 'product-detail.html'
    }
  ];
}
