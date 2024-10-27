import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
    
@Injectable({
  providedIn: 'root'
})
export class HttpService{
    private API_KEY = "44962e433acd93c4f1df79b4b73052ce";
    constructor(private http: HttpClient){ }
         
    getData(): Observable<any> {
      return this.http.get<any>(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${this.API_KEY}`);
    }  
}