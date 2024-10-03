import { Component, Type } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PortalRef } from './portal/portal';
import { PortalService } from './portal/portal.service';
import { RickAndMortyService } from './api/rick-and-morty.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [PortalService, RickAndMortyService],
})
export class AppComponent {
  portalRef: PortalRef<any> | undefined;
  componentTypeExpression: Type<any> | null = null;
  constructor() {}

  async showCharactersPanel() {
    const { CharacterPanelComponent } = await import(
      './components/character-panel/character-panel.component'
    );

    this.componentTypeExpression = CharacterPanelComponent;
  }

  async showEpisodesPanel() {
    const { EpisodePanelComponent } = await import(
      './components/episode-panel/episode-panel.component'
    );

    this.componentTypeExpression = EpisodePanelComponent;
  }

  async showLocationsPanel() {
    const { LocationPanelComponent } = await import(
      './components/location-panel/location-panel.component'
    );

    this.componentTypeExpression = LocationPanelComponent;
  }
}
