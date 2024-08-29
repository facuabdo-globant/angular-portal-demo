import { Component, OnInit } from '@angular/core';
import { PortalRef, PortalService } from './portal/portal.service';

import { AltDynamicComponent } from './components/alt-dynamic/alt-dynamic.component';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { Observable } from 'rxjs';
import { PortalOutlet } from 'src/app/portal/portal-outlet';
import { RickAndMortyService } from './api/rick-and-morty.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [PortalService, RickAndMortyService],
})
export class AppComponent implements OnInit {
  portalRef: PortalRef<any> | null = null;
  rmCharacters: Observable<any> | null = null;

  constructor(
    private portalService: PortalService,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.rmCharacters = this.rickAndMortyService.getCharacters();

    this.portalRef = this.portalService.insertComponentInElementById(
      DynamicComponent,
      'dynamic-container'
    );

    setTimeout(() => {
      const portalOutletRef = this.portalRef?.portalOutlet;

      this.closePortal();
      this.portalRef = this.portalService.insertComponentInElementById(
        AltDynamicComponent,
        'dynamic-container',
        portalOutletRef
      );
    }, 5000);
  }

  closePortal() {
    this.portalRef?.closePortal();
  }
}
