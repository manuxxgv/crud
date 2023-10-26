import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  public apiUrl = "http://localhost:3000/miembros/";

  constructor(private HttpClient: HttpClient) { }


  getDatos() {
    return this.HttpClient.get(`${this.apiUrl}`);
  }

  crearDato(body:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.HttpClient.post(`${this.apiUrl}`,body,httpOptions);
  }


  eliminarDato(id:any){
    return this.HttpClient.delete(`${this.apiUrl}`+id);
  }


  actualizar(body:any,id:any){
    return this.HttpClient.put(`${this.apiUrl}`+id,body);
  }



  }



