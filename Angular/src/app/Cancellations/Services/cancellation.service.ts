import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CancellationService {
    
    constructor(private http: HttpClient) {}

    getCancellationDetails() {
        return this.http.get<any>('http://localhost:53981/api/Cancellations');
    }

    cancelTicket(bId: string) {
        return this.http.get<any>('http://localhost:53981/api/Cancellations/CancellationDetails/' + bId);
    }
}