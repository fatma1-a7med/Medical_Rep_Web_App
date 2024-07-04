import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../../services/user_services/user-services.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from '../../../user/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { AddToolsComponent } from '../add-tools/add-tools.component';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';





interface Tool {
  id: number;
  name: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-all-tools',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './all-tools.component.html',
  styleUrl: './all-tools.component.css'
})
export class AllToolsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Tool>();
  displayedColumns: string[] = ['name', 'description', 'type', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private toolsService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadTools();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTools(): void {
    this.toolsService.getAllTools().subscribe(
      (data: Tool[]) => {
        this.dataSource.data = data;
      },
      (error: any) => {
        console.error('Error fetching tools:', error);
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

  deleteTool(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this tool?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toolsService.deleteTool(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'The tool has been deleted.',
              'success'
            );
            this.loadTools();
          },
          (error: any) => {
            console.error('Error deleting tool:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the tool.',
              'error'
            );
          }
        );
      }
    });
  }

  openAddEditForm(tool?: Tool): void {
    const dialogRef = this.dialog.open(AddToolsComponent, {
      data: tool ? { ...tool } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTools();
      }
    });
  }
}