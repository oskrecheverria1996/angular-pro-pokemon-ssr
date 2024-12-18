import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44958075#overview
@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID); // https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44959113#content
  
  ngOnInit(): void {

    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page';
    // }

    // console.log({hola: 'mundo'})

    this.title.setTitle('Pricing page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,mundo,oscar,curso,angular,pro' });
  }

}
