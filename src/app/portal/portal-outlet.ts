import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injector,
  createComponent,
} from '@angular/core';
import { ComponentPortal, Portal, TemplatePortal } from './portal';

export class PortalOutlet implements IPortalOutlet {
  private attachedPortal: Portal<any> | null = null;

  private disposeFn: (() => void) | null = null;

  constructor(
    public outletElement: Element,
    private environmentInjector: EnvironmentInjector,
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
    if (this.hasAttached()) {
      this.detach();
    }

    if (this.disposeFn) {
      this.disposeFn();
      this.disposeFn = null;
    }
  }

  hasAttached(): boolean {
    return !!this.attachedPortal;
  }

  private attachComponentPortal<T>(
    portal: ComponentPortal<T>
  ): ComponentRef<T> {
    const componentRef: ComponentRef<T> = createComponent(portal.component, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.defaultInjector || Injector.NULL,
    });

    this.setDisposeFn(() => {
      if (this.appRef!.viewCount > 0) {
        this.appRef?.detachView(componentRef.hostView);
      }
      componentRef.destroy();
    });

    this.appRef?.attachView(componentRef.hostView);

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
