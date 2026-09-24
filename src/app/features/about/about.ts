import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../shared/hero/hero';

@Component({
  selector: 'app-about',
  imports: [Header, Footer, Hero],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
    hero = {
    titre: 'About Us',
    description: 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.',
    cta1: 'Shop Now',
    cta2: 'Learn More',
    imageUrl: 'images/couch.png'
  }
}
