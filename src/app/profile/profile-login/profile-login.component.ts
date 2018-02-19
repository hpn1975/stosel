import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FetchDataService, LoginService} from './../../services'

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileLoginComponent implements OnInit {

  //Define Class variables.
  profileForm: FormGroup;
  textform: string = "";

  //Define Constructor.
  constructor(private GetProfileData: FetchDataService, private fb: FormBuilder, private route: Router,private loginService:LoginService) { 
    this.profileForm = this.fb.group({
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    })
  }


  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    console.log("form submitted");
    const formData = {
      username: this.profileForm.value.email,
      password: this.profileForm.value.password,
    };
    
    this.loginService.login(formData)
      .first()
      .catch((err: any) => {
        let formError;
        if (err.status === 401) {
          formError = { wrongPassword: 'Username or password is wrong' };
        } else {
          formError = { formError: 'There was an error during login' };
        }
        this.profileForm.setErrors(formError);
        return Observable.throw(new Error(err));
      }).subscribe(
        res => {
          this.loginService.setUserData();
          this.route.navigate(['/']);
        }
      );
  }
}
