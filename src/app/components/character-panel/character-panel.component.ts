import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PortalRef } from 'src/app/portal/portal';
import { RickAndMortyService } from './../../api/rick-and-morty.service';
import { characterPanelResponsiveOptions } from 'src/app/utils/constants';
import { toSignal } from '@angular/core/rxjs-interop';

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
  rickAndMortyService = inject(RickAndMortyService);

  characterData = toSignal(this.rickAndMortyService.getCharacters());

  responsiveOptions = characterPanelResponsiveOptions;
}
