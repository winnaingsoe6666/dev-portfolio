import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import emailjs from '@emailjs/browser';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly EMAIL_SERVICE_ID = 'service_r3r2j6f';
  private readonly EMAIL_TEMPLATE_ID = 'template_5vlz2iq';
  private readonly EMAIL_PUBLIC_KEY = 'UPrfe-jHsxxVLPkHu';

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.EMAIL_PUBLIC_KEY);
  }

  sendMessage(formData: ContactForm): Observable<any> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    return new Observable(observer => {
      emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        templateParams
      ).then(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
