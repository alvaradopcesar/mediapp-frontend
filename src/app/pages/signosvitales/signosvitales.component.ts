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

  // displayedColumns = ['idSignosVitales', 'Paciente', 'Fecha', 'Temperatura','Pulso','Ritmo Respiratorio','acciones'];
  displayedColumns = ['idSignosVitales', 'paciente.nombres', 'pulso', 'temperatura' , ];
  dataSource: MatTableDataSource<SignosVitales>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cantidad: number;

  constructor(
      private signosvitalesService: SignosvitalesService,
      private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.listar();

    this.signosvitalesService.signosvitalesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });

    this.signosvitalesService.mensajeCambio.subscribe(data => {
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
    this.signosvitalesService.eliminar(idSignosVitales).subscribe(() => {
      this.signosvitalesService.listar().subscribe(data => {
        this.signosvitalesService.signosvitalesCambio.next(data);
        this.signosvitalesService.mensajeCambio.next('SE ELIMINÓ');
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

    this.signosvitalesService.listarPageable(pageIndex, pageSize).subscribe((data: any) => {
      console.log(data);
      let SignosVitales = data.content;
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(SignosVitales);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }




}
