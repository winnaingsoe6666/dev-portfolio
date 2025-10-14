import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  readDate: string;
  rating: number;
  review: string;
  category: 'IT' | 'NON-IT';
}

interface Recognition {
  id: number;
  title: string;
  organization: string;
  image: string;
  description: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface Development {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  category: string;
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
    MatDialogModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PortfolioComponent {
  constructor(private dialog: MatDialog) {}

  categories = ['ALL', 'DEVELOPMENT', 'PRODUCT', 'RECOGNITION', 'BOOKS'];
  selectedCategory = 'ALL';

  projects: Project[] = [
    // Add your projects here
  ];

  books: Book[] = [
    {
      id: 1,
      title: '48 Laws of Power',
      author: 'Robert Greene',
      image: 'assets/images/books/48_Laws.jpg',
      description: 'A comprehensive guide examining the laws of power, drawing from 3,000 years of history.',
      readDate: '2023',
      rating: 5,
      review: 'An insightful book that provides deep understanding of power dynamics in social and professional settings. The historical examples make complex concepts easily digestible.',
      category: 'NON-IT'
    },
    {
      id: 2,
      title: 'The Guy from Yangon',
      author: 'Khet Zaw',
      image: 'assets/images/books/Guy_From_Yng.jpg',
      description: 'A compelling narrative about life, culture, and experiences in Yangon, Myanmar.',
      readDate: '2023',
      rating: 4,
      review: 'A fascinating perspective on Myanmar culture and society, offering unique insights into life in Yangon.',
      category: 'NON-IT'
    },
    {
      id: 3,
      title: 'Head First Java',
      author: 'Kathy Sierra, Bert Bates',
      image: 'assets/images/books/Head_first_Java.png',
      description: 'A brain-friendly guide to learning Java programming language fundamentals.',
      readDate: '2022',
      rating: 5,
      review: 'An excellent resource for learning Java, with its unique visual approach and practical examples making complex concepts easier to understand.',
      category: 'IT'
    }
  ];

  products: any[] = [
    {
      id: 1,
      title: 'Clima Smart Weather App',
      image: 'assets/images/product/clima.jpg',
      description: 'Developed a native Android weather application with Jetpack Compose, implementing custom Canvas animations and robust location-based services for real-time data fetching and display.',
      technologies: ['kotlin', 'Jetpack Compose', 'Canvas', 'Retrofit' ],
      category: 'product'
    }
  ];

  recognitions: Recognition[] = [
    {
      id: 1,
      title: 'ITPEC (FE)',
      organization: 'Information Technology Professionals Examination Council, Japan',
      image: 'assets/images/recognitions/ITPEC_FE.jpg',
      description: 'Successfully passed the Fundamental Information Technology Engineer Examination, demonstrating proficiency in core IT concepts and practices.',
      date: '06/2023',
    },
    {
      id: 2,
      title: 'Best System Development Award',
      organization: 'DIR-ACE Technology',
      image: 'assets/images/recognitions/president_jlpt.png',
      description: 'Awarded for outstanding performance and contribution in "JLPT REGISTRATION SYSTEM PROJECT", recognizing excellence in system development.',
      date: '09/2021',
    },
    {
      id: 3,
      title: 'Quality Assurance Award',
      organization: 'DIR-ACE Technology',
      image: 'assets/images/recognitions/president_QC.png',
      description: 'For being exceptional and driven towards the company values in productivity and quality as a member of CstNavi team.',
      date: '09/2021',
    },
    {
      id: 4,
      title: 'Offshore Technology Certificate',
      organization: 'DIR-ACE Technology',
      image: 'assets/images/recognitions/offshore_tech.jpg',
      description: 'Completed comprehensive training in offshore technology development practices and methodologies.',
      date: '03/2023'
    }
  ];

  developments: Development[] = [
    {
      id: 1,
      title: 'Offshore Development System',
      image: 'assets/images/development/offshore.jpg',
      description: 'A comprehensive system for managing offshore development projects, including resource allocation, task tracking, and progress monitoring.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
      category: 'DEVELOPMENT'
    },
    {
      id: 2,
      title: 'JLPT Registration System',
      image: 'assets/images/development/jlpt.png',
      description: 'Online registration platform for Japanese Language Proficiency Test (JLPT), handling user registration, payment processing, and exam scheduling.',
      technologies: ['Java', 'Spring MVC', 'PostgreSQL', 'jQuery'],
      category: 'DEVELOPMENT'
    },
    {
      id: 3,
      title: 'KPI Management System',
      image: 'assets/images/development/KPI.jpg',
      description: 'Performance tracking system for managing and monitoring Key Performance Indicators across different departments.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
      category: 'DEVELOPMENT'
    },
    {
      id: 4,
      title: 'Smart Attendance System',
      image: 'assets/images/development/attendance.jpg',
      description: 'Automated attendance tracking system with facial recognition and real-time reporting capabilities.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
      category: 'DEVELOPMENT'
    },
    {
      id: 5,
      title: 'Smart Home Automation',
      image: 'assets/images/development/smarthome.jpg',
      description: 'IoT-based home automation system for controlling lights, temperature, and security devices through a mobile app.',
      technologies: ['Java', 'Arduino', 'Android SDK', 'Firebase'],
      category: 'DEVELOPMENT'
    }
  ];

  get filteredProjects() {
    return this.selectedCategory === 'ALL' 
      ? this.projects 
      : this.projects.filter(p => p.category === this.selectedCategory);
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  get itBooks() {
    return this.books.filter(book => book.category === 'IT');
  }

  get nonItBooks() {
    return this.books.filter(book => book.category === 'NON-IT');
  }

  get allBooks() {
    return this.books.filter(book => book.category === 'NON-IT' || book.category === 'IT');
  }

  get filteredItems() {
    if (this.selectedCategory === 'ALL') {
      return [
        ...this.developments.map(item => ({ ...item, type: 'development' })),
        ...this.recognitions.map(item => ({ ...item, type: 'recognition' })),
        ...this.books.map(item => ({ ...item, type: 'book' }))
      ];
    }
    if (this.selectedCategory === 'RECOGNITION') {
      return this.recognitions.map(item => ({ ...item, type: 'recognition' }));
    }
    if (this.selectedCategory === 'BOOKS') {
      return this.books.map(item => ({ ...item, type: 'book' }));
    }
    if (this.selectedCategory === 'DEVELOPMENT') {
      return this.developments.map(item => ({ ...item, type: 'development' }));
    }
    // if (this.selectedCategory === 'PRODUCT') {
    //   return []; // Return an empty array or appropriate value for 'PRODUCT' category
    // }
    return [
      ...this.developments.map(item => ({ ...item, type: 'development' })),
      ...this.recognitions.map(item => ({ ...item, type: 'recognition' })),
      ...this.books.map(item => ({ ...item, type: 'book' }))
    ];
  }

  openImageViewer(image: string, title: string) {
    this.dialog.open(ImageViewerComponent, {
      data: { image, title },
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'image-viewer-dialog'
    });
  }
}