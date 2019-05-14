import { SignosvitalesService } from './../../_service/signosvitales.service';
import { SignosVitales } from './../../_model/signosvitales';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-signosvitales',
  templateUrl: './signosvitales.component.html',
  styleUrls: ['./signosvitales.component.css']
})
export class SignosvitalesComponent implements OnInit {

  
  
  
  displayedColumns = ['idSignosVitales', 'Paciente', 'Fecha', 'Temperatura','Pulso','Ritmo Respiratorio','acciones'];
  dataSource: MatTableDataSource<SignosVitales>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cantidad: number;

  constructor(private SignosvitalesService: SignosvitalesService, private snackBar: MatSnackBar) {


  }

  ngOnInit() {
    this.listar();

    this.SignosvitalesService.signosvitalesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.SignosvitalesService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    /*this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/
    this.pedirPaginado();
  }

  eliminar(idSignosVitales: number) {
    this.SignosvitalesService.eliminar(idSignosVitales).subscribe(() => {
      this.SignosvitalesService.listar().subscribe(data => {
        this.SignosvitalesService.signosvitalesCambio.next(data);
        this.SignosvitalesService.mensajeCambio.next('SE ELIMINÓ');
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e: any) {
    this.pedirPaginado(e);
  }

  pedirPaginado(e?: any) {
    let pageIndex = 0;
    let pageSize = 10;

    if (e != null) {
      pageIndex = e.pageIndex;
      pageSize = e.pageSize;      
    }

    this.SignosvitalesService.listarPageable(pageIndex, pageSize).subscribe((data: any) => {
      let SignosVitales = data.content;
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(SignosVitales);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }




}
