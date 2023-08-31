import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';
import { User } from '../_structs/user';

const USER_API = UrlHelper.BASE_URL+'/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(USER_API+'getUsers',httpOptions);
  }

  deleteUserById(id:any):Observable<any>{
    return this.http.delete(USER_API+'deleteUserById/'+id,httpOptions);
  }

  getUserById(id:any):Observable<any>{
    return this.http.get(USER_API+'getUserById/'+id,httpOptions);
  }
 

  updateUser(user :User):Observable<any>{
    return this.http.put(USER_API+'updateUser',
    {
      id: user.id,
      fullname:user.fullname,
      email:user.email,
      password:user.password,
      cellPhone:user.cellPhone,
      birthdate:user.birthdate,
      gender:user.gender
    },
    httpOptions);
  }

  addUser(user :User):Observable<any>{
    return this.http.post(USER_API+'addUser',
    {
      fullname:user.fullname,
      email:user.email,
      password:user.password,
      cellPhone:user.cellPhone,
      birthdate:user.birthdate,
      gender:user.gender
    },
    httpOptions);
  }

}
