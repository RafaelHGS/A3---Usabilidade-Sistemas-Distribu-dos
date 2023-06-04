import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
    //Captura de Perfil
    this.profileService.getProfile();
  }

}
