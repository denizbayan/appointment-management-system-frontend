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
   
  constructor() {}

  ngOnInit(): void {}
  

}





