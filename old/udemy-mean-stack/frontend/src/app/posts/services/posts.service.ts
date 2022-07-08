import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Post } from '../models/post';
import { EditPostDto }  from '../dtos/edit-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts$ = new BehaviorSubject<Post[]>([]);

  get posts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {}

  fetchPosts(): void {
    this.http.get<ApiResponse<Post[]>>(`${environment.apiUrl}/posts`)
      .subscribe((response: ApiResponse<Post[]>) => {
        this.posts$.next(response.data);
      });
  }

  createPost(dto: CreatePostDto): void {
    this.http.post<ApiResponse<null>>(`${environment.apiUrl}/posts`, dto)
      .subscribe((response: ApiResponse<null>) => {
        console.log('ALERT', response.message);
        this.fetchPosts();
      });
  }

  editPost(id: Post['id'], dto: EditPostDto): void {
    // TODO
  }

  deletePost(id: Post['id']): void {
    // TODO
  }
}
