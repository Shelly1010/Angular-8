import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  getCities(){
    return this.http.get('https://indian-cities-api-nocbegfhqg.now.sh/cities');
  }
}
