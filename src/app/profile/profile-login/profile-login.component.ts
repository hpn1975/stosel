import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchDataService } from '../../services/fetch-data.service';


@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileLoginComponent implements OnInit {
  profileForm: FormGroup;
  textform: string = "";

  constructor(private GetProfileData: FetchDataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'email': [''],
      'password': ['']
    })

  }

  onSubmit(form: FormGroup) {
    console.log("form submitted");
    this.GetProfileData.postData('/api/profile/login', JSON.stringify(form.value), [])
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
