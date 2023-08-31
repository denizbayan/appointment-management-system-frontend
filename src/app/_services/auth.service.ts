import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';
import { ResetPassword } from '../_structs/resetPassword';


const AUTH_API = UrlHelper.BASE_URL+'/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private http:HttpClient) { }

  signup(form:any):Observable<any>{
    return this.http.post(AUTH_API+'signup',{
      fullname:form.fullname,
      email:form.email,
      password:form.password,
      cellPhone:form.cellPhone,
      birthdate:form.birthdate,
      gender:form.gender
    },
    httpOptions);
  }

  signin(form:any) : Observable<any>
  {
    
    return this.http.post(AUTH_API+'signin',{
      email:form.email,
      password:form.password
    },
    httpOptions);
  }

  resetPassword(resetInfo:ResetPassword){
    return this.http.post(AUTH_API+'resetPassword',
    {
      email:resetInfo.email,
      code:resetInfo.code,
      password:resetInfo.newPassword
    },
    httpOptions)
  }

  sendSecurityCode(mail:string){
    return this.http.post(AUTH_API+'sendSecurityCode',{email:mail}, httpOptions)
  }

}
