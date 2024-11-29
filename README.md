### QUIZ AVEC API TRIVIA

### AppModule (app.module.ts)
Module racine de l'application qui configure les dépendances principales :
- BrowserModule : Fournit les services essentiels pour le navigateur
- IonicModule : Configure Ionic Framework  
- AppRoutingModule : Gère le routage principal
- HttpClientModule : Permet les requêtes HTTP

### AppRoutingModule (app-routing.module.ts)
Gère la configuration du routage principal :
- Utilise la stratégie PreloadAllModules pour le chargement des modules
- Implémente le lazy loading pour optimiser les performances

### TabsPageRoutingModule (tabs-routing.module.ts) 
Gère la navigation entre les onglets :
- Quiz (/quiz)
- Catégories (/categories)
- Profil (/profile)

### Modules de Fonctionnalités
Chaque section a son propre module :

#### QuizPageModule
```typescript
imports: [CommonModule, FormsModule, IonicModule, RouterModule]
declarations: [QuizPage]
```

#### CategoriesPageModule
```typescript
imports: [CommonModule, FormsModule, IonicModule, RouterModule]
declarations: [CategoriesPage]
```

#### ProfilePageModule
```typescript
imports: [CommonModule, FormsModule, IonicModule, RouterModule]
declarations: [ProfilePage]
```

## Lazy Loading
Le projet utilise le lazy loading pour charger les modules à la demande :
```typescript
loadChildren: () => import('./path/to/module').then(m => m.Module)
```

## Bonnes Pratiques
1. Chaque fonctionnalité majeure a son propre module
2. Utilisation du lazy loading pour optimiser les performances
3. Séparation claire des responsabilités entre les modules
4. Importation uniquement des modules nécessaires dans chaque feature module

## Configuration des Routes
Les routes sont organisées hiérarchiquement :
- Route racine → TabsPage
- Routes enfants → Quiz, Categories, Profile

## Imports Communs
Chaque module de fonctionnalité partage des imports communs :
- CommonModule : Directives Angular de base
- FormsModule : Gestion des formulaires
- IonicModule : Composants Ionic
- RouterModule : Configuration des routes

## Conclusion
Cette architecture modulaire permet :
- Une meilleure organisation du code
- Une maintenance facilitée  
- Des performances optimisées grâce au lazy loading
- Une séparation claire des responsabilités