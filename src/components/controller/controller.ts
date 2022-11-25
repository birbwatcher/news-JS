import AppLoader from './appLoader';
import { CallbackType } from './loader';

class AppController extends AppLoader {
    getSources(callback: CallbackType) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackType ){
        let target = e.target as HTMLInputElement;
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
