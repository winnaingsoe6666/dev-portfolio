import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class SidebarComponent implements OnInit {
  @ViewChild('profileImg') profileImgElement!: ElementRef;
  
  profileImage = 'assets/profile.png';
  public isSidebarOpen = false; // State for mobile toggle
  public activeSection = 'home';
  currentTheme = 'theme-day';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public themeService: ThemeService
  ) {
    // Register custom icons
    this.matIconRegistry.addSvgIcon('line', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/line.svg'));
    this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this.matIconRegistry.addSvgIcon('linkedin', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    this.matIconRegistry.addSvgIcon('gmail', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gmail.svg'));
  }

  ngOnInit() {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Order must match the DOM order in home.component.html
    const sections = ['home', 'about', 'resume', 'education', 'portfolio', 'contact'];
    let current = 'home';
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Trigger point 100px from top
        if (rect.top <= 100) {
          current = section;
        }
      }
    }
    this.activeSection = current;
  }

  scrollTo(sectionId: string): void {
    this.isSidebarOpen = false; // close mobile menu if open
    this.activeSection = sectionId;
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleImageError(event: any) {
    console.error('Image failed to load:', this.profileImage);
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