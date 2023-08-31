import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../_structs/user';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfileComponent implements OnInit {
  passChangeDialog: boolean = false;

  currentUser: any;
  auth_user : any;
  user : User ={};
  form: any = {};
  forgotPassword: boolean = false;
  ChangePasswordHeader = "Şifre Değiştirme";

  genders = ["Kadın","Erkek","Diğer","Belirtmek istemiyorum"]

  isSuccessful = false;
  isSignUpFailed = false;
  isChangedPassword:boolean=false;
  numericRE : RegExp = /.*\d.*/;
  lowerCaseRE : RegExp = /.*[a-z].*/;
  upperCaseRE : RegExp = /.*[A-Z].*/;
  specialCharRE : RegExp = /.*\W.*/;
  whiteSpaceRE : RegExp = /.*\s.*/;
  errorMessage : string[] = [];
  isChangePasswordFailed = false;
  constructor(private tokenStorage: TokenStorageService, private messageService: MessageService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.auth_user = this.tokenStorage.getUser()
    var user_id  = JSON.parse(this.auth_user).id

    this.usersService.getUserById(user_id).subscribe(
      data => {
        this.user = data
        this.user.birthdate = new Date(data.birthdate)
    },
    err => {
      console.log(err);
      this.isSignUpFailed=true;
      this.isSuccessful=false;
      this.errorMessage = err.error.message.split('.');
      this.errorMessage[this.errorMessage.length-1] = this.errorMessage[this.errorMessage.length-1]+".";
      this.errorMessage = this.errorMessage.filter(item=> item!="");
    }
    );

  }



  saveUser() {
  }

  showPassChangeDialog() {
    this.passChangeDialog = true;
  }

  closePassChangeDialog() {
    
    this.passChangeDialog = false;
    this.forgotPassword = false;
    this.ChangePasswordHeader = "Şifre Değiştirme";
    this.form = {}
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

  validateCellPhone(cellPhone: any): boolean{
    if(cellPhone == "(___) ___-____") return false;
    var myregex = /^\D*(\d\D*){10}$/
    return !myregex.test(cellPhone);
  }

  onSubmit():void{
    this.errorMessage = [];
    var json_auth_user = JSON.parse(this.auth_user)
    this.usersService.updateUser(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful=true;
        this.isSignUpFailed=false;
        json_auth_user.email = this.user.email
        json_auth_user.fullName = this.user.fullname
        console.log(json_auth_user)
        this.tokenStorage.saveUser(json_auth_user)
        window.location.href = '/home';

    },
    err => {
      console.log(err);
      this.isSignUpFailed=true;
      this.isSuccessful=false;
      this.errorMessage = err.error.message.split('.');
      this.errorMessage[this.errorMessage.length-1] = this.errorMessage[this.errorMessage.length-1]+".";
      this.errorMessage = this.errorMessage.filter(item=> item!="");
    }
    );
  
  }

}