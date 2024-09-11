import { Injector, ViewContainerRef } from '@angular/core';
import { IPortalOutlet, PortalOutlet } from './portal-outlet';

export interface ComponentType<T> {
  new (...args: any[]): T;
}

export abstract class Portal<T> {
  private attachedHost: IPortalOutlet | null = null;

  attach(host: IPortalOutlet) {
    this.attachedHost = host;
    return <T>host.attach(this);
  }

  detach(): void {
    let host = this.attachedHost;

    if (host != null) {
      this.attachedHost = null;
      host.detach();
    }
  }

  get isAttached(): boolean {
    return this.attachedHost != null;
  }

  setAttachedHost(host: IPortalOutlet | null) {
    this.attachedHost = host;
  }
}

export class ComponentPortal<T> extends Portal<T> {
  component: ComponentType<T>;
  viewContainerRef?: ViewContainerRef | null;
  injector?: Injector | null;
  projectableNodes?: Node[][] | null;

  constructor(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef | null,
    injector?: Injector | null,
    projectableNodes?: Node[][] | null
  ) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.projectableNodes = projectableNodes;
  }
}

export class TemplatePortal<C> extends Portal<C> {
  //to implement
}

export class PortalRef<T> {
  constructor(
    public portalOutlet: PortalOutlet,
    private portal: Portal<T>
  ) {}

  closePortal() {
    this.portalOutlet.detach();
    this.portalOutlet.dispose();
  }
}
