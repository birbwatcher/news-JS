import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import News from '../view/news/news';
import { DrawData } from '../view/appView';

interface Myresponse {
    articles: News[];
    status: String;
    totalResults: Number;
}

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data: DrawData) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
