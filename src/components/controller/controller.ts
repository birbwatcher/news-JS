import AppLoader from './appLoader';
import { DrawData } from '../view/appView';
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

    getNews(e: Event, callback ){
        let target = e.target as HTMLInputElement;
        // console.log(target.value)
        // console.log(target.classList)
        const newsContainer = e.currentTarget as HTMLElement;
        // while (target !== newsContainer) {
        //     if (target.classList.contains('source__item')) {
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
            // }
            target = target.parentNode as HTMLInputElement;
        // }
    }
}

export default AppController;
