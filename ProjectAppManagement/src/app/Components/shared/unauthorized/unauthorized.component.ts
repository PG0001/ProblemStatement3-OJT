import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],

  standalone: true, // ✅ Add this line
  imports: [CommonModule]


})
export class UnauthorizedComponent {

}
