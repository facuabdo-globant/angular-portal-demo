import { Component, Signal } from '@angular/core';

import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CharacterResponse } from 'src/app/api/interfaces/reponse';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { RickAndMortyService } from './../../api/rick-and-morty.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-panel',
  standalone: true,
  imports: [CommonModule, PanelModule, CardModule, CarouselModule],
  templateUrl: './character-panel.component.html',
  styleUrl: './character-panel.component.scss',
})
export class CharacterPanelComponent {
  characterData: Signal<CharacterResponse | undefined>;

  responsiveOptions = [
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private rickAndMortyService: RickAndMortyService) {
    this.characterData = toSignal(this.rickAndMortyService.getCharacters());
  }
}
