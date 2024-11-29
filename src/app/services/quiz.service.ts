import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// TO DO INTERFACE à déplacer dans un fichier séparé

// Interface pour les questions de quiz
// On a besoin de ces informations pour afficher les questions
export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // Url de base de l'API
  private baseUrl = 'https://opentdb.com/api.php';

  // Dans le constructeur, on injecte le service HttpClient,
  // car c'est lui qui va nous permettre de faire des requêtes HTTP
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer des questions de quiz,
  // ici en paramètre, on peut spécifier le nombre de questions, la catégorie et la difficulté.
  // On retourne un Observable qui contient un tableau de questions
  getQuestions(amount: number = 10, categories?: string, difficulty?: string): Observable<QuizQuestion[]> {
    // On construit l'URL de l'API en fonction des paramètres
    let url = `${this.baseUrl}?amount=${amount}`;
    // Si on a spécifié des catégories, on les ajoute à l'URL
    // On peut spécifier plusieurs catégories en les séparant par des virgules
    if (categories) {
      const categoryIds = categories.split(',');
      if (categoryIds.length === 1) {
        url += `&category=${categoryIds[0]}`;
      }
    }
    // Si on a spécifié une difficulté, on l'ajoute à l'URL
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    // Esnfin, on fait la requête HTTP en utilisant le service HttpClient
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }
  // Méthode pour récupérer les catégories de quiz
  getCategories() {
    return this.http.get('https://opentdb.com/api_category.php').pipe(
      map((response: any) => response.trivia_categories)
    );
  }
}