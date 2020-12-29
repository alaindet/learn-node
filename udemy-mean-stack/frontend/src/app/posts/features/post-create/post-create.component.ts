import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CreatePostDto } from '../../dtos/create-post.dto';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {

  enteredTitle = '';
  enteredContent = '';

  constructor(
    public postsService: PostsService,
  ) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { title, content } = form.value;
    const dto: CreatePostDto = { title, content };
    this.postsService.createPost(dto);
    form.resetForm();
  }
}
