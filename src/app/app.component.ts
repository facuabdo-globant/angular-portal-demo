import { Component, OnInit } from '@angular/core';

import { AltDynamicComponent } from './alt-dynamic/alt-dynamic.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { PortalOutlet } from 'src/app/portal/portal-outlet';
import { PortalService } from './portal/portal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  portalOutlet: PortalOutlet | null = null;

  constructor(private portalService: PortalService) {}

  ngOnInit(): void {
    this.portalOutlet = this.portalService.insertComponentInElementById(
      DynamicComponent,
      'dynamic-container'
    );

    setTimeout(() => {
      const portalOutletRef = this.portalOutlet;

      this.closePortal();
      this.portalOutlet = this.portalService.insertComponentInElementById(
        AltDynamicComponent,
        'dynamic-container',
        portalOutletRef!
      );
    }, 5000);
  }

  closePortal() {
    this.portalOutlet?.detach();
    this.portalOutlet?.dispose();
  }
}
