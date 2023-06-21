import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario.service';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss'],
})
export class PaginaPrincipalComponent implements OnInit {
  clases: any[] = [];
  crearHorario: any;

  constructor(
    private _horario: HorarioService,
    private datePipe: DatePipe,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getHorario();
  }

  getHorario() {
    this._horario.getHorario().subscribe((data) => {
      this.clases = [];
      data.forEach((element: any) => {
        const fecha = new Date(element.payload.doc.data().date);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

        this.clases.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
          date: fechaFormateada,
        });
      });
    });
  }

  eliminarClase(id: string) {
    this._horario.obtHorario(id).subscribe((data: any) => {
      if (data || data.clase) {
        this._horario.deleteHorario(id).then(() => {
          console.log('clase eliminada...');
        });
      } else {
        console.log('No se encontró la clase con el ID especificado.');
      }
    });
  }
  async confirmarEliminacion(claseId: string) {
    const modal = await this.modalController.create({
      component: ConfirmacionModalComponent,
      componentProps: {
        claseId: claseId,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.eliminar) {
      // Lógica para eliminar la clase
      this.eliminarClase(claseId);
    }
  }
}
