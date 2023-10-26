import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionesService } from '../servicio/peticiones.service';
import { json } from 'body-parser';


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {

  userData: FormGroup;

  constructor(private formBuilder: FormBuilder, private peticionesService: PeticionesService) {
    this.userData = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['', [Validators.required]]
    });
  }



  
  guardarDatos() {
    if (this.userData.valid) {
      // El formulario es válido, puedes enviar los datos al servidor
      const formData = this.userData.value;
      this.peticionesService.crearDato(formData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa del servidor aquí
          console.log('Datos guardados con éxito:', response);
          this.userData.reset();
        },
        (error) => {
          // Manejar errores del servidor aquí
          console.error('Error al guardar datos:', error);
        }
      );
    } else {
      // El formulario no es válido, muestra un mensaje de error o realiza acciones apropiadas
      console.log('Formulario no válido');
    }

  }

}
