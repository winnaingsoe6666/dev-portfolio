import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        query('.anim-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements AfterViewInit {
  // Use @ViewChild to get a reference to the <canvas> element in the HTML
  @ViewChild('skillsChartCanvas') skillsChartCanvas!: ElementRef;
  
  skillsChart: any;
  activeCategory: string = 'All';

  // Data for the skills dashboard, taken from your reference file
  skillsData = {
    all: [
      { name: 'Java', level: 95, category: 'Backend' },
      { name: 'Spring Boot', level: 90, category: 'Backend' },
      { name: 'REST API', level: 85, category: 'Backend' },
      { name: 'Spring Security', level: 80, category: 'Backend' },
      { name: 'Shell Script', level: 70, category: 'Backend' },
      { name: 'JSP', level: 65, category: 'Backend' },
      { name: 'Angular', level: 80, category: 'Frontend' },
      { name: 'HTML/CSS', level: 75, category: 'Frontend' },
      { name: 'Bootstrap', level: 70, category: 'Frontend' },
      { name: 'jQuery', level: 60, category: 'Frontend' },
      { name: 'MySQL', level: 85, category: 'Database' },
      { name: 'Oracle SQL', level: 80, category: 'Database' },
      { name: 'Docker', level: 75, category: 'Tools & DevOps' },
      { name: 'Git', level: 88, category: 'Tools & DevOps' },
      { name: 'Gradle', level: 70, category: 'Tools & DevOps' },
      { name: 'Selenium', level: 65, category: 'Tools & DevOps' },
      { name: 'SVN', level: 60, category: 'Tools & DevOps' }
    ],
    categories: ['All', 'Backend', 'Frontend', 'Database', 'Tools & DevOps']
  };

  constructor() { }

  // Use ngAfterViewInit to ensure the canvas element is available in the DOM
  ngAfterViewInit(): void {
    this.createChart();
    this.filterSkills('All'); // Initialize with all skills shown
  }

  createChart(): void {
    const context = this.skillsChartCanvas.nativeElement.getContext('2d');
    this.skillsChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: [], // Initial empty labels
        datasets: [{
          label: 'Proficiency Level',
          data: [], // Initial empty data
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // This makes it a horizontal bar chart
        scales: {
          x: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            display: false // We don't need the legend
          }
        }
      }
    });
  }

  filterSkills(category: string): void {
    this.activeCategory = category;
    let filteredSkills;

    if (category === 'All') {
      filteredSkills = this.skillsData.all;
    } else {
      filteredSkills = this.skillsData.all.filter(s => s.category === category);
    }

    // Update the chart's data and refresh it
    this.skillsChart.data.labels = filteredSkills.map(s => s.name);
    this.skillsChart.data.datasets[0].data = filteredSkills.map(s => s.level);
    this.skillsChart.update();
  }
}