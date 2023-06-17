import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-clase',
  templateUrl: './formulario-clase.component.html',
  styleUrls: ['./formulario-clase.component.scss'],
  styles: [
    `
      :host ::ng-deep .datetime-header {
        color: pink !important;
      }
    `,
  ],
})
export class FormularioClaseComponent implements OnInit {
  clase: any;
  horario: any;
  date: any;

  constructor() {}

  ngOnInit(): void {}

  agregarProducto() {
    const format = new Date(this.date);
    const fd = format
      .toLocaleDateString('es-ES', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        hourCycle: 'h12',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
      .replace('.', '')
      .replace(/(a|p)\.\u00a0m\./i, (match) => match.toLowerCase());

    const data = {
      materia: this.clase,
      fecha: fd,
    };
    console.log(data);
  }
}
