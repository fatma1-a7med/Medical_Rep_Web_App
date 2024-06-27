import { HttpClient } from '@angular/common/http';
import { VisitService } from './../../../users/services/visit.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";


@Component({
  selector: 'app-show-visit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-visit.component.html',
  styleUrl: './show-visit.component.css'
})


export class ShowVisitComponent implements OnInit {
  visit: any = {};
  visitId: number | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.visitId = +id;
        this.loadVisit();
      } else {
        console.error('Visit ID not found in route');
      }
    });
  }

  loadVisit() {
    this.http.get<any>(`http://localhost:8000/api/admin/visit/${this.visitId}`)
      .subscribe(
        (data: any) => {
          this.visit = data; // Assign fetched data to visit
        },
        (error) => {
          console.error('Error fetching visit details:', error);
        }
      );
  }


getDoctorNames(doctors: any) {
  console.log('Doctors:', doctors); // Check what `doctors` object contains
  if (doctors && doctors.doctor_name) {
    return doctors.doctor_name;
  } else {
    return ''; // Or handle it according to your application logic
  }
}

getToolNames(tools: any[]) {
  return tools.map(tool => tool.tool_name).join(', ');
}

}