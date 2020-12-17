import { Component, OnInit, Input } from '@angular/core';
import { NewsSearchData } from '../../data/news-search-data';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() newsSearch:NewsSearchData[];

  constructor() { }

  ngOnInit() {
  }

}
