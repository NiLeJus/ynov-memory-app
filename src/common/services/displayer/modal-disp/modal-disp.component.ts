import { ValidationDisplayerService } from '../val-disp.service';
import { AfterViewInit, Component, effect, OnInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-modal-disp',
  imports: [],
  templateUrl: './modal-disp.component.html',
  styleUrl: './modal-disp.component.scss',
})
export class ModalDispComponent implements OnInit {
  modalToDisp: any = [];
  constructor(public valDispService: ValidationDisplayerService) {}

  ngOnInit(): void {
    effect(() => {
      this.modalToDisp = this.valDispService._modal();
    });
  }

  ngAfterViewInit(): void {
    const myModal = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(myModal);
    modal.show();
  }
}
