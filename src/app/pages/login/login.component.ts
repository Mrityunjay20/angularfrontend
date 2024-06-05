import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSignDivVisiable: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router, private http: HttpClient) {}

   onRegister() {
     this.http.post('http://localhost:8080/api/register', this.signUpObj)
      .subscribe(response => {
        alert('Registration Successful');
          console.log("success");
      }, error => {
        alert('Registration Failed');
        console.error(error.status);
      });
  }

  onLogin() {
    this.http.post('http://localhost:8080/api/login', this.loginObj)
      .subscribe((response: any) => {
        console.log(response);
        if (response && response.token) {
          alert("User Found...");
          localStorage.setItem('loggedUser', JSON.stringify(response));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert("No User Found");
        }
      }, error => {
        alert("No User Found");
        console.error(error);
      });
  }

}

export class SignUpModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
