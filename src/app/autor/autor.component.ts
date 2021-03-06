import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { AgregarAutorComponent } from '../agregar-autor/agregar-autor.component';
import { AutorInterface } from '../Interfaces/AutorInterface';
import { ModificarAutorComponent } from '../modificar-autor/modificar-autor.component';
import { ServiciosService } from '../ServicioAutor/servicios.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

 
  //Función para el filtro de la tabla.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Arreglo de datos
  listaAutor: AutorInterface[] = []
  //Arreglo que ayuda a definir las columnas que van a aparecer en la tabla
  displayedColumns: string[] = ['Nombre','Biografia', 'Telefono','Foto', "Modificar"]
  
  dataSource = new MatTableDataSource<any>;
  

  constructor(public dialog:MatDialog, private AutorServicio:ServiciosService) { 
    
  };

  ngOnInit(): void {
    this.listaAutor = this.AutorServicio.getAutor();
    this.dataSource=new MatTableDataSource(this.listaAutor);

    
    
  }

  openDialogAgregar(){
    this.dialog.open(AgregarAutorComponent, {
      width: '50%',
    })

  }

  // Modificar Autor
  openDialogModificar(Autor:any){
    //Agregar los parámetros a una lista para enviarlos al componente de modificar.
    this.dialog.open(ModificarAutorComponent, {data:Autor, width: '50%'})

  }
}