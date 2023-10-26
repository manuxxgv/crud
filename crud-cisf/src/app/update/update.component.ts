import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionesService } from '../servicio/peticiones.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent {

  userData: FormGroup;

  constructor(private formBuilder: FormBuilder, private peticionesService: PeticionesService) {
    this.userData = this.formBuilder.group({
      id:['',[Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['', [Validators.required]]
    });
  }


  id:any;

  actualizarDatos() {
    if (this.userData.valid) {
      this.id = this.userData.get('id')?.value;
      // El formulario es válido, puedes enviar los datos al servidor
      const formData = this.userData.value;
      this.peticionesService.actualizar(formData,this.id).subscribe(
        (response) => {
          // Manejar la respuesta exitosa del servidor aquí
          console.log('Datos cambiados con éxito:', response);
          this.userData.reset();
        },
        (error) => {
          // Manejar errores del servidor aquí
          console.error('Error al cambiar los datos:', error);
        }
      );
    } else {
      // El formulario no es válido, muestra un mensaje de error o realiza acciones apropiadas
      console.log('Formulario no válido');
    }

  }


}
