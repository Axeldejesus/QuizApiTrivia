import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Ici j'ai qu'une route qui permet de charger le module TabsPageModule qui se trouve dans le dossier tabs
// cela permet de charger les pages de l'application
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

// Ici on importe le RouterModule et on exporte le module AppRoutingModule
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}