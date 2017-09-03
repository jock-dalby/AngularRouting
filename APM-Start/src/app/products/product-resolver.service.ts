import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IProduct } from './product';

@Injectable()

export class ProductResolver implements Resolve<IProduct> {

    constructor(
        private router: Router,
        private productService: ProductService) {
    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IProduct> {
            let id = route.params['id'];
            /* Error Handling */
            if (isNaN(id)) {
                console.log(`Produc id was not a number: ${id}`)
                this.router.navigate(['/products']);
                return Observable.of(null);
            }
            /* End Error Handling */
            return this.productService.getProduct(+id)
            /* Error Handling */
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
            /* End Error Handling */
    }
};
