/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  private tokenInfo : any;

  constructor(private router: Router,
    private token: TokenStorageService) { }

  ngOnInit() {

    this.tokenInfo = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    console.log(this.tokenInfo);

  }

  goHome() {

    if(this.tokenInfo.authorities.includes("ROLE_ADMIN") || this.tokenInfo.authorities.includes("ROLE_MODERATOR"))
    {
      this.router.navigate(['/admin']);
    }
    else
    {
      this.router.navigate(['/home']);
    }

  }

}
