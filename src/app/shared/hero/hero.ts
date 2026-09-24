import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  titre = input<string>();
  description = input<string | null>();
  cta1 = input<string | null>();
  cta2 = input<string | null>();
  imageUrl = input<string | null>();
}
