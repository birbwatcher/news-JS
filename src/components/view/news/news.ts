import './news.css';
import { NewsSource } from '../sources/sources';

interface News extends NewsSource {
    author: string;
    source: {name: string};
    publishedAt: string;
    title: string;
}

class News {
    draw(data: News[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                if (newsClone.querySelector('.news__item')) {
                    newsClone.querySelector('.news__item')!.classList.add('alt');
                }
            }

            const itemImage = <HTMLElement>newsClone.querySelector('.news__meta-photo');
            itemImage!.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const itemAuthor = <HTMLElement>newsClone.querySelector('.news__meta-author');
            itemAuthor!.textContent = item.author || item.source.name;

            const itemPublishedDate = <HTMLElement>newsClone.querySelector('.news__meta-date');
            itemPublishedDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            const itemTitle = <HTMLElement>newsClone.querySelector('.news__description-title');
            itemTitle.textContent = item.title;
            const itemSourceName = <HTMLElement>newsClone.querySelector('.news__description-source');
            itemSourceName.textContent = item.source.name;
            const itemDescription = <HTMLElement>newsClone.querySelector('.news__description-content');
            itemDescription.textContent = item.description;
            const itemUrl = <HTMLAnchorElement>newsClone.querySelector('.news__read-more a');
            itemUrl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = <HTMLElement>document.querySelector('.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
