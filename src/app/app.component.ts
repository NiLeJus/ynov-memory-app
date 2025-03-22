import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingScreenComponent } from "../screens/landing-screen/landing.screen";
import { DevBarComponent } from "../_dev/dev-bar/dev-bar.component";
import { CreateMemorycardComponent } from "../sections/create-memorycard/create-memorycard.component";
import { ManageScreenComponent } from "../screens/manage-screen/manage-screen";
import { ModalDispComponent } from "../services/displayer/modal-disp/modal-disp.component";
import { CardDisplayerComponent } from "../sections/card-displayer/card-displayer.component";
import { BrandHeaderComponent } from "../atoms/brand-header/brand-header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingScreenComponent, DevBarComponent, CreateMemorycardComponent, ManageScreenComponent, ModalDispComponent, CardDisplayerComponent, BrandHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memory-app';
}
