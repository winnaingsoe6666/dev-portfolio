import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="image-viewer">
      <img [src]="data.image" [alt]="data.title">
    </div>
  `,
  styles: [`
    .image-viewer {
      padding: 20px;
      text-align: center;
      
      img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
      }
    }
  `]
})
export class ImageViewerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string; title: string }) {}
}
