import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CharacterResponse } from 'src/app/api/interfaces/reponse';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PanelModule } from 'primeng/panel';
import { RickAndMortyService } from './../../api/rick-and-morty.service';

@Component({
  selector: 'app-character-panel',
  standalone: true,
  imports: [CommonModule, PanelModule, CardModule, CarouselModule],
  templateUrl: './character-panel.component.html',
  styleUrl: './character-panel.component.scss',
})
export class CharacterPanelComponent {
  characterData$: Observable<CharacterResponse>;

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private rickAndMortyService: RickAndMortyService) {
    this.characterData$ = this.rickAndMortyService.getCharacters();
  }
}
