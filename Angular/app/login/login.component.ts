import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  form: any = {
    data: {},
    message: '',
    inputerror:{}
    
    
  };

  constructor(public route: Router, private httpclient:HttpClient){

  }

  signIn() {
    console.log('login id = ', this.form.data.loginId);
    console.log('password = ', this.form.data.password);

    this.httpclient.post('http://localhost:8080/Auth/login', this.form.data).subscribe((res:any)=>{

      console.log('res:' , res);

      this.form.message='';
      this.form.inputerror={};

      if (res.result.message) {
        this.form.message = res.result.message
        
        
      }
      

      if (!res.success) {

        this.form.inputerror = res.result.inputerror
      }

      
      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        this.route.navigateByUrl('welcome');
      }
    })
  }
    
  

  signUp(){

    this.route.navigateByUrl('signup');

  }
}