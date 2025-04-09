import { Routes, ExtraOptions } from '@angular/router';
import { BoardScreenComponent } from 'src/views/screens/board-screen/board.screen';
import { LandingScreenComponent } from 'src/views/screens/landing-screen/landing.screen';
import { ManageScreenComponent } from 'src/views/screens/manage-screen/manage-screen';
import { Page404ScreenComponent } from 'src/views/screens/page404/page404.screen';
import { RunScreenComponent } from 'src/views/screens/run-screen/run.screen';
import { RunningScreenComponent } from 'src/views/screens/running-screen/running.screen';

export const routes: Routes = [
  { path: '', component: LandingScreenComponent, title: 'Home' },
  { path: 'run', component: RunScreenComponent, title: 'Pre-Run' },
  { path: 'running', component: RunningScreenComponent, title: 'Running' },
  {
    path: 'manage',
    component: ManageScreenComponent,
    title: 'Manage',
  },
  {
    path: 'board',
    component: BoardScreenComponent,
    title: 'Board -',
  },
  { path: '**', component: Page404ScreenComponent },
];
