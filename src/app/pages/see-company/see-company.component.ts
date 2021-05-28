import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../reviews/reviews.service';
import { ReviewI } from '../../models/review';


@Component({
  selector: 'app-see-company',
  templateUrl: './see-company.component.html',
  styles: [`
    .example-card {
      max-width: 400px;
      margin-bottom: 20px;

      /* IMPORTANTE */
      margin-left: auto;
      margin-right: auto;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }

    .valoracion {
      display: flex;
      flex-direction: row-reverse;
      --color-inactivo: #5f5050;
      --color-hover: #ffa400;
    }

    .star {
      background-color: initial;
      border: 0;
      color: #ffa400;
    }

    .fecha {
      margin-left: 10px;
      margin-right: 10px;
    }

    .align-center {
    }

  `]
})
export class SeeCompanyComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  reviews: ReviewI;

  constructor
  (private activatedRoute: ActivatedRoute,
   private reviewService: ReviewsService) {  }

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this.activatedRoute.params.subscribe(
        (params) => this.getReviews(params['id'])
    );
  }

  getReviews(id: number): void {
    this.reviewService.getReviews(id).subscribe(
        response => this.reviews = response.data,
        error => console.log(error)
    );
  }

}
