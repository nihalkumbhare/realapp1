import {  Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipie } from "./recipie.model";
@Injectable()
export class RecipieService {
    recipiesChanged = new Subject<Recipie[]>();
    // private recipies: Recipie[] = [
    //     new Recipie(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!', 
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU8iTAzOgDflWgKpUP1YaGR-ZD8Ga0ETy-SA&usqp=CAU',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries',20)
    //     ]),
    //     new Recipie('Big Fat Burger', 
    //         'What else you need to say?', 
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZDF8Vtg10bJ3O8EsumtijVjTAbO-s6F3EgQ&usqp=CAU',
    //     [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //     ])
    //];
private recipies: Recipie[]=[];

    constructor(private slService: ShoppingListService){}
    setRecipies(recipies: Recipie[]){
        this.recipies = recipies;
        this.recipiesChanged.next(this.recipies.slice());
    }
    getRecipies() {
        return this.recipies.slice();
    }

    getRecipie(index: number) {
        return this.recipies[index];
    }
     addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
     }
     addRecipie(recipie: Recipie){
        this.recipies.push(recipie);
        this.recipiesChanged.next(this.recipies.slice());
     }
     updateRecipie(index: number, newRecipie: Recipie){
        this.recipies[index] = newRecipie;
        this.recipiesChanged.next(this.recipies.slice());
     }
     deleteRecipie(index: number){
        this.recipies.splice(index, 1);
        this.recipiesChanged.next(this.recipies.slice());
     }
}