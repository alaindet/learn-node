import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    public postsService: PostsService,
  ) {}

  ngOnInit() {
    this.postsService.fetchPosts();
    this.postsSub = this.postsService.posts.subscribe(
      (posts: Post[]) => this.posts = posts
    );
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onEdit(id: Post['id']) {
    console.log('onEdit', id);
  }

  onDelete(id: Post['id']) {
    console.log('onDelete', id);
  }
}
