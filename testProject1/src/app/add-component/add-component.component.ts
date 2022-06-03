import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../list-component/list-component.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponent implements OnInit {
  formData: any;
  users: IUser[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{2})([-\s\.]?[0-9]{3})')])
    });
  }
  addNewUser(newUser: IUser){
    this.formData.markAllAsTouched();
    if(this.formData.valid){
      const localData = localStorage.getItem('userData')
      if(localData){
        this.users = JSON.parse(localData);
      }else{
        this.users = []
      }
      this.users.push(newUser)
      localStorage.setItem('userData', JSON.stringify(this.users))
      this.router.navigate(['/list']);
    }
  }
}
