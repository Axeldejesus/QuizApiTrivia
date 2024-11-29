import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


// On définit les routes de notre application
// Chaque route est associée à un composant
// Ici, on a 3 routes : quiz, categories et profile
// Chaque route est associée à un onglet du menu
// Le premier onglet est la page de quiz
// Le deuxième onglet est la page de catégories
// Le troisième onglet est la page de profil

// C'est aussi le principe de lazy loading pour la navigation dans l'application 
// ce qui permet de charger les pages plus rapidement
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'quiz',
        loadChildren: () => import('../pages/quiz/quiz.module').then(m => m.QuizPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full'
      }
    ]
  }
];

// On exporte le module de routing
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}