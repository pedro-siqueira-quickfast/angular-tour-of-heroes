import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  heroForm!: FormGroup;

  @Input() hero!: Hero;

  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      id: [this.hero.id],
      name: [this.hero.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [this.hero.description, [Validators.minLength(3)]],
      imageUrl: [this.hero.imageUrl, [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]],
      universe: [this.hero.universe, [Validators.required]]
    })
  }

  onGoBack(): void {
    this.goBack.emit();
  }

  save(): void {
    let hero: Hero = this.heroForm.value;
    if (hero.id) { 
      this.heroService.updateHero(hero).subscribe(() => this.heroSaved.emit());
    } else {
      this.heroService.addHero(hero).subscribe(()=> this.heroSaved.emit());
    }
  }
}
