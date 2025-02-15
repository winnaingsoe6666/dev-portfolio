import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query('.info-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        await this.contactService.sendMessage(this.contactForm.value).toPromise();
        
        this.snackBar.open('Message sent successfully! Thank you for contacting me.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending message:', error);
        this.snackBar.open('Failed to send message. Please try again or contact directly via email.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}