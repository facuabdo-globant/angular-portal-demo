import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { Character } from 'src/app/api/interfaces/character';
import { CommonModule } from '@angular/common';
import { LocationResponse } from 'src/app/api/interfaces/reponse';
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
  selector: 'app-location-panel',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    CardModule,
    CarouselModule,
  ],
  templateUrl: './location-panel.component.html',
  styleUrl: './location-panel.component.scss',
})
export class LocationPanelComponent {
  private episodeResponse: LocationResponse | undefined = undefined;
  locationData = signal<LocationResponse | undefined>(this.episodeResponse);
  characterData = signal<{ [key: string]: Character[] }>({});
  hideCharacters = signal<{ [key: string]: boolean }>({});

  responsiveOptions = responsiveOptions;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  async ngOnInit(): Promise<void> {
    const locationData = await lastValueFrom(
      this.rickAndMortyService.getLocations()
    );

    this.locationData.set(locationData);
  }

  async showLocationInhabitants(locationURL: string, characterURLs: string[]) {
    this.toggleLocationInhabitants(locationURL, false);

    if (!this.characterData()[locationURL]) {
      const characterRequestArray: { [key: string]: Promise<any> } = {};

      characterURLs.forEach((url) => {
        characterRequestArray[url] = fetch(url).then((response: Response) =>
          response.json()
        );
      });

      const locationInhabitants: Character[] = await Promise.all(
        Object.values(characterRequestArray)
      );

      this.characterData.update((characters) => {
        return { ...characters, [locationURL]: locationInhabitants };
      });
    }
  }

  toggleLocationInhabitants(locationURL: string, value: boolean) {
    this.hideCharacters.update((locationCharacters) => {
      return { ...locationCharacters, [locationURL]: value };
    });
  }
}
