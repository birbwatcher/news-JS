import AppLoader from './appLoader';
import { CallbackType } from './loader';

class AppController extends AppLoader {
    public getSources(callback: CallbackType) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallbackType) {
        const target = e.target as HTMLInputElement;
        const newsContainer = e.currentTarget as HTMLElement;
        const sourceId = target.value;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
                {
                    endpoint: 'everything',
                    options: {
                        sources: sourceId,
                    },
                },
                callback
            );
        }
        return;
    }
}

export default AppController;
