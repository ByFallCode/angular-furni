import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  imageUrl = input<string>();
  title = input<string>();
  price = input<number>();
  detailPageUrl = input<string>();
}
