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
  titleChange: string = 'Agregar Horario';
  camposVacios: boolean = false;

  date: Date = new Date();

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private _horarioService: HorarioService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.crearHorario = this.fb.group({
      clase: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.EXeditar();
  }

  agregarHorario() {
    if (this.crearHorario.valid) {
      const horario = {
        clase: this.crearHorario.value.clase,
        date: new Date(this.crearHorario.value.date).toISOString(),
      };
      this._horarioService.agregarHorario(horario).then(() => {
        this.router.navigate(['/pagina-principal']);
      });
    }else{
      this.camposVacios = true;
      setTimeout(() => {
        this.camposVacios = false;
      }, 2000);
    }
  }
  agregarEditar() {
    if (this.crearHorario.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarHorario();
    } else {
      this.editarHorario(this.id);
    }
  }
  editarHorario(id: string) {
    const horario = {
      clase: this.crearHorario.value.clase,
      date: new Date(this.crearHorario.value.date).toISOString(),
    };
    this._horarioService.update(id, horario).then(() => {
      this.router.navigate(['/pagina-principal']);
      console.log('actualizo');
    });
  }
  EXeditar() {
    if (this.id !== null) {
      this.titleChange = 'Editar horario';
      this._horarioService.obtHorario(this.id).subscribe((data) => {
        this.crearHorario.setValue({
          clase: data.payload.data()['clase'],
          date: data.payload.data()['date'],
        });
      });
    }
  }
}
