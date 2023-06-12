import { Component,OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  roles : string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUser = false;
  fullname = ""
  title = "Psk. Gamze Bayan"
  headers: MenuItem[] =[];
  subheaders: MenuItem[] =[];
  constructor(private tokenStorageService: TokenStorageService, 
    private config: PrimeNGConfig, 
    private translateService: TranslateService) { }


  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.headers.push(
      {
        label: 'Psk. Gamze Bayan',
        command : () => {window.location.href="/home"},
        styleClass:"p-menubar-start",
      },{
        label: 'Hakkımda',
        command : () => {window.location.href="/about"},
        styleClass:"p-menubar-start",
      },{
        label: 'Blog',
        command : () => {window.location.href="/blog"},
        styleClass:"p-menubar-start",
      },{
        label: 'Psikoloji Sözlüğü',
        command : () => {window.location.href="/dictionary"},
        styleClass:"p-menubar-start",
      }
    )

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = JSON.parse(user).roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      var json = JSON.parse(user);
      var $: any;

      this.fullname =json.fullName;
      if (this.showAdminBoard){
        this.subheaders.push(
            {
              label: 'Blog Yönetimi',
              icon: 'pi pi-fw pi-file',
              command : () => {window.location.href="/blog"}
            }
          )

          this.subheaders.push(
            {
              label: 'Sözlük Yönetimi',
              icon: 'pi pi-fw pi-book',
              command : () => {window.location.href="/dictionary"}
            }
          )
      }

      this.subheaders.push(
        {
          label: 'Randevu Yönetimi',
          icon: 'pi pi-fw pi-calendar',
          command : () => {window.location.href="/sessions"}
        }
      )
      
      this.headers.push(
        {
          label: this.fullname,
          icon: 'pi pi-fw pi-user',
          styleClass:"p-menubar-end",
          items: [
              {
                  label: 'Profil Ayarları',
                  icon: 'pi pi-fw pi-users',
              },
              {
                  separator: true
              },
              {
                label: 'Çıkış Yap',
                icon: 'pi pi-fw pi-power-off',
                  command : () => this.logout()
              }
          ]
        }
      )

    }else{
      this.fullname = "Giriş Yap"
      this.headers.push(
        {
          label: this.fullname,
          icon: 'pi pi-fw pi-user',
          styleClass:"p-menubar-end",
          command : () => this.redirectLogin()
        }
      )
    }

    this.translateService.setDefaultLang('en');
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/login';
  }

  redirectLogin(): void {
    window.location.href = '/login';
  }

}
