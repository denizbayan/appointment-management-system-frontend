import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage : string[] = [];
  genders = ["Kadın","Erkek","Diğer","Belirtmek istemiyorum"]
  selectedGender:any;
  exhibitionId:any;
  numericRE : RegExp = /.*\d.*/;
  lowerCaseRE : RegExp = /.*[a-z].*/;
  upperCaseRE : RegExp = /.*[A-Z].*/;
  specialCharRE : RegExp = /.*\W.*/;
  whiteSpaceRE : RegExp = /.*\s.*/;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.exhibitionId = params['id'];

    });
  }

  onSubmit():void{
    this.errorMessage = [];
    var regexControl = false;
    var whiteSpaceControl = false;
    //white space test must be implemented independent from other conditions
    if(this.whiteSpaceRE.test(this.form.password)){
      whiteSpaceControl = true;
      this.errorMessage.push("Şifre boşluk içeremez");
    }
    else{
      if(!this.numericRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet sayı");
      }
      if(!this.lowerCaseRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet küçük karakter");
      }
      if(!this.upperCaseRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet büyük karakter");
      }
      if(!this.specialCharRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet özel karakter (@#/*& gibi)");
      }
    }

    if(regexControl ||whiteSpaceControl){
      if(regexControl){
        this.errorMessage.push("İçermelidir.");
      }
      this.isSignUpFailed=true;
      this.isSuccessful=false;
    }else{
      this.authService.signup(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful=true;
          this.isSignUpFailed=false;
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
  validateCellPhone(cellPhone: string): boolean{
    if(cellPhone == "(___) ___-____") return false;
    var myregex = /^\D*(\d\D*){10}$/
    return !myregex.test(cellPhone);
  }

}
