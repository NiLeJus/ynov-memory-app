import { Component, inject, Input } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CommonModule, Location, NgClass } from '@angular/common';
import { routes } from 'src/app/app.routes';
import { DatabaseService } from 'src/services/database/database.service';

@Component({
  selector: 'atm-button-quit',
  imports: [CommonModule],
  templateUrl: './button-quit.component.html',
  styleUrl: './button-quit.component.scss',
})
export class ButtonQuitComponent {
  @Input({ required: true }) textToDisplay!: string;
  @Input({ required: true }) actionToPerform!:
    | 'goBack'
    | 'goBoard'
    | 'goQuit'
    | 'goTo';
  @Input({ required: false }) svgPathToDisplay?: string;
  @Input({ required: false }) pathToNavigate?: string;
  @Input({ required: false }) isSm?: boolean;

  constructor(
    private router: Router,
    private location: Location,
  ) {}

  returnToProfileSelection() {
    this.router.navigate(['']);
  }

  onPerformAction() {
    switch (this.actionToPerform) {
      case 'goBack':
        this.onGoBack();
        break;
      case 'goQuit':
        this.onQuit();
        break;
      case 'goBoard':
        this.onGoBoard();
        break;
      case 'goTo':
        if (this.pathToNavigate != null || undefined) {
          this.onGoTo(this.pathToNavigate ?? '');
          break;
        } else {
          throw new Error(
            'If button is used with action "GOTO" provide a route ',
          );
          break;
        }
      default:
        break;
    }
  }

  handleOnClick() {}

  onGoBack(): void {
    this.location.back();
  }

  async onGoTo(routeToGo: string) {
    this.router.navigate([`${routeToGo}/`]);
  }

  async onGoBoard() {
    this.router.navigate([`/board`]);
  }

  onQuit() {
    this.router.navigate(['']);
  }
}
