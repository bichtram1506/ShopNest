import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DISCOUNT_API = "http://localhost:8080/api/discount/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  getListDiscounts(): Observable<any> {
    return this.http.get(DISCOUNT_API, httpOptions);
  }

  getDiscountById(id: number): Observable<any> {
    return this.http.get(DISCOUNT_API + id, httpOptions);
  }

  createDiscount(code: string, name: string, description: string, usageCount: number, percentage: number, startDate: string, endDate: string, status: string): Observable<any> {
    return this.http.post(DISCOUNT_API + 'create', { code, name, description, usageCount, percentage, startDate, endDate, status }, httpOptions);
  }

  updateDiscount(id: number, code: string, name: string, description: string, percentage: number, startDate: string, endDate: string, status: string): Observable<any> {
    return this.http.put(DISCOUNT_API + 'update/' + id, { code, name, description, percentage, startDate, endDate, status }, httpOptions);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete(DISCOUNT_API + 'delete/' + id, httpOptions);
  }
}
