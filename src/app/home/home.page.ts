import { Component } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal.model';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animals: Animal[] = [];

  animalToModify!: Animal;

  animalAddForm: FormGroup;
  animalModifyForm: FormGroup;

  showModalAdd: boolean = false;
  showModalModify: boolean = false;
  
  constructor(private animalService: AnimalService, private formBuilder: FormBuilder) {
    this.animalAddForm = this.formBuilder.group({
      type: ['', Validators.required],
      poids: [0, Validators.required],
      bruit: ['', Validators.required],
    });

    this.animalModifyForm = this.formBuilder.group({
      type: ['', Validators.required],
      poids: [0, Validators.required],
      bruit: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listAnimals();
  }

  listAnimals() {
    this.animalService.getAnimals().subscribe(
      (data) => {
        this.animals = data;
        console.log(this.animals);
      
      },
      (error) => {
        console.log(error);
      }
    );
    }

  deleteAnimal(id: number) {
    this.animalService.deleteAnimal(id).subscribe(
      (data) => {
        console.log("data", data);
        this.listAnimals();
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  updateAnimal(id: number) {
    this.animalService.updateAnimal(id, this.animalModifyForm.value).subscribe(
      (data) => {
        console.log(data);
        this.animalModifyForm.reset();
        this.toggleModalModify(id);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addAnimal() {
    console.log(this.animalAddForm.value);
    this.animalService.addAnimal(this.animalAddForm.value).subscribe(
      (data) => {
        console.log(data);
        this.animalAddForm.reset();
        this.toggleModalAdd();
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleModalAdd() {
    this.showModalAdd = !this.showModalAdd;
  }

  toggleModalModify(id: number) {
    if(!this.showModalModify) {
      this.animalToModify = this.animals.find((animal) => animal.id === id)!;
      this.setFormModify();
      this.showModalModify = true;
    } else {
      this.showModalModify = false;
    }
  }

  closeModalModify() {
    this.showModalModify = false;
  }

  setFormModify() {
    this.animalModifyForm.setValue({
      type: this.animalToModify.type,
      poids: this.animalToModify.poids,
      bruit: this.animalToModify.bruit,
    });
  }
}
