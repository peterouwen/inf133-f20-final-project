import { Component, OnInit, Input } from '@angular/core';
import { NewsSearchData } from '../../data/news-search-data';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	@Input() news:NewsSearchData;

  constructor() { }

  ngOnInit() {
  }

}
