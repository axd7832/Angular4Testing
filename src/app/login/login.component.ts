import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lForm: FormGroup;
  username: string = '';
  password: string ='';
  onSubmit() {
    console.log(this.lForm.value);
  }
  constructor(private fb: FormBuilder) {
    this.lForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }
  ngOnInit() {
  }

}
