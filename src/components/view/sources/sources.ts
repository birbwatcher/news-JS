import './sources.css';
interface NewsSource {
    urlToImage: string;
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const sourceItemTempBlank: HTMLOptionElement = document.createElement('option');
        sourceItemTempBlank.disabled = true;
        sourceItemTempBlank.selected = true;
        sourceItemTempBlank.innerHTML = 'Choose the News Source:';
        data.forEach((item) => {
            const sourceClone: HTMLElement = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            const sourceItem: HTMLElement | null = sourceClone?.querySelector('.source__item-name');
            if (sourceItem !== null) {
                sourceItem.textContent = item.name;
            }
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
            sourceClone.querySelector('.source__item')?.setAttribute('value', item.id);

            fragment.append(sourceClone);
        });
        document.querySelector('.sources')?.append(sourceItemTempBlank);
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
export { NewsSource };
