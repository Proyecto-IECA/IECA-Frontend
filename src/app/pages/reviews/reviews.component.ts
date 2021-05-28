import { Component, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { ReviewI } from '../../models/review';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: ReviewI[];

  constructor(private reviewService: ReviewsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.reviewService.getReviewsPendientes().subscribe(
        result => this.reviews = result.data,
        error => console.log(error)
    );
  }

  updateCalificar(id_receptor: number, calificacion: number, comentario?: string, button = false): void {
    this.reviewService.updateCalificar(id_receptor, calificacion, comentario).subscribe(
        () => {
          this.loadData();
           if (button) { this.doneMassage(); }
        },
        error => console.log(error)
    );
  }

  doneMassage(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Respuesta Guardada',
      showConfirmButton: false,
      timer: 1000
    });
  }

}
