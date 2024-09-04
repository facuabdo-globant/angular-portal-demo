import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  constructor(private portalService: PortalService) {}

  async showCharactersPanel() {
    if (this.portalRef) {
      this.closePortal();
    }

    const { CharacterPanelComponent } = await import(
      './components/character-panel/character-panel.component'
    );

    this.portalRef = this.portalService.insertComponentInElementById(
      CharacterPanelComponent,
      'dynamic-container'
    );
  }

  async showEpisodesPanel() {
    if (this.portalRef) {
      this.closePortal();
    }

    const { EpisodePanelComponent } = await import(
      './components/episode-panel/episode-panel.component'
    );

    this.portalRef = this.portalService.insertComponentInElementById(
      EpisodePanelComponent,
      'dynamic-container'
    );
  }

  async showLocationsPanel() {
    if (this.portalRef) {
      this.closePortal();
    }

    const { LocationPanelComponent } = await import(
      './components/location-panel/location-panel.component'
    );

    this.portalRef = this.portalService.insertComponentInElementById(
      LocationPanelComponent,
      'dynamic-container'
    );
  }

  closePortal() {
    this.portalRef?.closePortal();
  }
}
