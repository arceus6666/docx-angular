import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private backend_url: string
  constructor(private http: HttpClient) {
    this.backend_url = 'http://localhost:9000'
  }

  public getGlobal<Object>(urlMethod: string, param: string): Observable<Object> {
    return this.http.get<Object>(this.backend_url + urlMethod, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('param', param)
    })
  }

  public postGlobal<Object>(urlMethod: string, body: any): Observable<Object> {
    return this.http.post<Object>(this.backend_url + urlMethod, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public deleteGlobal<Object>(urlMethod: string, code: string): Observable<Object> {
    return this.http.delete<Object>(this.backend_url + urlMethod + code, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public putGlobal<Object>(urlMethod: string, body: any): Observable<Object> {
    return this.http.put<Object>(this.backend_url + urlMethod, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
