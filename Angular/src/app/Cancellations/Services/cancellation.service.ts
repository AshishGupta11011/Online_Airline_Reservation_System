import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CancellationService {
    
    constructor(private http: HttpClient) {}

    getCancellationDetails() {
        return this.http.get('https://localhost:5335/api/Cancel');
    }

    cancelTicket(bId: string) {
        return this.http.get('https://localhost:5335/api/Cancel/CancellationDetails/' + bId);
    }
}