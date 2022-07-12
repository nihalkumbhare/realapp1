import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Recipie } from '../recipie.model';
import { RecipieService } from '../recipie.service';
@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit, OnDestroy {
  
  recipies: Recipie[];
  subscription: Subscription;
  constructor(private recipieService: RecipieService,
             private router: Router,
             private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.subscription = this.recipieService.recipiesChanged.subscribe(
      (recipies: Recipie[]) => {
        this.recipies = recipies;
      }
    );
    this.recipies = this.recipieService.getRecipies();
  }

  onNewRecipie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
