import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css'],
})
export class AddIncidentComponent implements OnInit {
  incidentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.incidentForm = this.formBuilder.group({
      name: [''],
      date: [''],
      narrative: [''],
      priority: [''],
      status: [''],
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.crudService.AddIncident(this.incidentForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/incidents-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
