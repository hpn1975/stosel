import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { FetchDataService } from '../../services/fetch-data.service';
import { PasswordValidation } from '../../services/password.validator';

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileRegisterComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private GetProfileData: FetchDataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'email': [null, Validators.required],
      'password': [''],
      'confirmPassword': [''],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'gender': [''],
      'DOBmonth': [''],
      'DOBday': [''],
      'DOByear': [''],
      'termsNconditions': [''],
      'subscription': ['']
    }, {
        validator: PasswordValidation.MatchPassword  
    })
  }

  onSubmit() {
    this.GetProfileData.postData('/api/profile/register', JSON.stringify(this.profileForm.value), [])
      .subscribe(res => {
        console.log(res);
      },
      (err) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
      );
  }
}
