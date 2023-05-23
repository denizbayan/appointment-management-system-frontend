import { Component, OnInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit  {
  
  products :any[] =[]
  layout: string = 'list';

  constructor(private blogService: BlogService ) { }

  ngOnInit() {
    this.blogService.getPosts().subscribe(
      data => {this.products=data},
      err=>{console.log(err)}
      
    );
    
    
    //.then((data) => (this.products = data.slice(0, 12)));
}
}
