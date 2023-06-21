import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { FormularioClaseComponent } from './components/formulario-clase/formulario-clase.component';

const routes: Routes = [
  { path: '', redirectTo: 'pagina-principal', pathMatch: 'full' },
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'horario', component: FormularioClaseComponent },
  { path: 'ajustar-horario/:id', component: FormularioClaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
