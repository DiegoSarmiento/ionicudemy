import { Component } from '@angular/core';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public animales:Animal[] = [];
  public audio = new Audio;
  audioTiempo: any;

  constructor() {

    this.animales=ANIMALES.slice(0);

  }

  reproducir( animal:Animal){
    this.pausar_audio(animal);
    if (animal.reproduciendo) {
        animal.reproduciendo = false;
        return;
    }
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);

  }

   pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime=0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
    animalSel.reproduciendo=false;
  }

  borrar_animal(id:number){
    this.animales.splice(id,1);
    console.log("animales",this.animales);
    console.log("index",id);
  }

  recargar_animales(refresher:any){
    console.log("inicio del refresh");
    setTimeout(() => {
        console.log("termino el refresh");
        this.animales=ANIMALES.slice(0);
        refresher.target.complete();
    }, 1500);
  }
}
