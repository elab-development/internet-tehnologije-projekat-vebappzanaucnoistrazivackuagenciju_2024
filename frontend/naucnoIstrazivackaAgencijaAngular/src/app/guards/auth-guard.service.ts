import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PermissionsService } from "../service/permissions.service";
import { inject } from "@angular/core";
import { LocalStorageService } from "../service/local-storage.service";

export const canActivateTokenGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    let canActivate = false;
    canActivate = inject(PermissionsService).canActivate(inject(LocalStorageService).get("userToken"));
    if(!canActivate){
        inject(Router).navigate(['/home/account']);
    }
    return canActivate;
  };