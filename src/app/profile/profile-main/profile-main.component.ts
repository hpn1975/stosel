import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FetchDataService } from '../../services/fetch-data.service';


@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileMainComponent implements OnInit {

  profileForm: FormGroup;
  textform: string="";

  constructor(private GetProfileData: FetchDataService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.profileForm = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'age': [''],
      'email': [''],
      'company': [''],
      'website': [''],
      'userName': [''],
      'password': [''],
      'confirmPassword': ['']
    })
  }

  onSubmit(form: FormGroup) {
    this.GetProfileData.postData('/api/profile', JSON.stringify(form.value), [])
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
