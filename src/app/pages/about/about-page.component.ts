import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44958075#overview
@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  
  private title = inject(Title);
  private meta = inject(Meta);
  
  ngOnInit(): void {
    this.title.setTitle('About page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi About Page' });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,mundo,oscar,curso,angular,pro' });
  }
}
