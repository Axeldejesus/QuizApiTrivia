import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})

// Cette classe permet de récupérer les catégories et les afficher
// J'implemente OnInit pour pouvoir utiliser ngOnInit
export class CategoriesPage implements OnInit {
  // ici je déclare les variables qui vont me servir
  // pour les catégories, les catégories sélectionnées, le nombre de questions et la difficulté
  categories: any[] = [];
  selectedCategories: number[] = [];
  numberOfQuestions: number = 10;
  difficulty: string = 'any';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    // ici je récupère les catégories et je les affiche
    // je les récupère en utilisant la méthode getCategories() du service quizService
    // et le subscribe pour les mettres dans la variable categories
    this.quizService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Cette fonction sert à ajouter ou enlever une catégorie
  toggleCategory(categoryId: number) {
    const index = this.selectedCategories.indexOf(categoryId);
    // si la catégorie ne se trouve pas dans le tableau, je l'ajoute
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      // si la catégorie se trouve dans le tableau, je l'en enlève
      this.selectedCategories.splice(index, 1);
    }
  }

  // Cette fonction sert à démarrer le quiz configuré
  startQuiz() {
    // si il y a des catégories sélectionnées, je redirige vers la page quiz
    if (this.selectedCategories.length > 0) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          // avec les paramètres suivants : les catégories sélectionnées, le nombre de questions et la difficulté
          categories: this.selectedCategories.join(','),
          amount: this.numberOfQuestions,
          difficulty: this.difficulty !== 'any' ? this.difficulty : ''
        }
      });
    }
  }
}