import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { AuthService } from 'src/app/shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.css'],
})
export class IncidentsListComponent implements OnInit {
  Incidents: any = [];

  constructor(private crudService: CrudService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.crudService.GetIncidents().subscribe((res) => {
      console.log(res);
      this.Incidents = res;
    });
  }

  delete(id: any, i: any) {
    if (!this.authService.isLoggedIn) {
      window.alert('Access not allowed!');
      this.router.navigate(['log-in']);
    }
else{
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteIncident(id).subscribe((res) => {
        this.Incidents.splice(i, 1);
      });
    }
  }

  }
}
