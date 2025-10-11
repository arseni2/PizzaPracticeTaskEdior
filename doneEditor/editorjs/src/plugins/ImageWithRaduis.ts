// src/plugins/ImageWithRadius.ts
import {BlockTool} from '@editorjs/editorjs';

export default class ImageWithRadius implements BlockTool {
    private data: any;

    constructor({data}: { data: any }) {
        this.data = data;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'cdx-block';

        const container = document.createElement('div');
        container.className = 'image-tool';

        const img = document.createElement('img');
        img.src = this.data.file?.url || '';
        img.alt = this.data.caption || '';

        // ✅ Применяем border-radius, если он есть в данных
        if (this.data.file?.borderRadius !== undefined) {
            img.style.borderRadius = `${this.data.file.borderRadius}px`;
        }

        container.appendChild(img);
        wrapper.appendChild(container);

        if (this.data.caption) {
            const caption = document.createElement('div');
            caption.className = 'image-tool__caption';
            caption.textContent = this.data.caption;
            wrapper.appendChild(caption);
        }

        return wrapper;
    }

    save() {
        return this.data;
    }

    static get isReadOnlySupported() {
        return true;
    }
}