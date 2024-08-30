import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  inject,
} from '@angular/core';
import { ComponentPortal, ComponentType, Portal } from './portal';
import { DOCUMENT } from '@angular/common';
import { PortalOutlet } from './portal-outlet';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private componentFactoryResolver = inject(ComponentFactoryResolver);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  insertComponentInElementById<T>(
    component: ComponentType<T>,
    id?: string,
    externalPortalOutlet?: PortalOutlet
  ) {
    const outletElement = id
      ? (this.document.getElementById(id) as Element)
      : (this.createContainerElement() as Element);

    const portalOutlet =
      externalPortalOutlet ||
      new PortalOutlet(
        outletElement,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );

    const portal = new ComponentPortal(component);
    portalOutlet.attach<T, any>(portal);

    return new PortalRef(portalOutlet, portal);
  }

  private createContainerElement() {
    const containerElement = this.document.createElement('div');
    containerElement.id = `dynamic-container${Math.round(Math.random() * 100)}`;
    return this.document.body.appendChild(containerElement);
  }
}

export class PortalRef<T> {
  constructor(public portalOutlet: PortalOutlet, private portal: Portal<T>) {}

  closePortal() {
    this.portalOutlet.detach();
    this.portalOutlet.dispose();
  }
}
