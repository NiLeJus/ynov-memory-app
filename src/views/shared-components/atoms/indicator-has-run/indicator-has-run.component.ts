import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-indicator-has-run',
  imports: [],
  templateUrl: './indicator-has-run.component.html',
  styleUrl: './indicator-has-run.component.scss',
})
export class IndicatorHasRunComponent {
  @Input({ required: true })
  isLightUp!: boolean;
}
