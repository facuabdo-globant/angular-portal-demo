import { Component, OnInit, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { Character } from 'src/app/api/interfaces/character';
import { CommonModule } from '@angular/common';
import { EpisodeResponse } from 'src/app/api/interfaces/reponse';
import { PanelModule } from 'primeng/panel';
import { RickAndMortyService } from 'src/app/api/rick-and-morty.service';
import { lastValueFrom } from 'rxjs';

const responsiveOptions = [
  {
    breakpoint: '1280px',
    numVisible: 10,
    numScroll: 5,
  },
  {
    breakpoint: '1024px',
    numVisible: 5,
    numScroll: 2,
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1,
  },
];

@Component({
  selector: 'app-episode-panel',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    CardModule,
    CarouselModule,
  ],
  templateUrl: './episode-panel.component.html',
  styleUrl: './episode-panel.component.scss',
})
export class EpisodePanelComponent implements OnInit {
  private episodeResponse: EpisodeResponse | undefined = undefined;
  episodeData = signal<EpisodeResponse | undefined>(this.episodeResponse);
  characterData = signal<{ [key: string]: Character[] }>({});

  responsiveOptions = responsiveOptions;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  async ngOnInit(): Promise<void> {
    const episodeData = await lastValueFrom(
      this.rickAndMortyService.getEpisodes()
    );

    this.episodeData.set(episodeData);
  }

  async showEpisodeCharacters(episodeUrl: string, characterURLs: string[]) {
    const characterRequestArray: { [key: string]: Promise<any> } = {};

    characterURLs.forEach((url) => {
      characterRequestArray[url] = fetch(url);
    });

    const characters = await Promise.all(Object.values(characterRequestArray));

    const charactersJson: Character[] = await Promise.all(
      characters.map((response: Response) => response.json())
    );

    this.characterData.update((characters) => {
      return { ...characters, [episodeUrl]: charactersJson };
    });
  }
}
