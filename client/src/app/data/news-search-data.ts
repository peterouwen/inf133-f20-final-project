export class NewsSearchData {
    title:string;
    abstract:string;
    byline:string;
    keywords:string[];
    section:string;
    subsection:string;
    publishDate:Date;
    imageURL:string;
    url:string;
    
    constructor(objectModel:{}) {
        this.url = objectModel['web_url'];

        this.publishDate = new Date(objectModel['pub_date']);

        this.section = objectModel['section_name'];
        this.subsection = objectModel['subsection_name'];

        this.keywords = objectModel['keywords'].map((key) => {
            return key['value'];
        });

        this.byline = objectModel['byline']['original'];
        this.title = objectModel['headline']['print_headline'];
        this.abstract = objectModel['abstract'];

        var media = objectModel['multimedia'].filter((media) => {
            return media['subtype'] === 'videoSixteenByNine150';
        });
        this.imageURL = media[0]['url'];
    }

    get keywordString() {
        return this.keywords.join(', ');
    }

    get dateString() {
        return this.publishDate.toLocaleDateString();
    }
}