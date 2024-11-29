import { Component, OnInit } from '@angular/core';
import { GameStats } from '../../interfaces/game-stats.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

// Cette classe permet de gérer les statistiques du joueur

export class ProfilePage implements OnInit {
  // on initialise les statistiques avec les valeurs par défaut
  stats: GameStats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0
  };

  constructor() {}

  // on initialise les statistiques avec loadStats()
  ngOnInit() {
    this.loadStats();
  }

  // on charge les statistiques depuis le localStorage
  private loadStats() {
    // on récupère les statistiques depuis le localStorage
    // si elles existent
    // on les parse
    // et on les assigne à 'stats'
    // quizStats est la clé utilisée pour stocker les statistiques
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  // on sauvegarde les statistiques dans le localStorage
  private saveStats() {
    localStorage.setItem('quizStats', JSON.stringify(this.stats));
  }

  // ici on met à jour les statistiques
  // score est le score du joueur à la fin de la partie
  updateStats(score: number) {
    // on incrémente le nombre de parties jouées
    this.stats.gamesPlayed++;
    // on ajoute le score de la partie au score total
    this.stats.totalScore += score;
    // on met à jour le meilleur score si le score de la partie est plus grand
    this.stats.bestScore = Math.max(this.stats.bestScore, score);
    this.saveStats();
    // ensuite j'appele cette méthode à la fin de chaque partie
  }


  //  TO DO : à FAIRE 
  resetStats() {
    this.stats = {
      gamesPlayed: 0,
      totalScore: 0,
      bestScore: 0
    };
    this.saveStats();
  }
}