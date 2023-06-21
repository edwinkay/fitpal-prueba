import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss'],
})
export class PaginaPrincipalComponent implements OnInit {
  // clases: any[] = [
  //   { nombre: 'Clase 1', horario: 'Lunes 9:00 AM', id: 1 },
  //   { nombre: 'Clase 2', horario: 'Martes 10:30 AM', id: 2 },
  //   { nombre: 'Clase 3', horario: 'Miércoles 2:00 PM', id: 3 },
  // ];
  clases: any[] = []

  constructor(private _horario: HorarioService) {}

  ngOnInit(): void {
    this.getHorario()
  }

  getHorario(){
    this._horario.getHorario().subscribe(data => {
      this.clases = [];
      data.forEach((element: any) => {
        this.clases.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    })
  }

  eliminarClase(id: string) {
    this._horario.deleteHorario(id).then(() => {
      console.log('producto elimminado...')
    })
  }
}
