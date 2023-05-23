import { Component,OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  roles : string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUser = false;
  fullname = ""
  title = "Psk. Gamze Bayan"
 
  constructor(private tokenStorageService: TokenStorageService, 
    private config: PrimeNGConfig, 
    private translateService: TranslateService) { }


  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = JSON.parse(user).roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      var json = JSON.parse(user);
      var $: any;

      this.fullname =json.fullName;
    }else{
    this.fullname = "Lütfen Giriş Yapınız."
    }

    this.translateService.setDefaultLang('en');
  }
  logout(): void {
    this.tokenStorageService.signOut();
  }

}
