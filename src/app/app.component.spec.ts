import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  // min 0:50 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/45022560?start=15#content
  @Component({
    selector: 'app-navbar',
    standalone: true,
  })
  class NavbarComponentMock {}
   
  beforeEach(async () => {

    // Min 5:30
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })

    // !Recomendado
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [
    //     provideRouter([])
    //   ]
    // }).overrideComponent( AppComponent, {  // min 2:50 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/45022560?start=15#content
    //   add: {
    //     imports: [ NavbarComponentMock ]
    //   },
    //   remove: {
    //     imports: [ NavbarComponent ]
    //   }
    // })
    // .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
