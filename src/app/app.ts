
import { Component, Input, Output, EventEmitter } from '@angular/core';

// INTERFAZ DEL PRODUCTO
interface Producto {
  nombre: string;
  precio: number;
  disponible: boolean;
}

// COMPONENTE HIJO
@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  template: `
    <div class="producto">

      <h3>{{ producto.nombre }}</h3>

      <p>Precio: Bs. {{ producto.precio }}</p>

      @if (producto.disponible) {
        <p>Producto disponible</p>
      } @else {
        <p>Producto agotado</p>
      }

      <button (click)="solicitarInformacion()">
        Solicitar información
      </button>

    </div>
  `,
  styles: [`
    .producto {
      background: #F5F0E6;
      border: 1px solid #DFCCB4;
      border-radius: 14px;
      padding: 25px;
      margin-top: 15px;
    }

    .producto h3 {
      color: #493323;
      font-family: Georgia, serif;
      font-size: 23px;
    }

    .producto p {
      color: #403A34;
    }

    .producto button {
      background: #795333;
      color: white;
      border: none;
      padding: 12px 22px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 15px;
      transition: background 0.3s;
    }

    .producto button:hover {
      background: #493323;
    }
  `]
})

export class TarjetaProductoComponent {


  @Input() producto!: Producto;


  @Output() consultar = new EventEmitter<Producto>();

  solicitarInformacion(): void {
    this.consultar.emit(this.producto);
  }
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaProductoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  nombreTienda: string = 'Maderas & Diseño Vargitas';
  encargado: string = 'Tu nombre';
  numeroSucursal: number = 1;
  tiendaAbierta: boolean = true;


  categorias: string[] = [
    'Muebles a medida',
    'Puertas y ventanas',
    'Estanterías y decoración'
  ];


  producto: Producto = {
    nombre: 'Mesa de comedor de madera',
    precio: 3200,
    disponible: true
  };

  mensajeConsulta: string = '';


  recibirConsulta(producto: Producto): void {
    this.mensajeConsulta =
      'Has solicitado información sobre: ' + producto.nombre;
  }

}
