// src/plugins/NestedContainer.ts
import {BlockTool} from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';

import Header from "editorjs-header-with-alignment";
import Paragraph from 'editorjs-paragraph-with-alignment';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageWithRadius from "@/plugins/ImageWithRaduis";

interface NestedContainerData {
    blocks: any[];
}

export default class NestedContainer implements BlockTool {
    private api: any;
    private readOnly: boolean;
    private blockId: string;
    private holderId: string;
    private cachedData: any[] = [];
    private nestedEditor: EditorJS | null = null;

    static get isReadOnlySupported() {
        return true;
    }

    static get toolbox() {
        return {
            title: 'Nested Container',
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/></svg>',
        };
    }

    constructor({data, api, readOnly, block}: { data?: NestedContainerData; api: any; readOnly: boolean; block: any }) {
        this.api = api;
        this.readOnly = readOnly;
        this.blockId = block.id;
        this.holderId = `nested-${this.blockId}`;

        // Если данных нет — добавляем заглушку
        this.cachedData = data?.blocks || [
            {
                type: 'paragraph',
                data: {
                    text: 'Начните вводить текст или добавьте блоки...',
                },
            },
        ];
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add('custom-gray-container');
        wrapper.style.padding = '16px';
        wrapper.style.margin = '16px 0';
        wrapper.style.backgroundColor = '#f5f5f5';
        wrapper.style.borderRadius = '8px';
        wrapper.style.border = '1px solid #e0e0e0';


        const holder = document.createElement('div');
        holder.id = this.holderId;
        holder.style.minHeight = '60px';
        wrapper.appendChild(holder);

        this.initNestedEditor(holder);

        return wrapper;
    }

    private initNestedEditor(holder: HTMLElement) {
        if (this.nestedEditor) return;

        // ⚠️ Важно: используйте ТОЛЬКО необходимые инструменты, чтобы избежать конфликтов
        const tools = {
            header: Header,
            paragraphAligment: Paragraph,
            list: List,
            quote: Quote,
            image: ImageWithRadius,
            // Добавьте другие по необходимости, но не дублируйте!
        };

        this.nestedEditor = new EditorJS({
            holder: holder,
            tools: tools,
            data: {blocks: this.cachedData},
            readOnly: this.readOnly,
            onChange: async () => {
                const saved = await this.nestedEditor?.save();
                this.cachedData = saved?.blocks || [];
                // Триггерим обновление родителя (опционально)
                // В реальности — при сохранении родителя данные возьмутся из cachedData
            }
        });
    }

    save(): NestedContainerData {
        // СИНХРОННО возвращаем кэш
        return {
            blocks: this.cachedData
        };
    }

    validate(savedData: NestedContainerData): boolean {
        // Защита от undefined
        return Array.isArray(savedData?.blocks) && savedData.blocks.length > 0;
    }

    destroy() {
        if (this.nestedEditor) {
            this.nestedEditor.destroy();
            this.nestedEditor = null;
        }
    }
}