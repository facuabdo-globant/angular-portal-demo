import { Component, inject, signal } from '@angular/core';
import {
  FlagMap,
  PromiseMap,
  ResourceCharacterMap,
} from 'src/app/types/panel.types';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { Character } from 'src/app/api/interfaces/character';
import { CommonModule } from '@angular/common';
import { LocationResponse } from 'src/app/api/interfaces/reponse';
import { PanelModule } from 'primeng/panel';
import { PortalRef } from 'src/app/portal/portal';
import { RickAndMortyService } from 'src/app/api/rick-and-morty.service';
import { lastValueFrom } from 'rxjs';
import { secondaryPanelResponsiveOptions } from 'src/app/utils/constants';

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
  rickAndMortyService = inject(RickAndMortyService);

  private locationResponse: LocationResponse | undefined = undefined;
  charactersLoading = signal<FlagMap>({});
  error = signal<FlagMap>({});
  locationData = signal<LocationResponse | undefined>(this.locationResponse);
  characterData = signal<ResourceCharacterMap>({});
  hideCharacters = signal<FlagMap>({});

  responsiveOptions = secondaryPanelResponsiveOptions;

  async ngOnInit(): Promise<void> {
    const locationData = await lastValueFrom(
      this.rickAndMortyService.getLocations()
    );

    this.locationData.set(locationData);
  }

  async showLocationResidents(locationURL: string, characterURLs: string[]) {
    this.toggleLocationResidents(locationURL, false);

    if (!this.characterData()[locationURL]) {
      const characterRequestArray: PromiseMap = {};

      characterURLs.forEach(url => {
        characterRequestArray[url] = fetch(url).then((response: Response) =>
          response.json()
        );
      });

      try {
        this.charactersLoading.update(loadingFlags => {
          return { ...loadingFlags, [locationURL]: true };
        });

        const locationResidents: Character[] = await Promise.all(
          Object.values(characterRequestArray)
        );

        this.characterData.update(characters => {
          return { ...characters, [locationURL]: locationResidents };
        });
      } catch {
        this.error.update(errorFlags => {
          return { ...errorFlags, [locationURL]: true };
        });
      } finally {
        setTimeout(() => {
          this.charactersLoading.update(loadingFlags => {
            return { ...loadingFlags, [locationURL]: false };
          });
        }, 300);
      }
    }
  }

  toggleLocationResidents(locationURL: string, value: boolean) {
    this.hideCharacters.update(locationCharacters => {
      return { ...locationCharacters, [locationURL]: value };
    });
  }
}
