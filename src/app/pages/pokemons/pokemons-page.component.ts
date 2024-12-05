import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title)
  
  // min 3:00 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44962581#content
  public currentPage = toSignal<number>(
    // this.route.queryParamMap.pipe(
    //   map(params => params.get('page') ?? '1'),
    //   map(page => (isNaN(+page) ? 1 : +page)),
    //   map(page => Math.max(1, page))
    // )
  // min 2:00 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44979841#content
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  );

  // min 6:00 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44979841#content
  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  })

  // public isLoading = signal(true);

  // https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44961969#content 
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // });


  // No se necesita ngOninit ==> Min: 5:50 https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/44979841#content
  // ngOnInit(): void {
  //   // this.route.queryParamMap.subscribe(console.log);
  //   this.loadPokemons();
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);
  // }

  public loadPokemons(page = 0) {

    this.pokemonsService.loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
      )
      .subscribe(pokemons => {
          this.pokemons.set(pokemons);
      })
  }

  ngOnDestroy(): void {
    // console.log('destroy')
    // this.$appState.unsubscribe();
  }

}
