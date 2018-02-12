import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// interface User {
//   name: string,
//   email: string
// }
@Injectable()
export class DataService {
  result: any;
  constructor(private _http: HttpClient) { }
  getUsers() {
    // <User[]>
    return this._http.get('/api/users')
      // .subscribe((data: any[]) =>{
      //   console.log(data);
      // });
      // .map(result => this.result = result.json().data);
  }
}
