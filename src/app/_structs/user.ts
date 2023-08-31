export class User {

    public fullname?: string;
    public email?: string;
    public password?: string;
    public cellPhone?: number;
    public gender?: string;
    public birthdate?: Date;
    public id?: number;
    public rolestr?: string;

  
    constructor(data: any = null) {
      if(data !== null) {
        this.fullname = data.fullname;
        this.email = data.email;
        this.password = data.password;
        this.cellPhone = data.cellPhone;
        this.gender = data.gender;
        this.birthdate = data.birthdate;
        this.id = data.id;

        if(data.roles.length == 2){
          this.rolestr = "Psikolog"
        }else{
          this.rolestr = "Danışan"
        }

      }
      else {
        this.fullname = 'user';
        this.email = 'email';
        this.password = '11';
        this.id = 0;
        this.cellPhone = 0;
        this.gender = "";
        this.birthdate = new Date();
        this.rolestr = "Danışan"
      }
    }
  }