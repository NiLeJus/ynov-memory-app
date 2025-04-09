import { Injectable, OnInit } from '@angular/core';
import { add } from 'dexie';
import { _DAYS_SPACING } from 'src/_data/days-spacing.table';
import { tProfile } from 'src/_models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileActionService {
  updateScore(
    profileToUpdate: tProfile,
    oldValLevel: number,
    newValLevel: number,
  ): tProfile {

    profileToUpdate.statistics.scoreNow = this.calculateScore(
      profileToUpdate.statistics.scoreNow,
      oldValLevel,
      newValLevel,
    );

    return profileToUpdate;
  }

  calculateScore(
    score: number,
    oldValLevel: number,
    newValLevel: number,
  ): number {
    const scoreToReturn = score;

    const minusScore = oldValLevel * 3;
    const addScore = newValLevel * 3;

    scoreToReturn - minusScore + addScore;

    return scoreToReturn;
  }
}
