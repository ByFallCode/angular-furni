import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Hero } from '../../shared/hero/hero';

@Component({
  selector: 'app-contact',
  imports: [Header, Footer, Hero],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
    hero = {
    titre: 'Contact Us',
    description: 'Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.',
    cta1: 'Shop Now',
    cta2: 'Learn More',
    imageUrl: 'images/couch.png'
  }
}
