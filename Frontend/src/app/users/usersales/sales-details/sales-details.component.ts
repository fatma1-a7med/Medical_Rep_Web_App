import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user_services/user-services.service';

@Component({
  selector: 'app-sales-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIcon,RouterModule],
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesUserDetailsComponent implements OnInit {
  sale: any;

  constructor(
    private route: ActivatedRoute,
    private salesService: UserService
  ) {}

  ngOnInit(): void {
    const saleId = this.route.snapshot.params['id'];
    this.salesService.getSaleById(saleId).subscribe(
      (data) => {
        this.sale = data;
      },
      (error) => {
        console.error('Failed to fetch sale details', error);
      }
    );
  }
}
