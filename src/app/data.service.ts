import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private baseUrl = 'http://localhost:8080/api/'

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecord(endpoint: string, id): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRecord(endpoint: string, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.delete(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addRecord(endpoint: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record, this.options)
            .map(this.extractData);
    }


    private extractData(res: Response) {
        try{
            var results = res.json();
        }catch(e){
            if(res.status == 200){
                results = false;
            }else{
                Observable.throw(e);
            }
        }
        
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if(typeof error._body === "string"){
            errMsg = error._body
        }else{
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
            }
        }

        return Observable.throw(errMsg);
    }


}
