import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  exhibitionId: any;
  
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {
    console.log("I'm here")
  }

  onSubmit(): void {
    this.authService.signin(this.form).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        localStorage.setItem("visitorStatus" + data.id, "0");

        this.tokenStorage.setRemember(this.form.rememberMe);
        if (this.exhibitionId != null && this.exhibitionId != undefined) {

          this.sendRequest(this.exhibitionId, data.id);

        }
        if (this.form.rememberMe == "false" || this.form.rememberMe == false) {
          this.tokenStorage.saveName("");
        } else {
          this.tokenStorage.saveName(this.form.username);
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.exhibitionId == null || this.exhibitionId == undefined) {
          this.reloadPage();
        }
      },
      err => {
        this.errorMessage ="";
        if(err.error.message == null){
          this.errorMessage ="Giriş başarısız ! Şifre veya kullanıcı adınızı kontrol ediniz.";
        }else{
          this.errorMessage = err.error.message;
        }
        
        this.isLoginFailed = true;
      }
    );
  }
  sendRequest(exhibitionId: any, userId: any) {
    
  }
  reloadPage(): void {
    window.location.href = '/index.html';
  }
}