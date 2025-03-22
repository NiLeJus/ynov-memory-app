import { Routes, ExtraOptions } from '@angular/router';
import { LandingScreenComponent } from '../screens/landing-screen/landing.screen';
import { ManageScreenComponent } from '../screens/manage-screen/manage-screen';
import { BoardScreenComponent } from '../screens/board-screen/board.screen';
import { Page404ScreenComponent } from '../screens/page404/page404.screen';

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
