import { Component } from '@angular/core';
import { JsonService } from '../../services/json.service';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from "../../shared-components/memory-card/memory-card.component";

@Component({
  selector: 'app-manage-screen',
  imports: [CommonModule],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss'
})

export class ManageScreenComponent {
  data: any;

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getData().subscribe(response => {
      this.data = response;
    });
  }
}
