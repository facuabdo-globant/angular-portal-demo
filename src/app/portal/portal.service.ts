import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ComponentPortal, ComponentType, Portal, PortalRef } from './portal';

import { DOCUMENT } from '@angular/common';
import { PortalOutlet } from './portal-outlet';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private vcr = inject(ViewContainerRef);
  private document = inject(DOCUMENT);
  private environmentInjector = inject(EnvironmentInjector);

  /**
   * @param component The rendered component's type
   * @param id Id of the HTML element where we're injecting the component
   * @param externalPortalOutlet The outlet where we're rendering the component
   * @returns A reference to the outlet that allows to clean it
   */
  insertComponentInElementById<T>(
    component: ComponentType<T>,
    id: string,
    externalPortalOutlet?: PortalOutlet
  ) {
    const outletElement = this.document.getElementById(id) as Element;

    if (!outletElement) {
      console.error("There's no element in the DOM with the specified ID");
      return;
    }

    const portalOutlet =
      externalPortalOutlet ||
      new PortalOutlet(
        outletElement,
        this.environmentInjector,
        this.appRef,
        this.injector
      );

    const portal = new ComponentPortal(component, this.vcr || null);
    portalOutlet.attach<T, any>(portal);

    return new PortalRef(portalOutlet, portal);
  }
}