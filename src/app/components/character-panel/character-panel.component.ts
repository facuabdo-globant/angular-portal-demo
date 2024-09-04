import { Component, OnInit, Signal, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CharacterResponse } from 'src/app/api/interfaces/reponse';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PortalRef } from 'src/app/portal/portal';
import { RickAndMortyService } from './../../api/rick-and-morty.service';
import { toSignal } from '@angular/core/rxjs-interop';

const responsiveOptions = [
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

@Component({
  selector: 'app-character-panel',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    CardModule,
    CarouselModule,
  ],
  templateUrl: './character-panel.component.html',
  styleUrl: './character-panel.component.scss',
})
export class CharacterPanelComponent {
  portalRef = inject(PortalRef);

  characterData: Signal<CharacterResponse | undefined>;

  responsiveOptions = responsiveOptions;

  constructor(private rickAndMortyService: RickAndMortyService) {
    this.characterData = toSignal(this.rickAndMortyService.getCharacters());
  }

  closeCharacterPanel(){
    this.portalRef.closePortal();
  }
}
