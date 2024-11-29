import { Component, OnInit } from '@angular/core';
import { QuizService, QuizQuestion } from '../../services/quiz.service';
import { StatsService } from '../../services/stats.service';
import { QuizStateService } from '../../services/quiz-state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})

// Cette classe est responsable de la logique de la page de quiz.
export class QuizPage implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestion: QuizQuestion | null = null;
  currentIndex = 0;
  score = 0;
  showResult = false;
  selectedAnswer: string | null = null;
  isAnswered = false;
  shuffledAnswers: string[] = [];

  constructor(
    private quizService: QuizService,
    private statsService: StatsService,
    private quizStateService: QuizStateService,
    private route: ActivatedRoute
  ) {}


  // Cette méthode est utilisée pour initialiser les données de la page.
  ngOnInit() {
    // On récupère les paramètres de l'URL pour charger les questions.
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      // On récupère les paramètres de l'URL.
      // Si les paramètres ne sont pas définis, on utilise des valeurs par défaut.
      const amount: number = params['amount'] || 10;
      const categories: string = params['categories'] || '';
      const difficulty: string = params['difficulty'] || '';
      // On charge ensuite les questions en fonction des paramètres.
      this.loadQuestions(amount, categories, difficulty);
    });
  }

  // Cette méthode est utilisée pour charger les questions
  loadQuestions(amount?: number, categories?: string, difficulty?: string) {
    // On utilise le service QuizService pour charger les questions.
    this.quizService.getQuestions(amount, categories, difficulty).subscribe(questions => {
      // On stocke les questions dans une variable.
      this.questions = questions;
      // On réinitialise le quiz.
      this.resetQuiz();
    });
  }

  // Cette méthode est utilisée pour réinitialiser le quiz.
  private resetQuiz() {
    // On réinitialise les variables.
    this.showResult = false;
    this.currentIndex = 0;
    this.score = 0;
    // On charge la première question.
    this.setCurrentQuestion(0);
  }

  // Cette méthode est utilisée pour définir la question actuelle.
  private setCurrentQuestion(index: number) {
    // On stocke la question actuelle.
    this.currentQuestion = this.questions[index];
    // On mélange les réponses.
    // si la question actuelle est définie.
    if (this.currentQuestion) {
      this.shuffledAnswers = this.quizStateService.shuffleAnswers(this.currentQuestion);
    }
  }

  // Cette méthode est utilisée pour sélectionner une réponse.
  selectAnswer(answer: string) {
    // Si la question est déjà répondue, on ne fait rien.
    if (this.isAnswered) return;
    // On stocke la réponse sélectionnée.
    this.selectedAnswer = answer;
    this.isAnswered = true;
    // On vérifie si la réponse est correcte.
    if (this.currentQuestion && this.quizStateService.isCorrectAnswer(answer, this.currentQuestion)) {
      this.score++;
    }
    // On passe à la question suivante.
    // On utilise un délai pour afficher la réponse.
    setTimeout(() => this.nextQuestion(), 1500);
  }

  // Cette méthode est utilisée pour passer à la question suivante.
  nextQuestion() {
    // On réinitialise les variables.
    this.selectedAnswer = null;
    this.isAnswered = false;
    // On vérifie s'il reste des questions.
    // si c'est le cas, on charge la question suivante.
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.setCurrentQuestion(this.currentIndex);
    } else {
      // Sinon, on affiche le résultat.
      // c'est-à-dire le score et sa page.
      this.showResult = true;
      this.statsService.updateStats(this.score);
    }
  }

  // Cette méthode est utilisée pour redémarrer le quiz.
  restart() {
    this.loadQuestions();
  }

  // Cette méthode est utilisée pour obtenir la classe de la réponse.
  getAnswerClass(answer: string): string {
    // On utilise le service QuizStateService pour obtenir la classe de la réponse.
    return this.quizStateService.getAnswerClass(
      answer, 
      this.currentQuestion, 
      this.selectedAnswer, 
      this.isAnswered
    );
  }
}