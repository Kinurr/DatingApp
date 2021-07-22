import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit()  {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser()  {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser === 'string') {
      const user: User = JSON.parse(storedUser);
      this.accountService.setCurrentUser(user);
    }
  }

  getUsers()  {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
