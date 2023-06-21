import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-formulario-clase',
  templateUrl: './formulario-clase.component.html',
  styleUrls: ['./formulario-clase.component.scss'],
})
export class FormularioClaseComponent implements OnInit {
  //creando el formGroup
  crearHorario: FormGroup;

  //creando las variables para almacenar los datos
  clase: any;
  horario: any;
  date: any;

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private _horarioService: HorarioService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.crearHorario = this.fb.group({
      clase: ['', Validators.required],
      horario: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.EXeditar()
  }

  agregarHorario() {
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

    const horario = {
      materia: this.clase,
      fecha: fd,
    };
    this._horarioService.agregarHorario(horario).then(() => {
      this.router.navigate(['/pagina-principal']);
    });
  }
  agregarEditar(){
    if (this.id === null) {
      this.agregarHorario()
    }else {
      this.editarHorario(this.id)
    }
  }
  editarHorario(id: string) {
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
    const horario = {
      materia: this.clase,
      fecha: fd,
    };
    this._horarioService.update(id, horario).then(() => {
      this.router.navigate(['/pagina-principal']);
    })
  }
  EXeditar(){
    if (this.id !== null) {
      this._horarioService.obtHorario(this.id).subscribe(data => {
        console.log(data, 'mi data es esta')
        this.crearHorario.setValue({
          clase: data.payload.data()['materia'],
          horario: data.payload.data()['fecha'],
        })
      })
    }
  }
}
