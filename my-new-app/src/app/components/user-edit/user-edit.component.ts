import { Component, OnInit,NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  getId: any;
  updateForm1: FormGroup;
  currentUser: any = {};
  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.currentUser = this.authService.getUser();
   let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe((res) => {
    //   this.currentUser = res.msg;
    // });
    
    this.crudService.updateUser(id,this.currentUser).subscribe((res) => {
      this.updateForm1.setValue({
        name: res['name'],
        email: res['email'],
        userType: res['userType'],
      });
    });

    this.updateForm1 = this.formBuilder.group({
      name: [''],
      email: [''],
      userType:[''],
        
    });}

  ngOnInit(): void {
  }
  onUpdate(): any {
    this.crudService.updateUser(this.getId, this.updateForm1.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.authService.doLogout();
        this.ngZone.run(() => this.router.navigate(['log-in']));
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
