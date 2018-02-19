import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { LoginService, PasswordValidation } from '../../services';


@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileRegisterComponent implements OnInit {

  profileForm: FormGroup;
  formError: boolean = false;
  formLoading: boolean = false;

  constructor(private login: LoginService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.profileForm = this.fb.group({

      'username': [''],
      'password': [''],
      'confirmPassword': [''],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'gender': [''],
      'DOBmonth': [''],
      'DOBday': [''],
      'DOByear': [''],
      'email': [null, Validators.required],
      'termsNconditions': [''],
      'subscription': ['']
    }, {
        validator: PasswordValidation.MatchPassword
      })
  }

  onSubmit() {
    this.formLoading = true;
    this.login.register(this.profileForm.value)
      .first()
      .finally(() => this.formLoading = false)
      .subscribe(
        res => {
          this.login.setUserData();
          this.router.navigate(['/']);
        },
        err => {
          this.formError = true;
        }
      );
  }
}
