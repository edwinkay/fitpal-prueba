import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  constructor(private firestore: AngularFirestore) {}

  getHorario(): Observable<any> {
    return this.firestore
      .collection('horario', (ref) => ref.orderBy('date', 'asc'))
      .snapshotChanges();
  }

  obtHorario(id: string): Observable<any> {
    return this.firestore.collection('horario').doc(id).snapshotChanges();
  }

  agregarHorario(horario: any): Promise<any> {
    return this.firestore.collection('horario').add(horario);
  }

  deleteHorario(id: string): Promise<any> {
    return this.firestore.collection('horario').doc(id).delete();
  }

  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('horario').doc(id).update(data);
  }
}
