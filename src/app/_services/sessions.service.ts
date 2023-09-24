import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';


const SESSION_API = UrlHelper.BASE_URL+'/api/session/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http:HttpClient) { }

  getSessions(purpose: any):Observable<any>{
    return this.http.get(SESSION_API+'getSessions/'+purpose,httpOptions);
  }

  getSessionsByUserId(id :any):Observable<any>{
    return this.http.get(SESSION_API+'getSessionsByUserId/'+id,httpOptions);
  }


  deleteSessionById(id:any):Observable<any>{
    return this.http.delete(SESSION_API+'deleteSessionById/'+id,httpOptions);
  }

  saveSession(session:any):Observable<any>{
    console.log(session)
    return this.http.post(SESSION_API+'saveSession',{
      sessionID:session.id,
      patientID:session.patient_user.id,
      psychologistID:session.psychologist_user.id,
      sessionDate:session.session_date,
      status : session.status
    },httpOptions);
  }
}
