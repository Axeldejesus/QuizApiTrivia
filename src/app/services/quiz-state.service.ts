import { Injectable } from '@angular/core';
import { QuizQuestion } from './quiz.service';

@Injectable({
  providedIn: 'root'
})

// Cette classe permet de gérer l'état du quiz, notamment pour
// mélanger les réponses, vérifier si une réponse est correcte ou non
export class QuizStateService {
  // Mélange les réponses d'une question
  shuffleAnswers(question: QuizQuestion): string[] {
    // Je retourne un tableau contenant la bonne réponse et les mauvaises réponses
    // que je mélange en utilisant Math.random() - 0.5
    return [
      question.correct_answer,
      ...question.incorrect_answers
    ].sort(() => Math.random() - 0.5);
  }

  // Vérifie si la réponse donnée est correcte
  isCorrectAnswer(answer: string, question: QuizQuestion): boolean {
    // Je compare la réponse donnée avec la bonne réponse de la question
    return answer === question.correct_answer;
  }

  // Retourne la classe CSS à appliquer à une réponse
  // Je prend en paramètre la réponse, la question actuelle, la réponse sélectionnée et si la question a été répondue
  getAnswerClass(answer: string, currentQuestion: QuizQuestion | null, selectedAnswer: string | null, isAnswered: boolean): string {
    // Si la question n'a pas été répondue, je retourne une chaîne vide
    if (!isAnswered) return '';
    // Si la réponse est la bonne réponse, je retourne 'correct'
    if (answer === currentQuestion?.correct_answer) {
      return 'correct';
    }
    // Si la réponse est la réponse sélectionnée et que ce n'est pas la bonne réponse, je retourne 'incorrect'
    if (answer === selectedAnswer) {
      return 'incorrect';
    }
    // Sinon, je retourne une chaîne vide
    return '';
  }
}