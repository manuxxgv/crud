import { Component } from '@angular/core';
import { PeticionesService } from '../servicio/peticiones.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  data:any;


  constructor(private peticion: PeticionesService){

  }

  consultarDatos(){
    this.peticion.getDatos().subscribe((res:any)=>{
      this.data = res;
    });
  }


  eliminarDatos(id:any){
    this.peticion.eliminarDato(id).subscribe((res:any)=>{
      this.consultarDatos();
      alert('Se eliminó la selección');
    })
  }

}
