import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingScreenComponent } from "../screens/landing-screen/landing.screen";
import { DevBarComponent } from "../_dev/dev-bar/dev-bar.component";
import { CreateMemorycardComponent } from "../sections/create-memorycard/create-memorycard.component";
import { ManageScreenComponent } from "../screens/manage-screen/manage-screen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingScreenComponent, DevBarComponent, CreateMemorycardComponent, ManageScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memory-app';
}
