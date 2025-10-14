import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

// Define a base interface for all portfolio items
interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  technologies?: string[];
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
      // Developments
      {
        id: 1, title: 'Offshore Development System', image: 'assets/images/development/offshore.jpg',
        description: 'A comprehensive system for managing offshore development projects, including resource allocation, task tracking, and progress monitoring.',
        technologies: ['Java', 'Spring Boot', 'MySQL', 'Angular'], category: 'DEVELOPMENT', type: 'DEVELOPMENT'
      },
      {
        id: 2, title: 'JLPT Registration System', image: 'assets/images/development/jlpt.png',
        description: 'Online registration platform for Japanese Language Proficiency Test (JLPT), handling user registration, payment processing, and exam scheduling.',
        technologies: ['Java', 'Spring MVC', 'PostgreSQL', 'jQuery'], category: 'DEVELOPMENT', type: 'DEVELOPMENT'
      },
      {
        id: 3, title: 'KPI Management System', image: 'assets/images/development/KPI.jpg',
        description: 'Performance tracking system for managing and monitoring Key Performance Indicators across different departments.',
        technologies: ['Java', 'Spring Boot', 'MySQL', 'React'], category: 'DEVELOPMENT', type: 'DEVELOPMENT'
      },
      {
        id: 4, title: 'Smart Attendance System', image: 'assets/images/development/attendance.jpg',
        description: 'Automated attendance tracking system with facial recognition and real-time reporting capabilities.',
        technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'], category: 'DEVELOPMENT', type: 'DEVELOPMENT'
      },
      {
        id: 5, title: 'Smart Home Automation', image: 'assets/images/development/smarthome.jpg',
        description: 'IoT-based home automation system for controlling lights, temperature, and security devices through a mobile app.',
        technologies: ['Java', 'Arduino', 'Android SDK', 'Firebase'], category: 'DEVELOPMENT', type: 'DEVELOPMENT'
      },
      // Products
      {
        id: 1, title: 'Clima Smart Weather App', image: 'assets/images/product/clima.jpg',
        description: 'Developed a native Android weather application with Jetpack Compose, implementing custom Canvas animations and robust location-based services for real-time data fetching and display.',
        technologies: ['Kotlin', 'Jetpack Compose', 'Canvas', 'Retrofit'], category: 'PRODUCT', type: 'PRODUCT'
      },
      // Recognitions
      {
        id: 1, title: 'ITPEC (FE)', organization: 'Information Technology Professionals Examination Council, Japan', image: 'assets/images/recognitions/ITPEC_FE.jpg',
        description: 'Successfully passed the Fundamental Information Technology Engineer Examination, demonstrating proficiency in core IT concepts and practices.',
        date: '06/2023', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      {
        id: 2, title: 'Best System Development Award', organization: 'DIR-ACE Technology', image: 'assets/images/recognitions/president_jlpt.png',
        description: 'Awarded for outstanding performance and contribution in "JLPT REGISTRATION SYSTEM PROJECT", recognizing excellence in system development.',
        date: '09/2021', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      {
        id: 3, title: 'Quality Assurance Award', organization: 'DIR-ACE Technology', image: 'assets/images/recognitions/president_QC.png',
        description: 'For being exceptional and driven towards the company values in productivity and quality as a member of CstNavi team.',
        date: '09/2021', category: 'RECOGNITION', type: 'RECOGNITION'
      },
      // Books
      {
        id: 1, title: '48 Laws of Power', author: 'Robert Greene', image: 'assets/images/books/48_Laws.jpg',
        description: 'A comprehensive guide examining the laws of power, drawing from 3,000 years of history.',
        readDate: '2023', rating: 5, review: 'An insightful book that provides deep understanding of power dynamics in social and professional settings.',
        category: 'BOOKS', type: 'BOOK'
      },
      {
        id: 2, title: 'The Guy from Yangon', author: 'Khet Zaw', image: 'assets/images/books/Guy_From_Yng.jpg',
        description: 'A compelling narrative about life, culture, and experiences in Yangon, Myanmar.',
        readDate: '2023', rating: 4, review: 'A fascinating perspective on Myanmar culture and society, offering unique insights into life in Yangon.',
        category: 'BOOKS', type: 'BOOK'
      },
      {
        id: 3, title: 'Head First Java', author: 'Kathy Sierra, Bert Bates', image: 'assets/images/books/Head_first_Java.png',
        description: 'A brain-friendly guide to learning Java programming language fundamentals.',
        readDate: '2022', rating: 5, review: 'An excellent resource for learning Java, with its unique visual approach and practical examples.',
        category: 'BOOKS', type: 'BOOK'
      }
    ];
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