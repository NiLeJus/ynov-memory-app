import { Component } from '@angular/core';
import { DevBarComponent } from "../../../_dev/dev-bar/dev-bar.component";

@Component({
  selector: 'app-brand-header',
  imports: [DevBarComponent],
  templateUrl: './brand-header.component.html',
  styleUrl: './brand-header.component.scss'
})
export class BrandHeaderComponent {

}
