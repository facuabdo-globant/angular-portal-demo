import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  inject,
} from '@angular/core';
import { ComponentPortal, Portal, TemplatePortal } from './portal';

export class PortalOutlet implements IPortalOutlet {
  private attachedPortal: Portal<any> | null = null;

  private disposeFn: (() => void) | null = null;

  constructor(
    public outletElement: Element,
    private componentFactoryResolver?: ComponentFactoryResolver,
    private appRef?: ApplicationRef,
    private defaultInjector?: Injector
  ) {}

  attach<T, C>(portal: ComponentPortal<T> | TemplatePortal<C>) {
    this.attachedPortal = portal;

    if (portal instanceof ComponentPortal) {
      this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this.attachTemplatePortal(portal);
    }
  }

  detach() {
    if (this.attachedPortal) {
      this.attachedPortal.setAttachedHost(null);
      this.attachedPortal = null;
    }
  }

  dispose(): void {
    throw new Error('Method not implemented.');
  }

  hasAttached(): boolean {
    return !!this.attachedPortal;
  }

  private attachComponentPortal<T>(
    portal: ComponentPortal<T>
  ): ComponentRef<T> {
    const resolver = (portal.componentFactoryResolver ||
      this.componentFactoryResolver)!;

    const componentFactory = resolver.resolveComponentFactory(portal.component);

    let componentRef: ComponentRef<T>;

    if (portal.viewContainerRef) {
      componentRef = portal.viewContainerRef.createComponent(portal.component);

      this.setDisposeFn(() => componentRef.destroy());
    } else {
      componentRef = componentFactory.create(
        portal.injector || this.defaultInjector || Injector.NULL
      );

      this.appRef?.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        if (this.appRef!.viewCount > 0) {
          this.appRef?.detachView(componentRef.hostView);
        }
        componentRef.destroy();
      });
    }

    const componentHtmlElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    this.outletElement.appendChild(componentHtmlElement);
    this.attachedPortal = portal;

    return componentRef;
  }
  private attachTemplatePortal<C>(config: TemplatePortal<C>) {}

  private setDisposeFn(fn: () => void) {
    this.disposeFn = fn;
  }
}

export interface IPortalOutlet {
  attach(portal: Portal<any>): any;

  detach(): any;

  dispose(): void;

  hasAttached(): boolean;
}
