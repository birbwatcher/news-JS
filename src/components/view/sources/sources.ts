import './sources.css';
interface NewsSource  {
    urlToImage: string;
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;}


class Sources {
    draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: HTMLElement = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            const sourceItem: HTMLElement | null = sourceClone?.querySelector('.source__item-name');
            sourceItem!.textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
export {NewsSource};
