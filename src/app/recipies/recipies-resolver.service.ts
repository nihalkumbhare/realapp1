import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipie } from "./recipie.model";
import { RecipieService } from "./recipie.service";

@Injectable({ providedIn: 'root' })
export class RecipiesResolverService implements Resolve<Recipie[]> {
    constructor(private dataStorageService: DataStorageService, private recipieService: RecipieService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipies = this.recipieService.getRecipies();

        if(recipies.length === 0){
            return this.dataStorageService.fetchRecipies();
        }
        else{
            return recipies;
        }
       
    }
}