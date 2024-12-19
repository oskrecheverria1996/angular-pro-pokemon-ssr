
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
    { id: '1', name: 'bulbasur' },
    { id: '2', name: 'ivysaur' },
];

// https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/45023119#content
describe('PokemonListComponent', () => {
  
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [ provideRouter([]) ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', [])
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons)
    fixture.detectChanges();

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemons.length);
  });
  
  it('should render "Aqui no hay pokemons"', () => {
    fixture.componentRef.setInput('pokemons', [])
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent).toContain('Aqui no hay pokemons');
  });

});