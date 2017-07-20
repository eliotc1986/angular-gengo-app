import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './users/user-login/user-login.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { MistakesListComponent } from './mistakes/mistakes-list/mistakes-list.component';

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'posts', component: PostsListComponent, canActivate: [AuthGuard]},
  { path: 'phrases', component: TranslationsListComponent, canActivate: [AuthGuard]},
  { path: 'mistakes', component: MistakesListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
