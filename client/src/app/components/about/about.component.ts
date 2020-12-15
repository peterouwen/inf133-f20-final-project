import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/data/profile-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }

  info:ProfileData = null;

  ngOnInit() {
    this.spotifyService.aboutMe().then((data) => {
      console.log(data);
      this.info = data;
    });
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  onClick(){
    this.name = this.info["name"];
    this.profile_pic = this.info["imageURL"];
    this.profile_link = this.info["spotifyProfile"];
  }

}
