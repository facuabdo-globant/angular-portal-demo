import {
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { IPortalOutlet } from './portal-outlet';

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
  componentFactoryResolver?: ComponentFactoryResolver | null;

  constructor(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef | null,
    injector?: Injector | null,
    componentFactoryResolver?: ComponentFactoryResolver | null,
    projectableNodes?: Node[][] | null
  ) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.componentFactoryResolver = componentFactoryResolver;
    this.projectableNodes = projectableNodes;
  }
}

export class TemplatePortal<C> extends Portal<C> {
  //to implement
}
