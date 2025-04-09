import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevBarComponent } from '../_dev/dev-bar/dev-bar.component';
import { ModalDispComponent } from '../services/displayer/modal-disp/modal-disp.component';
import { BrandHeaderComponent } from 'src/views/organism/brand-header/brand-header.component';
import { LandingScreenComponent } from 'src/views/screens/landing-screen/landing.screen';
import { ManageScreenComponent } from 'src/views/screens/manage-screen/manage-screen';
import { CardDisplayerComponent } from 'src/views/sections/card-displayer/card-displayer.component';
import { CreateMemorycardComponent } from 'src/views/sections/create-memorycard/create-memorycard.component';
import { NotificationService } from 'src/services/notification.service.ts.service';
import { InputListenerComponent } from '../views/shared-components/input-listener/input-listener.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LandingScreenComponent,
    DevBarComponent,
    CreateMemorycardComponent,
    ManageScreenComponent,
    ModalDispComponent,
    CardDisplayerComponent,
    BrandHeaderComponent,
    InputListenerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'memory-app';
  constructor(private updates: SwUpdate) {}

  private notifService = inject(NotificationService);

  ngOnInit() {
    this.notifService.init();


    //Pour update
    this.updates.versionUpdates.subscribe((evt) => {
      if (evt.type === 'VERSION_READY') {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
