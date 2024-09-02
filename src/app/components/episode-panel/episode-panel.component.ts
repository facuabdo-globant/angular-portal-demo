import { Component, Signal } from '@angular/core';

import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { EpisodeResponse } from 'src/app/api/interfaces/reponse';
import { PanelModule } from 'primeng/panel';
import { RickAndMortyService } from 'src/app/api/rick-and-morty.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-episode-panel',
  standalone: true,
  imports: [CommonModule, PanelModule, CardModule, CarouselModule],
  templateUrl: './episode-panel.component.html',
  styleUrl: './episode-panel.component.scss',
})
export class EpisodePanelComponent {
  episodeData: Signal<EpisodeResponse | undefined>;

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
    this.episodeData = toSignal(this.rickAndMortyService.getEpisodes());
  }
}
