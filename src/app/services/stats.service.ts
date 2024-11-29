import { Injectable } from '@angular/core';
import { GameStats } from '../interfaces/game-stats.interface';

@Injectable({
  providedIn: 'root'
})

// Cette class est un service qui permet de gérer les statistiques du jeux
export class StatsService {
  // Clé pour stocker les statistiques dans le local storage
  // elle est en readonly pour ne pas être modifiée
  private readonly STATS_KEY = 'quizStats';

  // Cette méthode permet de charger les statistiques du jeux
  loadStats(): GameStats {
    // On récupère les statistiques du jeux depuis le local storage
    const savedStats = localStorage.getItem(this.STATS_KEY);
    // Si les statistiques existent
    if (savedStats) {
      // On les retourne en les transformant en objet JSON
      return JSON.parse(savedStats);
    }
    // Sinon on retourne un objet vide
    // avec les valeurs par defaut 
    return {
      gamesPlayed: 0,
      totalScore: 0,
      bestScore: 0
    };
  }

  // Cette méthode permet de sauvegarder les statistiques du jeux
  saveStats(stats: GameStats): void {
    // On sauvegarde les statistiques du jeux dans le local storage
    localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  // Cette méthode permet de mettre à jour les statistiques du jeu
  updateStats(currentScore: number): void {
    // On charge les statistiques du jeux
    const stats = this.loadStats();
    // On met à jour les statistiques
    stats.gamesPlayed++;
    stats.totalScore += currentScore;
    stats.bestScore = Math.max(stats.bestScore, currentScore);
    // On sauvegarde les statistiques
    this.saveStats(stats);
  }
}