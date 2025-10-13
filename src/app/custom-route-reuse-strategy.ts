import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {    
    return false;  // Don't store any routes
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig?.path || '', handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;  // Don't reuse stored routes
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(route.routeConfig?.path || '') || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}