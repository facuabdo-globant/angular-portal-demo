import { Component, OnInit, inject, signal } from '@angular/core';
import { FlagMap, ResourceCharacterMap } from 'src/app/types/panel.types';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { Character } from 'src/app/api/interfaces/character';
import { CommonModule } from '@angular/common';
import { EpisodeResponse } from 'src/app/api/interfaces/reponse';
import { PanelModule } from 'primeng/panel';
import { PortalRef } from 'src/app/portal/portal';
import { RickAndMortyService } from 'src/app/api/rick-and-morty.service';
import { lastValueFrom } from 'rxjs';
import { secondaryPanelResponsiveOptions } from 'src/app/utils/constants';

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
  rickAndMortyService = inject(RickAndMortyService);
  portalRef = inject(PortalRef);

  private episodeResponse: EpisodeResponse | undefined = undefined;

  charactersLoading = signal<FlagMap>({});
  error = signal<FlagMap>({});
  episodeData = signal<EpisodeResponse | undefined>(this.episodeResponse);
  characterData = signal<ResourceCharacterMap>({});
  hideCharacters = signal<FlagMap>({});

  responsiveOptions = secondaryPanelResponsiveOptions;

  async ngOnInit(): Promise<void> {
    const episodeData = await lastValueFrom(
      this.rickAndMortyService.getEpisodes()
    );

    this.episodeData.set(episodeData);
  }

  async showEpisodeCharacters(episodeUrl: string, characterURLs: string[]) {
    this.toggleEpisodeCharacters(episodeUrl, false);

    if (!this.characterData()[episodeUrl]) {
      const characterRequestArray: { [key: string]: Promise<any> } = {};

      characterURLs.forEach(url => {
        characterRequestArray[url] = fetch(url).then((response: Response) =>
          response.json()
        );
      });

      try {
        this.charactersLoading.update(loadingFlags => {
          return { ...loadingFlags, [episodeUrl]: true };
        });

        const locationResidents: Character[] = await Promise.all(
          Object.values(characterRequestArray)
        );

        this.characterData.update(characters => {
          return { ...characters, [episodeUrl]: locationResidents };
        });
      } catch {
        this.error.update(errorFlags => {
          return { ...errorFlags, [episodeUrl]: true };
        });
      } finally {
        setTimeout(() => {
          this.charactersLoading.update(loadingFlags => {
            return { ...loadingFlags, [episodeUrl]: false };
          });
        }, 300);
      }
    }
  }

  toggleEpisodeCharacters(episodeUrl: string, value: boolean) {
    this.hideCharacters.update(characters => {
      return { ...characters, [episodeUrl]: value };
    });
  }

  closePanel() {
    this.portalRef.closePortal();
  }
}
