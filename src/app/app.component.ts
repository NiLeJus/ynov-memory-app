import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingScreenComponent } from "../screens/landing-screen/landing.screen";
import { DevBarComponent } from "../_dev/dev-bar/dev-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingScreenComponent, DevBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memory-app';
}
