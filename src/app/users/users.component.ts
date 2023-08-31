import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../_structs/user';
import { UsersService } from '../_services/users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class UsersComponent implements OnInit {

  search_text_users: string = ""

  userDialog: boolean =false;

  users: User[] = [];

  user: User = {};

  selectedUsers: User[] =[];

  submitted: boolean =false;

  dropdownIcon="pi pi-chevron-circle-down";
  
  isNewUser: boolean =false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage : string[] = [];
  genders = ["Kadın","Erkek","Diğer","Belirtmek istemiyorum"]

  constructor(private usersService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isNewUser = false;

    this.refreshList();


  }


  openNew() {
    this.isNewUser = true;
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  async  asyncForEach(array: any, callback:any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  deleteSelectedusers() {

    this.asyncForEach(this.selectedUsers, async (user: any) => {
      await this.deleteUser(user);
      console.log(user);
    })

  }


  editUser(user: User) {
    this.isSuccessful = false;
    this.isNewUser = false;
    this.submitted = false;
    this.user = { ...user };
    this.userDialog = true;

  }

  deleteUser(user: User) {
    return new Promise((resolve, reject) => {

    this.confirmationService.confirm({
      message: user.fullname +'  adlı kullanıcıyı silmek istediğinize emin misiniz ' +  '?',
      header: 'İşlem Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.usersService.deleteUserById(user.id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı silindi.', life: 3000 });
          this.user = {};
          this.refreshList();
          resolve('');


        }, err => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: err.error.message != undefined?err.error.message:'Kullanıcı silinemedi. Kullanıcı bir etkinliğe kayıtlı ya da kullanıcıya ait bir davetiye mevcut.', life: 3000 });
          resolve('');

        });
      }
    });
    });
  }

  deleteSelectedUsers() {
    var tempSelectedUsers = this.selectedUsers;
    this.confirmationService.confirm({
      message: this.selectedUsers.length +' kullanıcıyı silmek istediğinize emin misiniz ' +  '?',
      header: 'İşlem Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        tempSelectedUsers.forEach(u=>{
          this.deleteUserMultiple(u)
        })
        this.selectedUsers=[];
      }
    });
  }

  deleteUserMultiple(user:User){
    try{
      this.usersService.deleteUserById(user.id).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: user.fullname + ' adlı kullanıcı silindi.', life: 8000 });
        this.user = {};
        this.refreshList();
  
  
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: err.error.message != undefined?err.error.message:user.fullname + ' adlı kullanıcı silinemedi. Kullanıcı bir etkinliğe kayıtlı ya da kullanıcıya ait bir davetiye mevcut.', life: 10000 });
  
      });
    }catch(e){
      console.log(e)
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.isSuccessful = false;
    this.isNewUser = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onSubmit():void{
    this.errorMessage = [];

    if (this.user.id == undefined){
      this.usersService.addUser(this.user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful=true;
          this.isSignUpFailed=false;
          this.refreshList();
  
      },
      err => {
        console.log(err);
        this.isSignUpFailed=true;
        this.isSuccessful=false;
        this.errorMessage = err.error.message.split('.');
        this.errorMessage[this.errorMessage.length-1] = this.errorMessage[this.errorMessage.length-1]+".";
        this.errorMessage = this.errorMessage.filter(item=> item!="");
      }
      );
    }else{
      this.usersService.updateUser(this.user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful=true;
          this.isSignUpFailed=false;
          this.refreshList();
  
      },
      err => {
        console.log(err);
        this.isSignUpFailed=true;
        this.isSuccessful=false;
        this.errorMessage = err.error.message.split('.');
        this.errorMessage[this.errorMessage.length-1] = this.errorMessage[this.errorMessage.length-1]+".";
        this.errorMessage = this.errorMessage.filter(item=> item!="");
      }
      );
    }

    this.hideDialog();
  
  }

  checkMail(email: any) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());

  }

  refreshList() {
    this.usersService.getUsers().subscribe(data => {

      for(var i = 0; i<data.length ; i++){
        data[i].birthdate = new Date(data[i].birthdate)
        if (data[i].role.length== 2){
          data[i].rolestr="Psikolog"
        }else{
          data[i].rolestr="Danışan"
        }
      }


      this.users = data;
    }, err => {
      console.log(err)

    });

  }

  formIsValid = () => {
    if (!this.user.email || !this.user.fullname || !this.checkMail(this.user.email)) {
      return false;
    }else{
      return true;
    }
  }

  validateCellPhone(cellPhone: any): boolean{
    if(cellPhone == "(___) ___-____") return false;
    var myregex = /^\D*(\d\D*){10}$/
    return !myregex.test(cellPhone);
  }

}
