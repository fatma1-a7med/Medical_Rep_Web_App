import { MedicalrepService } from '../../services/medicalrep.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddeditComponent } from '../addedit/addedit.component';
import { MedrepDetailComponent } from '../medrep-detail/medrep-detail.component';

@Component({
  selector: 'app-listallmedrep',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MedrepDetailComponent
  ],
  templateUrl: './listallmedrep.component.html',
  styleUrls: ['./listallmedrep.component.css']
})
export class ListallmedrepComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _medrepservice: MedicalrepService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMedreplist();
  }

  ngAfterViewInit(): void {
  
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  }

  openaddeditform() {
    const dialogRef = this._dialog.open(AddeditComponent);
    dialogRef.afterClosed().subscribe({
        next: (val) => {
            if (val) {
                this.getMedreplist(); 
            }
        },
    });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMedreplist(): void {
    this._medrepservice.getMedreplist().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  openeditform(data: any) {
    const dialogRef = this._dialog.open(AddeditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMedreplist();
        }
      }
    });
  }

  deletemedrip(id: number) {
    this._medrepservice.deletemedrip(id).subscribe({
      next: (res) => {
        alert('Medrep deleted successfully');
        this.getMedreplist();
      },
      error: console.log,
    });
  }

  show(data: any) {
    this._dialog.open(MedrepDetailComponent, {
      data,
      width: '400px'  // Adjust width as needed
    });
  }
}
