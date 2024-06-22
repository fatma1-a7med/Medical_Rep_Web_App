import { AddDoctorsComponent } from './../../doctor-copmponents/add-doctors/add-doctors.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AddDoctorsComponent } from '../add-doctors/add-doctors.component';
import { MatDialog , MatDialogModule} from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon,FormsModule],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.css'
})
export class ListDoctorsComponent implements OnInit ,AfterViewInit{
  doctors: any[] = [];
  selectedDoctor: any = null;
  dataSource!: MatTableDataSource<any> ;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private router: Router,
    private doctorServices: SalesService,
    private _dialog : MatDialog)
  {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  ngAfterViewInit(): void {

    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  }

  loadDoctors() {
    this.doctorServices.ListAllDoctors().subscribe(
      data => {
        this.doctors = data;
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorServices.deleteDoctor(id).subscribe(
        response => {
          console.log('Doctor deleted successfully:', response);
          this.loadDoctors(); // Reload doctors list
        },
        error => {
          console.error('Error deleting doctor:', error);
          // Handle error case
        }
      );
    }
  }

  navigateToDoctor(doctorId: number) {
    this.router.navigate(['/user/show-doctor', doctorId]);
  }

  openaddeditform(data:any) {
    const dialogRef=this._dialog.open(AddDoctorsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadDoctors(); 
        }
      },
    })};

    openaddForm(){
      const dialogRef = this._dialog.open(AddDoctorsComponent);

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.loadDoctors(); // Refresh doctors list after adding new doctor
          }
        },
      });
    }




}

function openaddForm() {
  throw new Error('Function not implemented.');
}