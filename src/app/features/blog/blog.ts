import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../shared/hero/hero';

@Component({
  selector: 'app-blog',
  imports: [Header, Footer, Hero],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
    hero = {
    titre: 'Blog',
    description: 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.',
    cta1: 'Shop Now',
    cta2: 'Learn More',
    imageUrl: 'images/couch.png'
  }
}
