export class NewsData {
    title:string;
    abstract:string;
    byline:string;
    keywords:string[];
    section:string;
    subsection:string;
    nytdsection:string;
    publishDate:Date;
    updated:Date;
    imageURL:string;
	id:string;
    url:string;
    
    constructor(objectModel:{}) {
        this.url = objectModel['url'];
        this.id = objectModel['id'];

        this.publishDate = new Date(objectModel['published_date']);
        this.updated = new Date(objectModel['updated']);

        this.section = objectModel['section'];
        this.subsection = objectModel['subsection'];
        this.nytdsection = objectModel['nytdsection'];

        var key:string = objectModel['adx_keywords'];
        this.keywords = key.split(';');

        this.byline = objectModel['byline'];
        this.title = objectModel['title'];
        this.abstract = objectModel['abstract'];

        this.imageURL = objectModel['media']['media-metadata'][0]['url'];
    }
}