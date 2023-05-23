export class User {

    public username?: string;
    public email?: string;
    public password?: string;
    public phone_number?: number;
    public gender?: string;
    public birth_date?: Date;
    public id?: number;

  
    constructor(data: any = null) {
      if(data !== null) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.phone_number = data.phone_number;
        this.gender = data.gender;
        this.birth_date = data.birth_date;
        this.id = data.id;


      }
      else {
        this.username = 'user';
        this.email = 'email';
        this.password = '11';
        this.id = 0;
        this.phone_number = 0;
        this.gender = "";
        this.birth_date = new Date();
      }
    }
  }