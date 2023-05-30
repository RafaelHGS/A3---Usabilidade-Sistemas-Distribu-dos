import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  private email : String = "";
  private username : String = "";
  private userId : Number = 0;

  public setEmail(email : String){
    this.email = email;
  }

  public getEmail(){
    return this.email;
  }

  
  public setUsername(username : String){
    this.username = username;
  }

  public getUsername(){
    return this.username;
  }

  public setUserId(userId : Number){
    this.userId = userId;
  }

  public getUserId(){
    return this.userId;
  }


  async setProfile() {
    try {
      const url = "http://localhost:8080/loggedUser/"+this.getEmail();
      const response = await axios.get(url);
      this.setUserId(response.data.id);
      this.setUsername(response.data.name);

    } catch (error : any) {

      const aux = error.response.data.message;
    }
  }

  getProfile() {
    try {
      const tempProfile: any[] = [
        this.getUsername(),
        this.getEmail()
      ];
      return tempProfile;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  }

}
