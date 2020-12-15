import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    return this.http.get(this.expressBaseUrl+endpoint).toPromise();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  //artist:ArtistData = null;

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    return this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`)
        .then((data) => {
          console.log(data[category+'s']["items"]);
          if (category === 'artist') {
            return data["artists"]["items"].map(function(item) {
              return new ArtistData(item);
            })
          }

          if (category === 'album') {
            return data["albums"]["items"].map(function(item) {
              return new AlbumData(item);
            })
          }

          if (category === 'track') {
            return data["tracks"]["items"].map(function(item) {
              return new TrackData(item);
            })
          }
        });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress(`/artist-related-artists/${encodeURIComponent(artistId)}`).then((data) => {
      //console.log(data);
      return data["artists"].map(function(item) {
        return new ArtistData(item);
      });
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${encodeURIComponent(artistId)}`).then((data) => {
      //console.log(data);
      return data["tracks"].map(function(item) {
        return new TrackData(item);
      });
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${encodeURIComponent(artistId)}`).then((data) => {
      //console.log(data);
      return data["items"].map(function(item) {
        return new AlbumData(item);
      });
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${encodeURIComponent(albumId)}`).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${encodeURIComponent(albumId)}`).then((data) => {
      console.log(data);
      return data["items"].map(function(item) {
        return new TrackData(item);
      });
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${encodeURIComponent(trackId)}`).then((data) => {
      //console.log(data);
      return TrackFeature.FeatureTypes.map(function(item) {
        return new TrackFeature(item, data[item]);
      });
    });
  }
}
