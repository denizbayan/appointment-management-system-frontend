import { Component, OnInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { PsyDictionaryService } from '../_services/psy-dictionary.service';

@Component({
  selector: 'app-psy-dictionary',
  templateUrl: './psy-dictionary.component.html',
  styleUrls: ['./psy-dictionary.component.css']
})

export class PsyDictionaryComponent implements OnInit{


  roles : string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  dictionary :any[] =[]
  layout: string = 'list';
  submitted: boolean = false;
  selected_word : any = {};
  showDictionaryDialog :boolean = false;
  constructor(private dictionaryService: PsyDictionaryService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit() {
    this.submitted = false
    this.getDictionary()
    const user = this.tokenStorageService.getUser();
    this.roles = JSON.parse(user).roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    //.then((data) => (this.posts = data.slice(0, 12)));
}

deleteDictionaryWord(dictionaryWord:any){
  this.dictionaryService.deleteDictionaryWord(dictionaryWord.id).subscribe(
    data => {
      console.log(data)
      this.getDictionary();
    },
    err=>{console.log(err)}
  );


}


openDictionaryDialog(dictionary_word: any){
  this.showDictionaryDialog = true;
  if (dictionary_word!= null){
    this.selected_word.id = dictionary_word.id
    this.selected_word.word = dictionary_word.word;
    this.selected_word.meaning = dictionary_word.meaning
  }
  

}

cleanTextFields(){
  this.selected_word={}
}

saveDictionaryWord(dictionaryWord:any){
  this.submitted = true;
  if (dictionaryWord.id == undefined){
    dictionaryWord.id = -1
  }
  this.dictionaryService.saveDictionaryWord(dictionaryWord).subscribe(
    data => {
      console.log(data)
      this.getDictionary();
      this.showDictionaryDialog = false
    },
    err=>{console.log(err)}
  );

}

getDictionary(){
  this.dictionaryService.getDictionary().subscribe(
    data => {this.dictionary=data},
    err=>{console.log(err)}
  );
}

}


