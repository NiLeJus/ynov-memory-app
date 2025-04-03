import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'atm-button-quit',
  imports: [],
  templateUrl: './button-quit.component.html',
  styleUrl: './button-quit.component.scss',
})
export class ButtonQuitComponent {
  @Input({ required: true }) textToDisplay!: string;
  @Input({ required: false }) svgPathToDisplay?: string;
  
  constructor(
    private router: Router,
    private location: Location,
  ) {}

  returnToProfileSelection() {
    this.router.navigate(['']);
  }

  goBack(): void {
    this.location.back();
  }
}
