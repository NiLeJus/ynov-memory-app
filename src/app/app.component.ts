import { MemcardActions } from './../services/stores/actions/memcard.actions';
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'memory-app';

  private notifService = inject(NotificationService);

  ngOnInit() {
    this.notifService.init();
  }
  
}
