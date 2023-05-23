import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers:[MessageService]
})

export class ResetPasswordComponent implements OnInit {

  form: any = {};

  hide = false;
  hideNew = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage : string[] = [];
  mailNotValid:boolean=false;
  numericRE : RegExp = /.*\d.*/;
  lowerCaseRE : RegExp = /.*[a-z].*/;
  upperCaseRE : RegExp = /.*[A-Z].*/;
  specialCharRE : RegExp = /.*\W.*/;
  whiteSpaceRE : RegExp = /.*\s.*/;

;
  constructor(private authService : AuthService,private messageService:MessageService) { }

  ngOnInit(): void {
   var togglePassword = document.querySelector('#togglePassword');
   var password = document.querySelector('#password');
   var togglePasswordConfirm = document.querySelector('#togglePasswordConfirm');
   var passwordConfirm = document.querySelector('#passwordConfirm')
  togglePassword?.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);
      // toggle the eye / eye slash icon
      //this.classList.toggle('pi-eye');
  });
  togglePasswordConfirm?.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordConfirm?.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordConfirm?.setAttribute('type', type);
    // toggle the eye / eye slash icon
    //this.classList.toggle('pi-eye');
});
  }


  sendCode(mail:any):void{
    this.mailNotValid = true;

    if(this.checkMail(mail)){
      this.mailNotValid =false
      return;
    }
    this.authService.sendSecurityCode(mail.model).subscribe(
      data => {
        console.log(data);

        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Şifre sıfırlama kodu e-posta adresinize gönderildi.', life: 3000 });

    },
    err => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hata meydana geldi.'+err.error.message != undefined ?err.error.message:"Detay için loglara bakınız.", life: 3000 });

    }
    );
  }
  onSubmit():void{
    this.errorMessage=[];


    if(this.form.newPassword == this.form.passwordConfirm){
      var regexControl = false;
      var whiteSpaceControl = false;
      //white space test must be implemented independent from other conditions
      if(this.whiteSpaceRE.test(this.form.newPassword)){
        whiteSpaceControl = true;
        this.errorMessage.push("Şifre boşluk içeremez");
      }
      else{
        if(!this.numericRE.test(this.form.newPassword)){
          regexControl = true;
          this.errorMessage.push("- en az 1 adet sayı");
        }
        if(!this.lowerCaseRE.test(this.form.newPassword)){
          regexControl = true;
          this.errorMessage.push("- en az 1 adet küçük karakter");
        }
        if(!this.upperCaseRE.test(this.form.newPassword)){
          regexControl = true;
          this.errorMessage.push("- en az 1 adet büyük karakter");
        }
        if(!this.specialCharRE.test(this.form.newPassword)){
          regexControl = true;
          this.errorMessage.push("- en az 1 adet özel karakter (@#/*& gibi)");
        }
      }

      if(regexControl || whiteSpaceControl){
        if(regexControl){
          this.errorMessage.push("İçermelidir.");
        }
        this.isSignUpFailed=true;
        this.isSuccessful=false;
      }else{
        this.authService.resetPassword(this.form).subscribe(
          data => {
            console.log(data);
            this.isSuccessful=true;
            this.isSignUpFailed=false;
            this.reloadPage();
        },
        err => {
          console.log(err);
          this.isSignUpFailed=true;
          this.isSuccessful=false;
          this.errorMessage.push(err.error.message);
        }
        );
      }
    }else{
      this.isSignUpFailed=true;
      this.isSuccessful=false;
      this.errorMessage.push("Şifreler uyuşmuyor.");
    }


  }
  reloadPage(): void {
    setTimeout(() => { window.location.href = '/login'; }, 3000);
  }


  confirmEquals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>  
        control.value?.toLowerCase() === this.form.confirmPassword.toLowerCase() 
            ? null : {noMatch: true};
  }
  checkMail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());

  }

}
