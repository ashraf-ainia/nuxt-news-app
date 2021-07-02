import { UUID } from '../helpers/functions';
export default class Artical {
    id;
    title;
    description;
    source;
    imageUrl;
    originalArticleUrl;
    author;
    publishedAt;

    constructor(data) {
        if (!data) {
            data = {};
        }
        this.id = UUID();
        this.title = data.title;
        this.description = data.description;
        this.source = data.source;
        this.imageUrl = data.urlToImage;
        this.originalArticleUrl = data.url;
        this.author = data.author;
        this.publishedAt = data.publishedAt;
    }
};