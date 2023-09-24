import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { SessionsService } from '../_services/sessions.service';
import { BlogService } from '../_services/blog.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';
import { session_status } from '../_helpers/enums';
import { async } from 'rxjs';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

    roles : string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    futureSessions :any[] = []
    pastSessions :any[] = []
    waitingSessions :any[] = []
    rejectedSessions :any[] = []
    users :any[] =[]
    psychologist_users :any[] =[]
    x : string[]=["asd","as"]
    psychologist_user: any;
    layout: string = 'list';
    submitted: boolean = false;
    selected_session : any = {};
    showSessionDialog :boolean = false;
    user: any;

    session_status = session_status

    constructor(private sessionsService: SessionsService,private usersService: UsersService,private tokenStorageService: TokenStorageService ) { }

    ngOnInit() {
      this.submitted = false

      this.user = this.tokenStorageService.getUser();
      this.roles = JSON.parse(this.user).roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.getSessions(this.showAdminBoard)
      this.getUsers()
      //.then((data) => (this.sessions = data.slice(0, 12)));
  }

  deleteSession(session:any){
    this.sessionsService.deleteSessionById(session.id).subscribe(
      data => {
        console.log(data)
        this.getSessions(this.showAdminBoard);
      },
      err=>{console.log(err)}
    );

  }


  openSessionDialog(session: any){
    this.showSessionDialog = true;
    if (session!= null){
      this.selected_session.sessionID = session.id
      this.selected_session.patientID = session.patientID;
      this.selected_session.psychologistID = session.psychologistID;
      this.selected_session.date = session.date;
    }
    

  }

  cleanTextFields(){
    this.selected_session={}
  }
  //update has bugs
  saveSession(session:any,new_status: session_status){
   
    this.submitted = true;
    if (session.id == undefined){
      session.id = -1
    }
    session.status= new_status

    this.sessionsService.saveSession(session).subscribe(
      data => {
        console.log(data)
        this.getSessions(this.showAdminBoard);
        this.showSessionDialog = false
      },
      err=>{console.log(err)}
    );

  }

  getSessions(isAdmin: boolean){
    this.futureSessions= []
    this.pastSessions= []
    this.waitingSessions= []
    this.rejectedSessions= []

    if (isAdmin){
      this.sessionsService.getSessions("management").subscribe(
        data => {

          for(var i = 0; i<data.length ; i++){
            console.log(data[i])
            console.log(data[i].status)
            data[i].date = new Date(data[i].date)
            switch (data[i].status){
              case session_status.WAITING:
                this.waitingSessions = [...this.waitingSessions, data[i]];
                break;
              case session_status.REJECTED:
                this.rejectedSessions = [...this.rejectedSessions, data[i]];
                break;
              case session_status.APPROVED:
                if (new Date(data[i].date).getTime() > new Date().getTime()){
                  this.futureSessions = [...this.futureSessions, data[i]];
                }else{
                  this.pastSessions = [...this.pastSessions, data[i]];
                }
            }

          }

        },
        err=>{console.log(err)}
      );
    }else{
      this.sessionsService.getSessionsByUserId(JSON.parse(this.user).id).subscribe(
        data => {
          for(var i = 0; i<data.length ; i++){
            console.log(data[i])
            data[i].date = new Date(data[i].date)
            switch (data[i].status){
              case session_status.WAITING:
                this.waitingSessions = [...this.waitingSessions, data[i]];
                break;
              case session_status.REJECTED:
                this.rejectedSessions = [...this.rejectedSessions, data[i]];
                break;
              case session_status.APPROVED:
                if (new Date(data[i].date).getTime() > new Date().getTime()){
                  this.futureSessions = [...this.futureSessions, data[i]];
                }else{
                  this.pastSessions = [...this.pastSessions, data[i]];
                }
            }
          }

        },
        err=>{console.log(err)}
      );
    }

  }

  getUsers(){
    this.users = []
    this.usersService.getUsers().subscribe(data => {
      if (this.showAdminBoard){
        this.users = data;
      }else{
        for(var i = 0; i<data.length ; i++){
          if ( data[i].id == JSON.parse(this.user).id ){
            this.users.push(data[i])
          }
        }
      }
      
      for(var i = 0; i<data.length ; i++){
        if ( data[i].role.length == 2 ){
          this.psychologist_users.push( data[i])
        }
      }

    }, err => {
      console.log(err)

    });
  }




}
