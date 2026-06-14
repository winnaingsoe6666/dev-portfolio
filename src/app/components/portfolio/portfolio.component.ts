import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  category: string;
  technologies?: string[];
  
  // New fields for Development projects
  featured?: boolean;
  domain?: string;
  role?: string;
  impact?: string;
  badges?: string[];

  // Existing fields for other types
  organization?: string;
  date?: string;
  author?: string;
  readDate?: string;
  rating?: number;
  review?: string;
  type: 'DEVELOPMENT' | 'RECOGNITION' | 'BOOK' | 'PRODUCT';
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TitleCasePipe
  ],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('80ms',
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PortfolioComponent {

  categories = ['ALL', 'DEVELOPMENT', 'PRODUCT', 'RECOGNITION', 'BOOKS'];
  selectedCategory = 'ALL';
  allItems: PortfolioItem[] = [];

  constructor(private dialog: MatDialog) {
    this.allItems = [
      // FEATURED DEVELOPMENTS
      {
        id: 1, title: 'Mifos Fineract Core Banking Platform', image: 'assets/images/development/offshore.jpg',
        domain: 'Core Banking', role: 'Senior Full-Stack Engineer',
        impact: 'Built and enhanced scalable banking modules for an open-source financial platform.',
        badges: ['Featured', 'FinTech', 'Core Banking', 'Open Source'],
        technologies: ['Java', 'Spring Boot', 'Docker', 'Angular'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: true
      },
      {
        id: 2, title: 'Stock Exchange Operations Platform', image: 'assets/images/development/KPI.jpg',
        domain: 'FinTech / Trading', role: 'Senior Software Engineer',
        impact: 'Enterprise platform used to manage stock exchange operations, resource allocation, and delivery tracking for Japanese clients.',
        badges: ['Enterprise', 'FinTech'],
        technologies: ['Java', 'Spring Boot', 'SQL', 'Linux'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: true
      },
      {
        id: 3, title: 'JLPT Registration System', image: 'assets/images/development/jlpt.png',
        domain: 'Registration & Payments', role: 'Full Stack Developer',
        impact: 'National-scale examination registration platform supporting online applications, payments, and scheduling workflows.',
        badges: ['High Scale', 'Enterprise'],
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'jQuery'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: true
      },
      // OTHER DEVELOPMENTS
      {
        id: 4, title: 'Offshore Development System', image: 'assets/images/development/offshore.jpg',
        domain: 'Project Management', role: 'Backend Developer',
        impact: 'Enterprise platform used to manage offshore software projects, resource allocation, and delivery tracking for Japanese clients.',
        badges: ['Enterprise'],
        technologies: ['Java', 'Spring Boot', 'Angular'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: false
      },
      {
        id: 5, title: 'KPI Management System', image: 'assets/images/development/KPI.jpg',
        domain: 'Performance Tracking', role: 'Backend Developer',
        impact: 'Performance tracking system for managing and monitoring Key Performance Indicators across different departments.',
        badges: ['Enterprise'],
        technologies: ['Java', 'Spring Boot', 'MySQL', 'React'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: false
      },
      {
        id: 6, title: 'Smart Attendance System', image: 'assets/images/development/attendance.jpg',
        domain: 'IoT & AI', role: 'Developer',
        impact: 'Automated attendance tracking system with facial recognition and real-time reporting capabilities.',
        badges: ['AI'],
        technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: false
      },
      {
        id: 7, title: 'Smart Home Automation', image: 'assets/images/development/smarthome.jpg',
        domain: 'IoT', role: 'Developer',
        impact: 'IoT-based home automation system for controlling lights, temperature, and security devices through a mobile app.',
        badges: ['IoT'],
        technologies: ['Java', 'Arduino', 'Android SDK', 'Firebase'], category: 'DEVELOPMENT', type: 'DEVELOPMENT', featured: false
      },
      // Products
      {
        id: 8, title: 'Clima Smart Weather App', image: 'assets/images/product/clima.jpg',
        description: 'Developed a native Android weather application with Jetpack Compose, implementing custom Canvas animations and robust location-based services for real-time data fetching and display.',
        technologies: ['Kotlin', 'Jetpack Compose', 'Canvas', 'Retrofit'], category: 'PRODUCT', type: 'PRODUCT'
      },
      // Recognitions
      {
        id: 9, title: 'ITPEC (FE)', organization: 'Information Technology Professionals Examination Council, Japan', image: 'assets/images/recognitions/ITPEC_FE.jpg',
        description: 'Successfully passed the Fundamental Information Technology Engineer Examination, demonstrating proficiency in core IT concepts and practices.',
        date: '06/2023', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      {
        id: 10, title: 'Best System Development Award', organization: 'DIR-ACE Technology', image: 'assets/images/recognitions/president_jlpt.png',
        description: 'Awarded for outstanding performance and contribution in "JLPT REGISTRATION SYSTEM PROJECT", recognizing excellence in system development.',
        date: '09/2021', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      {
        id: 11, title: 'Quality Assurance Award', organization: 'DIR-ACE Technology', image: 'assets/images/recognitions/president_QC.png',
        description: 'For being exceptional and driven towards the company values in productivity and quality as a member of CstNavi team.',
        date: '09/2021', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      // Books
      {
        id: 12, title: '48 Laws of Power', author: 'Robert Greene', image: 'assets/images/books/48_Laws.jpg',
        description: 'A comprehensive guide examining the laws of power, drawing from 3,000 years of history.',
        readDate: '2023', rating: 5, review: 'An insightful book that provides deep understanding of power dynamics in social and professional settings.',
        category: 'BOOKS', type: 'BOOK'
      },
      {
        id: 13, title: 'The Guy from Yangon', author: 'Khet Zaw', image: 'assets/images/books/Guy_From_Yng.jpg',
        description: 'A compelling narrative about life, culture, and experiences in Yangon, Myanmar.',
        readDate: '2023', rating: 5, review: 'A fascinating perspective on Myanmar culture and society, offering unique insights into life in Yangon.',
        category: 'BOOKS', type: 'BOOK'
      },
      {
        id: 14, title: 'Head First Java', author: 'Kathy Sierra, Bert Bates', image: 'assets/images/books/Head_first_Java.png',
        description: 'A brain-friendly guide to learning Java programming language fundamentals.',
        readDate: '2022', rating: 5, review: 'An excellent resource for learning Java, with its unique visual approach and practical examples.',
        category: 'BOOKS', type: 'BOOK'
      }
    ];
  }

  get featuredDevelopmentItems() {
    return this.allItems.filter(item => item.category === 'DEVELOPMENT' && item.featured);
  }

  get otherDevelopmentItems() {
    return this.allItems.filter(item => item.category === 'DEVELOPMENT' && !item.featured);
  }

  get filteredItems() {
    if (this.selectedCategory === 'ALL') {
      return this.allItems;
    }
    return this.allItems.filter(item => item.category === this.selectedCategory);
  }

  getItemsByCategory(category: string) {
    return this.allItems.filter(item => item.category === category);
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
  }

  openImageViewer(image: string, title: string): void {
    this.dialog.open(ImageViewerComponent, {
      data: { image, title },
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'image-viewer-dialog'
    });
  }
}