import News from './news/news';
import Sources from './sources/sources';
import { NewsSource } from './sources/sources';

interface DrawData {
    readonly sources: NewsSource[];
    readonly articles: News[];
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DrawData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DrawData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
export { DrawData };
