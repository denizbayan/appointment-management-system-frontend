import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';

const DICT_API = UrlHelper.BASE_URL+'/api/dictionary/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PsyDictionaryService {

  constructor(private http:HttpClient) { }

  getDictionary():Observable<any>{
    return this.http.get(DICT_API+'getDictionary',httpOptions);
  }

  deleteDictionaryWord(id:any):Observable<any>{
    return this.http.delete(DICT_API+'deleteDictionaryWord/'+id,httpOptions);
  }

  saveDictionaryWord(dictionaryWord:any):Observable<any>{
    return this.http.post(DICT_API+'saveDictionaryWord',{
      id:dictionaryWord.id,
      word:dictionaryWord.word,
      meaning:dictionaryWord.meaning
    },httpOptions);
  }
}
