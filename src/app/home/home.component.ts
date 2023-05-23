import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import {Message} from 'primeng//api';


import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { DomSanitizer } from '@angular/platform-browser';

import { AnonymousSubject } from 'rxjs/internal/Subject';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  tabOpen:boolean= true;
  header ="Etkinliklerim"

  userExhibition:any;
	userId:any;
  showBrowserInfo=true;
	responsiveOptions;
  errorLabel:any;
  yok:any;
  userData: any;
  popup:boolean=false;
  showUnity : boolean = false;
  gameInstance: any;
  private stompClient = null;
  scaleToFit: any;

  form: any = {};

  errorMessage = '';
  roles: string[] = [];
  
  constructor( private _sanitizer: DomSanitizer,private activatedRoute: ActivatedRoute, private elementRef: ElementRef,private messageService:MessageService) {
    
    

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

   }

  setShowUnity(event:any){
    this.showUnity = event.value;
  }
  ngOnInit(): void {


  }

  reloadPage(): void {
    window.location.href = '/user';
  }
  hideBrowserInfo(): void {
    this.showBrowserInfo=false;
  }
  redirectLogin(): void {
    window.location.href = '/login';
  }
  
  getImageFromBase64(base64:string){
    if(base64 == null)
      return "./assets/default_exhibition_image.png";
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+base64);
  }


 

  // onResize() {
  //   var canvas = this.gameInstance.Module.canvas;
  //   var container = this.gameInstance.container;
  //   var w;
  //   var h;

  //   if (this.scaleToFit) {
  //     w = window.innerWidth;
  //     h = window.innerHeight;

  //     var r = 1080 / 1920;

  //     if (w * r > window.innerHeight) {
  //       w = Math.min(w, Math.ceil(h / r));
  //     }
  //     h = Math.floor(w * r);
  //   } else {
  //     w = 1920;
  //     h = 1080;
  //   }

  //   container.style.width = canvas.style.width = w + "px";
  //   container.style.height = canvas.style.height = h + "px";
  //   container.style.top = Math.floor((window.innerHeight - h) / 2) + "px";
  //   container.style.left = Math.floor((window.innerWidth - w) / 2) + "px";
  // }
  // DisplayGeneratedRandomNumber(numberText) { //
  //   alert(numberText);
  // }

  // SetClientInfos() { //
  //   var infoObject = { name: "Osman" + Math.floor((Math.random() * 100) + 1), age: "26", status: "Client" };
  //   var jsonString = JSON.stringify(infoObject);

  //   this.gameInstance.SendMessage('JavascriptHook', 'TestJson', jsonString);
  // }

  // SetClientRoomInfo() {
  //   var roomObject = { roomName: "Room101" };//Oda bilgileri. Şimdilik sadece oda ismi barındırıyor. İlerde kişi sayısı vs gibi bilgileri alabiliriz.

  //   var jsonString = JSON.stringify(roomObject);

  //   this.gameInstance.SendMessage('JavascriptHook', 'SetClientRoomInfo_CS', jsonString);
  // }

  // sendChatMessage() {

  //   var text = document.getElementById("chat").getAttribute("value");
  //   if (text == "") {
  //     alert("Message must be filled out");
  //     return false;

  //   }
  //   var chatData = { name: this.userData.name, message: text };
  //   var strData = JSON.stringify(chatData);
  //   this.gameInstance.SendMessage('JavascriptHook', 'ReciveMessageFromJavascript', strData)
  // }



  // recaptureInputAndFocus = function () {
  //   var canvas = document.getElementById("#canvas");
  //   if (canvas) {
  //     canvas.setAttribute("tabindex", "1");
  //     canvas.focus();
  //   } else
  //     setTimeout(this.recaptureInputAndFocus, 100);
  // }






}





