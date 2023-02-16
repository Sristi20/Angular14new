import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  login_url = 'https://reqres.in/api/login';
  user_url ='https://reqres.in/api/users?page=2';
  http: any;
  

    
  constructor(private httpClient: HttpClient) { }
   
  getPosts(){
    return this.httpClient.get(this.url);
  }
  login(user:any){
    return this.http.post(this.login_url, user);
  }
  user(){
    return this.http.get(this.user_url);
  }
}
