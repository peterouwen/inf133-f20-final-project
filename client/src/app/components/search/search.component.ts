import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { NewsSearchData } from '../../data/news-search-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'relevance';
  searchCategories:string[] = ['relevance', 'newest', 'oldest'];
  page:number = 0;
  @Input() resources:NewsSearchData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.searchCategory, this.searchString, this.page).then((data) => {
      console.log(data);
      this.resources = data;
      console.log(this.resources);
    })
  }

  previousPage() {
    this.page = this.page + 1;
    this.search();
  }

  nextPage() {
    this.page = this.page - 1;
    this.search();
  }

}
