import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100px)', opacity: 0 }),
        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideUpFade', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('textReveal', [
      transition(':enter', [
        style({ clipPath: 'inset(0 100% 0 0)' }),
        animate('0.8s cubic-bezier(0.4, 0, 0.2, 1)', style({ clipPath: 'inset(0 0% 0 0)' }))
      ])
    ]),
    trigger('buttonFadeUp', [
      transition(':enter', [
        query('button', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(200, [
            animate('0.5s cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('floatAnimation', [
      transition('* => *', [
        animate('3s ease-in-out', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-10px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1.0 })
        ]))
      ])
    ]),
    trigger('growAnimation', [
      transition(':enter', [
        query('.leaf', [
          style({ transform: 'scale(0)', opacity: 0 }),
          stagger(200, [
            animate('0.6s cubic-bezier(0.4, 0, 0.2, 1)', 
              style({ transform: 'scale(1)', opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class HomeComponent {
  state = 'start';

  ngOnInit() {
    setInterval(() => {
      this.state = this.state === 'start' ? 'end' : 'start';
    }, 3000);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
}