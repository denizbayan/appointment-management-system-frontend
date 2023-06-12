import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';


const BLOG_API = UrlHelper.BASE_URL+'/api/blog/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getPosts():Observable<any>{
    return this.http.get(BLOG_API+'getPosts',httpOptions);
  }

  deletePost(id:any):Observable<any>{
    return this.http.delete(BLOG_API+'deletePost/'+id,httpOptions);
  }

  savePost(blogpost:any):Observable<any>{
    return this.http.post(BLOG_API+'savePost',{
      id:blogpost.id,
      title:blogpost.title,
      content:blogpost.content
    },httpOptions);
  }


}
