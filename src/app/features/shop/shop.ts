import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../shared/hero/hero';
import { ProductItem } from '../../shared/product-item/product-item';

@Component({
  selector: 'app-shop',
  imports: [Header, Footer, Hero, ProductItem],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
    productsLot1 = [
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
    },
    {
      imageUrl: 'images/product-1.png',
      title: 'Ergonomic Chair',
      price: '$43.00',
      detailPageUrl: 'product-detail.html'
    }
  ];

    productsLot2 = [
    {
      imageUrl: 'images/product-2.png',
      title: 'Nordic Chair',
      price: '$50.00',
      detailPageUrl: 'product-detail.html'
    },
    {
      imageUrl: 'images/product-1.png',
      title: 'Kruzo Aero Chair',
      price: '$70008.00',
      detailPageUrl: 'product-detail.html'
    },
    {
      imageUrl: 'images/product-1.png',
      title: 'Ergonomic Chair',
      price: '$43.00',
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
