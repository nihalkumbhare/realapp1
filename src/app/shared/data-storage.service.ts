import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipie } from '../recipies/recipie.model';
import { RecipieService } from '../recipies/recipie.service';
import { map ,tap} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipiesService: RecipieService){

    }
    storeRecipies(){
        const recipies =  this.recipiesService.getRecipies();
        return this.http.put('https://realapp1-6ef86-default-rtdb.firebaseio.com/recipies.json', recipies)
        .subscribe(response => {
            console.log(response);
        });
    }
    fetchRecipies(){
        return this.http
        .get<Recipie[]>('https://realapp1-6ef86-default-rtdb.firebaseio.com/recipies.json')
        .pipe(map(recipies => {
            return recipies.map(recipie => {
                return {...recipie, ingredients: recipie.ingredients ? recipie.ingredients : []
                };
            });
        }),
        tap(recipies => {
            this.recipiesService.setRecipies(recipies);
        })
        )
       
    }
}