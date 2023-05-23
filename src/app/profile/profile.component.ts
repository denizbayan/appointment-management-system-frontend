import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../_structs/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfileComponent implements OnInit {
  passChangeDialog: boolean = false;

  currentUser: any;
  user :any;
  form: any = {};
  forgotPassword: boolean = false;
  ChangePasswordHeader = "Şifre Değiştirme";
  codeTime: number = 0;
  time: number = 0;
  disabledResendCodeButton: boolean=false;

  isChangedPassword:boolean=false;
  numericRE : RegExp = /.*\d.*/;
  lowerCaseRE : RegExp = /.*[a-z].*/;
  upperCaseRE : RegExp = /.*[A-Z].*/;
  specialCharRE : RegExp = /.*\W.*/;
  whiteSpaceRE : RegExp = /.*\s.*/;
  errorMessage : string[] = [];
  isChangePasswordFailed = false;
  constructor(private tokenStorage: TokenStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()

    
  }

  redirectHome(): void {

  }

  saveUser() {
  }

  redirectLogin(): void {

  }

  showPassChangeDialog() {
    this.passChangeDialog = true;
  }

  AddDisplayHidePasswordListeners(){

    var toggleOldPassword = document.querySelector('#toggleOldPassword');
    var toggleNewPassword = document.querySelector('#toggleNewPassword');
    var toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
    var oldPassword = document.querySelector('#oldPassword');
    var newPassword = document.querySelector('#newPassword')
    var confirmPassword = document.querySelector('#confirmPassword')
    toggleOldPassword!.addEventListener('click', function (e) {
       // toggle the type attribute
       const type = oldPassword!.getAttribute('type') === 'password' ? 'text' : 'password';
       oldPassword!.setAttribute('type', type);
       // toggle the eye / eye slash icon
       //this.classList.toggle('pi-eye');
    });
    toggleNewPassword!.addEventListener('click', function (e) {
     // toggle the type attribute
     const type = newPassword!.getAttribute('type') === 'password' ? 'text' : 'password';
     newPassword!.setAttribute('type', type);
     // toggle the eye / eye slash icon
     
     //this.classList.toggle('pi-eye');
    });
    toggleConfirmPassword!.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = confirmPassword!.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword!.setAttribute('type', type);
      // toggle the eye / eye slash icon
      //this.classList.toggle('pi-eye');
     });
  }
  
  closePassChangeDialog() {
    
    this.passChangeDialog = false;
    this.forgotPassword = false;
    this.ChangePasswordHeader = "Şifre Değiştirme";
    //clearInterval(this.intervalCode);
    this.form = {}
  }

  changePass() {
    console.log(this.form);
    this.isChangePasswordFailed= false;
    this.errorMessage = [];
    if(this.form.newPassword == this.form.confirmPassword){
      var regexControl = false;
      var whiteSpaceControl = false;
      //white space test must be implemented independent from other conditions
      if(this.whiteSpaceRE.test(this.form.newPassword)){
        whiteSpaceControl = true;
        var message = "Şifre boşluk içeremez"
        this.errorMessage.push(message);
      }
      else{
        this.errorMessage.push("Şifreniz;");
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
        if(this.errorMessage.length==1){
          this.errorMessage = [];
        }
      }
  
      if(regexControl ||whiteSpaceControl){
        if(regexControl){
          this.errorMessage.push("İçermelidir.");
        }
        this.isChangePasswordFailed=true;
      }else{
        /*this.form['email']=this.user.email;
        if(this.form.code == undefined){
          this.authService.changePassword(this.form).subscribe(data=>{
            console.log('Şifre yenileme işlemi başarılı.',data)
            this.isChangedPassword=true;
          },err=>{
            console.log('Şifre yenileme işlemi başarısız.',err)
            this.errorMessage.push( err.error.message);
            this.isChangePasswordFailed=true;
          })
        }else{
          this.authService.resetPassword(this.form).subscribe(data=>{
            console.log('Şifre yenileme işlemi başarılı.',data)
            this.isChangedPassword=true;
          },err=>{
            this.errorMessage.push( err.error.message);
            this.isChangePasswordFailed=true;
          })
        }*/
      }
    }else{
      this.errorMessage.push("Şifreler uyuşmuyor.");
      this.isChangePasswordFailed=true;
    }

  }

  sendCode(): void {
    /*this.authService.sendSecurityCode(this.user.email).subscribe(
      data => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Şifre yenileme işlemi için güvenlik kodu gönderilmiştir. Lütfen e-postanızı kontrol ediniz!', life: 3000 });
        this.time = 0;
        this.disabledResendCodeButton =true;
        this.intervalCode = setInterval(() => {
          this.time += 1;
          this.codeTime = this.time * 100 / 180;
          if (this.time >= 180) {
            clearInterval(this.intervalCode);
            this.disabledResendCodeButton =false;
          }
        }, 1000)
      },
      err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hata meydana geldi.' + err.error.message != undefined ? err.error.message : "Detay için loglara bakınız.", life: 3000 });
      }
    );*/
  }

  setForgotPassword() {
    this.ChangePasswordHeader = "Şifremi Unuttum"
    this.forgotPassword = true;
    this.sendCode();
  }

  validateCellPhone(cellPhone: string): boolean{
    if(cellPhone == "(___) ___-____") return false;
    var myregex = /^\D*(\d\D*){10}$/
    return !myregex.test(cellPhone);
  }

}