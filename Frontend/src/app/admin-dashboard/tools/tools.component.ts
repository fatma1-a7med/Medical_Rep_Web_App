import { Component } from '@angular/core';
import { AllToolsComponent } from './all-tools/all-tools.component';
import { UpdateToolsComponent } from './update-tools/update-tools.component';
import { AddToolsComponent } from './add-tools/add-tools.component';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [AllToolsComponent, UpdateToolsComponent,AddToolsComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {

}
