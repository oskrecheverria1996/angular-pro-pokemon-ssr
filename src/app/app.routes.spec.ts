import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

// https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/45022758#content
describe('App routes', () => {

    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter( routes )
            ]
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

    });

    it('should navigate to "about" rediects to "/about"', async() => {
        await router.navigate(['about']);

        expect(location.path()).toBe('/about');
    });

    it('should navigate to "pokemons/page/1" rediects to "/pokemons/page/1"', async() => {
        await router.navigate(['pokemons/page/1']);

        expect(location.path()).toBe('/pokemons/page/1');
    });

    it('should navigate to "unknown-page" rediects to "/about"', async() => {
        await router.navigate(['unknown-page']);

        expect(location.path()).toBe('/about');
    });

    // https://www.udemy.com/course/angular-pro-siguiente-nivel/learn/lecture/45022944#content
    it('should load the proper component', async() => {
        const aboutRoute = routes.find((route) => route.path === 'about')!;
        expect(aboutRoute).toBeDefined();
        const aboutComponent = await aboutRoute.loadComponent!() as any;
        expect( aboutComponent.default.name ).toBe('AboutPageComponent');

        
        const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
        expect(pokemonPageRoute).toBeDefined();
        const pokemonPage = await pokemonPageRoute.loadComponent!() as any;
        expect( pokemonPage.default.name ).toBe('PokemonsPageComponent');
    })
});