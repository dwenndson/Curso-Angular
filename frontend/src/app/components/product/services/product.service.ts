import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:3001/products/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url, product)
    .pipe(map(obj => obj),
    catchError(e => this.errorHandle(e))
    );  
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
  }

  readById(id: string): Observable<Product>{
    const url = `${this.url}${id}` 
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product>{
    const url = `${this.url}${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id: string): Observable<Product>{
    const url = `${this.url}${id}`
    return this.http.delete<Product>(url)
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage('Ocorreu um error!', true)
    return EMPTY
  }
}
