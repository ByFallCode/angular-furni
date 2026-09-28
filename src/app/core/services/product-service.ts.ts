import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceTs {
  private urlBackend = 'http://localhost:8000/api/products';

  public getProducts(): Promise<any> {
    return fetch(this.urlBackend)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching products:', error);
        throw error;
      });
  }

  public getProductById(id: number): Promise<any> {
    return fetch(`${this.urlBackend}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      });
  }

  public createProduct(product: any): Promise<any> {
    return fetch(this.urlBackend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        throw error;
      });
  }

  public updateProduct(id: number, product: any): Promise<any> {
    return fetch(`${this.urlBackend}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
      });
  }

  public deleteProduct(id: number): Promise<any> {
    return fetch(`${this.urlBackend}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
      });
  }
}
