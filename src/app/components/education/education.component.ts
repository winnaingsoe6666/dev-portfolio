import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

// Interface for a university degree
interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  date: string;
  logo: string;
  highlights: string[];
}

// Interface for a certification
interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  issuerUrl?: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        // The animation now only targets the certificate cards
        query('.certificate-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EducationComponent {

  // This is now a single object, not an array
  universityEducation: EducationItem = {
    degree: 'Bachelor of Engineering (Electronics)',
    institution: 'Technological University, Kalay, Myanmar',
    location: 'Kalay, Myanmar',
    date: '2012 - 2018',
    logo: 'assets/images/education/tukalay.jpg', // <-- Make sure this path is correct
    highlights: [
      'Served as the student union leader for the Electronics major.',
      'Received the Project Award for the "Smart Home Automation System" in 2018.'
    ]
  };

  certifications: CertificationItem[] = [
    {
      title: 'ITPEC: Fundamental Information Technology Engineer (FE)',
      issuer: 'Information Technology Professionals Examination Council, Japan',
      date: '06/2023',
      description: 'Successfully passed the national-level IT examination, demonstrating proficiency in core information technology concepts, algorithms, and development practices.',
      credentialId: 'MMFE23S00159',
      credentialUrl: 'https://itpec.org/statsandresults/all-passers-information/Myanmar/2023S_FE.pdf',
      issuerUrl: 'https://itpec.org'
    },
    {
      title: 'Java Web Development',
      issuer: 'ACE Group of Companies - Talent Program',
      date: '11/2019',
      description: 'Completed an intensive, selective training program focused on enterprise-level Java web development, covering advanced topics in Spring MVC, database design, and application architecture.',
    }
  ];
}