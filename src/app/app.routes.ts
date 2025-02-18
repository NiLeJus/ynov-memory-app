import { Routes, ExtraOptions } from '@angular/router';
import { LandingScreenComponent } from '../screens/landing-screen/landing.screen';
import { ManageScreenComponent } from '../screens/manage-screen/manage-screen';

export const routes: Routes = [

{ path: '', component: LandingScreenComponent, title: 'ID2génie Masterclasse'},
{ path: 'bernard', component: ManageScreenComponent,  title: 'ID2génie Catalogue'},
]
