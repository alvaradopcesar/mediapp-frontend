import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  mensaje: string = 'Hola';
  rol: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    this.mensaje = this.loginService.getUser();
    this.rol = this.loginService.getRol();

  }

}
