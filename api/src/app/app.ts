import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'Listado de Posts desde API';

  // Cambiamos el nombre de la lista completa para no chocar con el getter
  todosLosPosts: any[] = [];

  paginActual: number = 1;
  itemsPorPagina: number = 5;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts() {
    this.apiService.getPosts().subscribe({
      next: (data: any) => {
        this.todosLosPosts = data;
      },
      error: (error: Error) => {
        console.error('Error al cargar los posts:', error);
      }
    });
  }

  // Este getter es el que usa el HTML (ngFor="let post of postPaginados")
  // Nota: En tu HTML pusiste "postPaginados", así que lo llamaremos así:
  get postPaginados() {
    const inicio = (this.paginActual - 1) * this.itemsPorPagina;
    return this.todosLosPosts.slice(inicio, inicio + this.itemsPorPagina);
  }

  // Métodos para los botones que pusiste en el HTML
  paginaSiguiente() {
    if (this.paginActual * this.itemsPorPagina < this.todosLosPosts.length) {
      this.paginActual++;
    }
  }

  paginaAnterior() {
    if (this.paginActual > 1) {
      this.paginActual--;
    }
  }
}
