import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddComponent} from "./add-component/add-component.component";
import {EditComponent} from "./edit-component/edit-component.component";
import {ListComponent} from "./list-component/list-component.component";

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditComponent},
  {path: '**', redirectTo: '/list', pathMatch: 'full'},
  { path: '',   redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
