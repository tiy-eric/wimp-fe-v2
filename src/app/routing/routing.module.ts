import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent }   from '../movie/movie.component';
import { MovieFormComponent }   from '../movie-form/movie-form.component';
import { HomeComponent }   from '../home/home.component';
import { MovieActorFormComponent }   from '../movie-actor-form/movie-actor-form.component';
import { ActorComponent }   from '../actor/actor.component';
import { ActorFormComponent }   from '../actor-form/actor-form.component';
import { ActorAwardFormComponent }   from '../actor-award-form/actor-award-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'movie',  component: MovieComponent },
  { path: 'movie/edit/:id', component: MovieFormComponent },
  { path: 'movie/add', component: MovieFormComponent },
  { path: 'movieactor/add/:id', component: MovieActorFormComponent },
  { path: 'actor',  component: ActorComponent },
  { path: 'actor/edit/:id', component: ActorFormComponent },
  { path: 'actor/add', component: ActorFormComponent },
  { path: 'actoraward/add/:id', component: ActorAwardFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
