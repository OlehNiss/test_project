import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

export interface IUser{
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position','firstName', 'lastName', 'email', 'phone', 'edit', 'delete'];
  users: IUser[] = []
  dataSource: MatTableDataSource<IUser>;

  constructor(private router: Router) {
    let data = localStorage.getItem('userData');
    if (data){
      this.users = JSON.parse(data)
    }else{
      this.users = []
    }
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {}

  editUser(id: number){
    this.router.navigate(['/edit', {id:id}]);
  }

  deleteUser(id: number){
    let data = localStorage.getItem('userData');
    if (data){
      this.dataSource.data = JSON.parse(data)
    }
    this.dataSource.data = this.dataSource.data.filter((user, index) => {
      return index != id
    });
    localStorage.setItem('userData', JSON.stringify(this.dataSource.data));
  }
}
