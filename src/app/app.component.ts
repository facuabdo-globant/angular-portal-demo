import { Component, OnInit } from '@angular/core';
import { PortalRef, PortalService } from './portal/portal.service';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RickAndMortyService } from './api/rick-and-morty.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [PortalService, RickAndMortyService],
})
export class AppComponent implements OnInit {
  portalRef: PortalRef<any> | null = null;
  rmCharacters: Observable<any> | null = null;

  constructor(private portalService: PortalService) {}

  ngOnInit(): void {}

  async showCharactersPanel() {
    const { CharacterPanelComponent } = await import('./components/character-panel/character-panel.component');
    this.portalService.insertComponentInElementById(
      CharacterPanelComponent,
      'dynamic-container'
    );
  }

  closePortal() {
    this.portalRef?.closePortal();
  }
}
