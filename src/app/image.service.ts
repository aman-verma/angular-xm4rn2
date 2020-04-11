import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ImageService {
apiURL: string = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
constructor( private http: HttpClient) {}
  
getImagesfromURl(){   

    return this.http.get<any>(`${this.apiURL}`,
    { observe: 'response' }).pipe(tap(res => {
      console.log(res)
      return res;
    }));
  }
    
}
