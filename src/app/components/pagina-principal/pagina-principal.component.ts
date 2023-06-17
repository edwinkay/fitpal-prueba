import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss'],
})
export class PaginaPrincipalComponent implements OnInit {
  eliminarClase(_t13: any) {
    throw new Error('Method not implemented.');
  }
  editarClase(_t13: any) {
    throw new Error('Method not implemented.');
  }

  clases: any[] = [
    { nombre: 'Clase 1', horario: 'Lunes 9:00 AM', id: 1 },
    { nombre: 'Clase 2', horario: 'Martes 10:30 AM', id: 2 },
    { nombre: 'Clase 3', horario: 'Miércoles 2:00 PM', id: 3 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
