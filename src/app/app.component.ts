import {
  Component,
  ComponentRef,
  ViewContainerRef,
  viewChild,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
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
  dynamicContainerRef = viewChild('dynamicContainer', {
    read: ViewContainerRef,
  });

  currentComponent: ComponentRef<any> | undefined;

  constructor() {}

  async showCharactersPanel() {
    const { CharacterPanelComponent } = await import(
      './components/character-panel/character-panel.component'
    );

    this.currentComponent = this.dynamicContainerRef()?.createComponent(
      CharacterPanelComponent
    );
  }

  async showEpisodesPanel() {
    const { EpisodePanelComponent } = await import(
      './components/episode-panel/episode-panel.component'
    );

    this.currentComponent = this.dynamicContainerRef()?.createComponent(
      EpisodePanelComponent
    );
  }

  async showLocationsPanel() {
    const { LocationPanelComponent } = await import(
      './components/location-panel/location-panel.component'
    );

    this.currentComponent = this.dynamicContainerRef()?.createComponent(
      LocationPanelComponent
    );
  }
}
