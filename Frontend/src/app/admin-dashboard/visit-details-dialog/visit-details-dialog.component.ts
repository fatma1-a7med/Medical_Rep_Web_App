import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visit-details-dialog',
  templateUrl: './visit-details-dialog.component.html',
  styleUrls: ['./visit-details-dialog.component.css']
})
export class VisitDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VisitDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
