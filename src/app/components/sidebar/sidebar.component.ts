import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        query('.profile-section, .nav-item, .social-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @ViewChild('profileImg') profileImgElement!: ElementRef;
  
  // Corrected path - removed 'src/'
  profileImage = 'assets/profile.png';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register custom icons
    this.matIconRegistry.addSvgIcon(
      'line',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/line.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gmail',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gmail.svg')
    );
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }

  handleImageError(event: any) {
    console.error('Image failed to load:', this.profileImage);
    const img = event.target;
    img.style.backgroundColor = '#008080';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    
    // Make the initials container look better
    const parent = img.parentElement;
    if (!parent.querySelector('.initials')) {
      const initialsContainer = document.createElement('div');
      initialsContainer.className = 'initials';
      initialsContainer.style.position = 'absolute';
      initialsContainer.style.top = '50%';
      initialsContainer.style.left = '50%';
      initialsContainer.style.transform = 'translate(-50%, -50%)';
      initialsContainer.style.display = 'flex';
      initialsContainer.style.flexDirection = 'column';
      initialsContainer.style.alignItems = 'center';
      initialsContainer.style.justifyContent = 'center';
      initialsContainer.style.width = '100%';
      initialsContainer.style.height = '100%';
      initialsContainer.style.borderRadius = '50%';
      initialsContainer.style.backgroundColor = '#008080';
      
      const initials = document.createElement('span');
      initials.textContent = 'WNS';
      initials.style.color = 'white';
      initials.style.fontSize = '2.5rem';
      initials.style.fontWeight = 'bold';
      initials.style.letterSpacing = '1px';
      
      initialsContainer.appendChild(initials);
      parent.appendChild(initialsContainer);
    }
  }
}