
import { Component, Input, Output, EventEmitter } from '@angular/core';

// INTERFAZ DEL PRODUCTO

export interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
}

// COMPONENTE HIJO: TARJETA DE PRODUCTO

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  template: `
    <div class="producto-accion">

      <button
        class="boton-consulta"
        (click)="solicitarInformacion()">

        Solicitar información sobre {{ producto.nombre }}

      </button>

    </div>
  `,
  styles: [`
    .producto-accion {
      margin-top: 20px;
    }

    .boton-consulta {
      background: #795333;
      color: white;
      border: none;
      padding: 13px 22px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 15px;
      transition: background 0.3s;
    }

    .boton-consulta:hover {
      background: #493323;
    }
  `]
})

export class TarjetaProductoComponent {

  @Input() producto!: Producto;

  @Output() consultar = new EventEmitter<Producto>();

  // Boton de informacion del producto
  solicitarInformacion(): void {
    this.consultar.emit(this.producto);
  }

}

// COMPONENTE: TIENDA

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaProductoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {


  nombreTienda: string = 'Maderas & Diseño Vargitas';

  encargado: string = 'Carlos Javier Vargas Claros';

  numeroSucursal: number = 1;

  tiendaAbierta: boolean = true;

  categorias: string[] = [
    'Muebles a medida',
    'Puertas y ventanas',
    'Estanterías y decoración'
  ];

  /*producto: Producto = {
    nombre: 'Mesa de comedor de madera',
    precio: 3200,
    disponible: true
  };*/

  producto: Producto = {
    nombre: 'Puerta de madera maciza',
    precio: 4500,
    disponible: false
  };

  mensajeConsulta: string = '';

  recibirConsulta(producto: Producto): void {

    this.mensajeConsulta =
      'Has solicitado información sobre: ' + producto.nombre;

  }

}
