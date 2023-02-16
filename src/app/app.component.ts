import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from './utils/validation';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  _auth: any;

  constructor(private formBuilder: FormBuilder,_auth:AuthService,private route : Router) {}

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  response_data : any;
  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      console.log(this.form.value);
      this._auth.login(this.form.value).subscribe((response: any) => {
        if ( response != null){
          this.response_data = response;
        }
        this.route.navigate(['/user'])
      }, (error: any) => {
        console.log('error from login',error)
      }
      )
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
