import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ExperienceDates, ExperienceDate } from '../../data/experience-dates';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query('div', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ResumeComponent {
  experienceDates = ExperienceDates;

  calculateDuration(start: Date, end: Date | 'present'): string {
    const endDate = end === 'present' ? new Date() : new Date(end);
    const startDate = new Date(start);
    
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months += endDate.getMonth() - startDate.getMonth();
    
    // Add 1 to include both start and end months
    months += 1;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }

  formatDateRange(start: Date, end: Date | 'present'): string {
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        year: 'numeric'
      });
    };

    const startStr = formatDate(new Date(start));
    const endStr = end === 'present' ? 'Present' : formatDate(new Date(end));
    
    return `${startStr} - ${endStr}`;
  }
}