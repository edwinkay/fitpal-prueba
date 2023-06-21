import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss'],
})
export class ConfirmacionModalComponent implements OnInit {
  @Input()
  claseId!: string;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  cerrarModal(eliminar: boolean) {
    this.modalController.dismiss({ eliminar });
  }
}
