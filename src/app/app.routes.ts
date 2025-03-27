import { Routes, ExtraOptions } from '@angular/router';
import { BoardScreenComponent } from 'src/views/screens/board-screen/board.screen';
import { LandingScreenComponent } from 'src/views/screens/landing-screen/landing.screen';
import { ManageScreenComponent } from 'src/views/screens/manage-screen/manage-screen';
import { Page404ScreenComponent } from 'src/views/screens/page404/page404.screen';

export const routes: Routes = [
  { path: '', component: LandingScreenComponent, title: 'Home' },
  {
    path: 'manage/:username',
    component: ManageScreenComponent,
    title: 'Manage -',
  },
  {
    path: 'board/:username',
    component: BoardScreenComponent,
    title: 'Board -',
  },
  { path: '**', component: Page404ScreenComponent },
];
