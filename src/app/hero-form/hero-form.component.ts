import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  @Input() hero!: Hero;

  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();

  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  constructor(private heroService: HeroService) { }

  onGoBack(): void {
    this.goBack.emit();
  }

  save(): void {
    if (this.hero.id) { 
      console.log(this.hero.id);
      console.log(this.hero);
      this.heroService.updateHero(this.hero).subscribe(() => this.heroSaved.emit());
    } else {
      console.log(this.hero.id);
      console.log(this.hero);
      this.heroService.addHero(this.hero).subscribe(()=> this.heroSaved.emit());
    }
  }

}
