import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
rForm: FormGroup;
name: string= '';
username: string= '';
email: string= '';
  onSubmit () {
    console.log(this.rForm.value);
  }
  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null,Validators.required],
      'username': [null,Validators.required],
      'email': [null,Validators.required]
    })
  }

  ngOnInit() {
  }

}
