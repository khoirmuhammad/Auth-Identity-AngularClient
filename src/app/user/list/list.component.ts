import { Component, OnInit } from '@angular/core';
import { IUserList } from 'src/app/interfaces/IUserList';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res: IUserList) => {
        debugger;
        this.users = res.data;
      }
    })
  }

}
