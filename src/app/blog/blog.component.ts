import { Component, OnInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit  {

  roles : string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  posts :any[] =[]
  layout: string = 'list';
  submitted: boolean = false;
  selected_blogpost : any = {};
  showBlogDialog :boolean = false;
  constructor(private blogService: BlogService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit() {
    this.submitted = false
    this.getPosts()
    const user = this.tokenStorageService.getUser();
    this.roles = JSON.parse(user).roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    //.then((data) => (this.posts = data.slice(0, 12)));
}

deletePost(blogpost:any){
  this.blogService.deletePost(blogpost.id).subscribe(
    data => {
      console.log(data)
      this.getPosts();
    },
    err=>{console.log(err)}
  );


}


openBlogDialog(blogpost: any){
  this.showBlogDialog = true;
  if (blogpost!= null){
    this.selected_blogpost.id = blogpost.id
    this.selected_blogpost.title = blogpost.title;
    this.selected_blogpost.content = blogpost.content
  }
  

}

cleanTextFields(){
  this.selected_blogpost={}
}

savePost(blogpost:any){
  this.submitted = true;
  if (blogpost.id == undefined){
    blogpost.id = -1
  }
  this.blogService.savePost(blogpost).subscribe(
    data => {
      console.log(data)
      this.getPosts();
      this.showBlogDialog = false
    },
    err=>{console.log(err)}
  );

}

getPosts(){
  this.blogService.getPosts().subscribe(
    data => {this.posts=data},
    err=>{console.log(err)}
  );
}
}
