import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../shared/hero/hero';

@Component({
  selector: 'app-services',
  imports: [Header, Footer, Hero],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
    hero = {
    titre: 'Services',
    description: 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.',
    cta1: 'Shop Now',
    cta2: 'Learn More',
    imageUrl: 'images/couch.png'
  }
}
