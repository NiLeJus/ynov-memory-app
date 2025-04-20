import { Routes, ExtraOptions } from '@angular/router';
import { BoardScreenComponent } from 'src/views/board-flow/board-screen/board.screen';
import { RunScreenComponent } from 'src/views/running-flow/run-screen/run.screen';
import { RunningScreenComponent } from 'src/views/running-flow/running-screen/running.screen';
import { LandingScreenComponent } from 'src/views/shared-components/screens/landing-screen/landing.screen';
import { ManageScreenComponent } from 'src/views/shared-components/screens/manage-screen/manage-screen';
import { Page404ScreenComponent } from 'src/views/shared-components/screens/page404/page404.screen';

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
