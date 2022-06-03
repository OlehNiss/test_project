import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../list-component/list-component.component";

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponent implements OnInit {
  editId: number = 0;
  formData: any;
  users: IUser[] = [];
  userPreviousData!: IUser;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.editId = parseInt(params['id']);
    });
    let data = localStorage.getItem('userData');
    if (data){
      this.users = JSON.parse(data)
      this.users.forEach((user: IUser, index: number) => {
        if(index === this.editId){
          this.userPreviousData = user
        }
      });
    }
    this.formData = new FormGroup({
      firstName: new FormControl(this.userPreviousData.firstName, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(this.userPreviousData.lastName, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.userPreviousData.email,
        [
          Validators.required, Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
        ]),
      phone: new FormControl(this.userPreviousData.phone,
        [
        Validators.required,  Validators.minLength(12),
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
        ])
    });
  }

  editUser(updatedUser: IUser){
    this.formData.markAllAsTouched();
    if(this.formData.valid){
      this.users = this.users.map((user: IUser, index: number)  => (index == this.editId ? updatedUser : user))
      localStorage.setItem('userData', JSON.stringify(this.users))
      this.router.navigate(['/list']);
    }
  }
}
