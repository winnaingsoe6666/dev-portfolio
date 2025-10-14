import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    // A single, powerful trigger for a staggered fade-and-slide-in effect
    trigger('fadeSlideIn', [
      transition(':enter', [
        // Query for all elements with the .anim-item class
        query('.anim-item', [
          // Start state: invisible and slightly moved down
          style({ opacity: 0, transform: 'translateY(20px)' }),
          // Animate each item one by one with a 100ms delay
          stagger('100ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
            // End state: fully visible and in its original position
            style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ]
})
export class ContactComponent {
  constructor() { }
}