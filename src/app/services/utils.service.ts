import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) {}

  /*
      @function getEndPoint
      @return EndPoint
      @desc: get the endpoint according to environment
  */
  getEndPoint(): EndPoint {
    return {
      apiUrl: environment.apiUrl,
    }
  }
}

export class EndPoint {
  apiUrl!: string;
}