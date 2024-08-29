import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  inject,
} from '@angular/core';
import { ComponentPortal, ComponentType } from './portal';
import { DOCUMENT } from '@angular/common';
import { PortalOutlet } from './portal-outlet';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private componentFactoryResolver: ComponentFactoryResolver = inject(
    ComponentFactoryResolver
  );
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  insertComponentInElementById<T>(id: string, component: ComponentType<T>) {
    const outletElement = this.document.getElementById(
      'dynamic-container'
    ) as Element;

    const portalOutlet = new PortalOutlet(
      outletElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    const portal = new ComponentPortal(component);
    portalOutlet!.attach<T, any>(portal);

    return portalOutlet;
  }
}
