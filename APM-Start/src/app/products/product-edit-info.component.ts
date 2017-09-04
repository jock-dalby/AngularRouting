import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm: NgForm;

    errorMessage: string;
    product: IProduct;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.product = data['product'];

            if (this.productForm) {
                // Resets the validation state of the form everytime the product changes from within the view
                this.productForm.reset();
            }
        });
    }
}
