import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UploadService {
    private uploadUrl = 'https://httpbin.org/post';

    constructor(private client: HttpClient) {}

    uploadFile(file: File): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);

        const req = new HttpRequest('POST', this.uploadUrl, formData, {
            reportProgress: true, // report progress events
            responseType: 'json'
        });

        return this.client.request(req);
    }
}