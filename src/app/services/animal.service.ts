import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Animal } from "../models/animal.model";
import { UtilsService } from "./utils.service";


@Injectable({
    providedIn: 'root'
})
export class AnimalService {
    constructor(private http: HttpClient, private utilsService: UtilsService){}

    getAnimals() {
        return this.http.get<Animal[]>(this.utilsService.getEndPoint().apiUrl + 'animal/list');
    }

    deleteAnimal(id: number) {
        return this.http.delete(this.utilsService.getEndPoint().apiUrl + 'animal/delete/' + id);
    }

    updateAnimal(id: number, animal: Animal) {
        return this.http.put(this.utilsService.getEndPoint().apiUrl + 'animal/update/' + id, animal);
    }

    addAnimal(animal: Animal) {
        return this.http.post(this.utilsService.getEndPoint().apiUrl + 'animal/add', animal);
    }

}