'use client';

import {useEffect, useRef, useState} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from "editorjs-header-with-alignment";
// import * as Layout from 'editorjs-layout';
// import ColorPlugin from 'editorjs-text-color-plugin';
// import TextStyleTool from "@skchawala/editorjs-text-style";
import EditorjsList from '@editorjs/list';
import editorjsColumns from '@calumk/editorjs-Columns';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Quote from '@editorjs/quote';
import TextStyleTool from "@skchawala/editorjs-text-style";
// import Alert from 'editorjs-alert';
// import ToggleBlock from 'editorjs-toggle-block';
import Title from "title-editorjs";
import ImageTool from '@editorjs/image';
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';
import LinkTool from '@editorjs/link';
import AttachesTool from '@editorjs/attaches';
import GroupImage from "@cychann/editorjs-group-image";
import RawTool from '@editorjs/raw';
import anyButton from 'editorjs-button';
import Accordion from 'editorjs-collapsible-block';
import {Result} from "@/app/Result";
import NestedContainer from "@/plugins/Container";

export const tools = (editorInstance: any) => ({
    accordion: {
        class: Accordion,
    },
    header: Header,
    paragraphAligment: Paragraph,
    title: Title,
    AnyButton: {
        class: anyButton,
    },
    raw: RawTool,
    groupImage: {
        class: GroupImage,
    },
    nestedContainer: {
        class: NestedContainer,
        inlineToolbar: true,
    },
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: 'http://localhost:8008/fetchUrl',
        }
    },
    nestedchecklist: editorjsNestedChecklist,
    image: {
        class: ImageTool,
        config: {
            actions: [
                {
                    name: 'borderRadius',
                    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/><path d="M8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12Z" fill="currentColor"/></svg>',
                    title: 'Set Border Radius (px)',
                    toggle: false,
                    action: () => {
                        const editor = editorInstance.current;
                        if (!editor) return;

                        const blockIndex = editor.blocks.getCurrentBlockIndex();
                        if (blockIndex < 0) return;

                        const block = editor.blocks.getBlockByIndex(blockIndex);
                        if (!block || block.name !== 'image') return;

                        // ✅ Сохраняем ID и данные ДО prompt
                        const blockId = block.id;
                        const currentRadius = block.holder.querySelector('img')?.style.borderRadius || '0px';
                        const currentNum = parseInt(currentRadius, 10) || 0;

                        const value = prompt('Enter border radius in pixels (e.g. 10):', String(currentNum));
                        if (value === null || isNaN(Number(value))) return;

                        const radius = Math.max(0, Math.min(100, Number(value)));

                        // ✅ Получаем данные блока по ID (а не по индексу!)
                        editor.saver.save().then((savedData) => {
                            // Найдём блок по ID в сохранённых данных
                            const blockData = savedData.blocks.find(b => b.id === blockId);
                            if (!blockData || blockData.type !== 'image') return;
                            // ✅ Сохраняем в правильное место: file.borderRadius
                            blockData.data.file = blockData.data.file || {};
                            blockData.data.file.borderRadius = radius;

                            // ✅ Обновляем по ID, а не по индексу
                            editor.blocks.update(blockId, blockData.data).then(() => {
                                // Применяем стиль вручную к DOM
                                const img = block.holder.querySelector('img');
                                if (img) {
                                    img.style.borderRadius = `${radius}px`;
                                }
                            }).catch(err => {
                                console.error('Failed to update block:', err);
                            });
                        });
                    }
                }
            ],
            uploader: {
                async uploadByFile(file: any) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e: any) => {
                            resolve({
                                success: 1,
                                file: {
                                    url: e.target.result, // Base64 encoded image
                                },
                            });
                        };
                        reader.readAsDataURL(file);
                    });
                },

                async uploadByUrl(url: any) {
                    // You might need to fetch the image and convert it to Base64 or handle it differently
                    // For simplicity, this example just returns the URL directly
                    return {
                        success: 1,
                        file: {
                            url: url,
                        },
                    };
                },

            }
        }
    },
    attaches: {
        class: AttachesTool,
        config: {
            endpoint: 'http://localhost:8008/uploadFile'
        }
    },
    List: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
        },
    },
    columns: {
        class: editorjsColumns,
        config: {
            EditorJsLibrary: EditorJS, // Pass the library instance to the columns instance.
            //tools : {} // IMPORTANT! ref the column_tools
        }
    },
    textStyle: {
        class: TextStyleTool,
        config: {
            fontSizeEnabled: true,
            fontFamilyEnabled: true,
            fontSizes: [
                {label: "12px", value: "12px"},
                {label: "14px", value: "14px"},
                {label: "16px", value: "16px"},
                {label: "18px", value: "18px"},
                {label: "20px", value: "20px"},
            ],
            fontFamilies: [
                {label: "Arial", value: "Arial"},
                {label: "Georgia", value: "Georgia"},
                {label: "Courier New", value: "Courier New"},
                {label: "Verdana", value: "Verdana"},
            ],
            textAlign: [
                {label: "center", value: "center"},
            ],
            defaultFontSize: "20px",
            defaultFontFamily: "Verdana",
        }
    }
    // layout: {
    //     class: Layout.LayoutBlockTool,
    //     config: {
    //         EditorJS,
    //         editorJSConfig: {
    //             tools: {
    //                 quote: {
    //                     class: Quote,
    //                     inlineToolbar: true,
    //                     shortcut: 'CMD+SHIFT+O',
    //                     config: {
    //                         quotePlaceholder: 'Enter a quote',
    //                         captionPlaceholder: "Quote's author",
    //                     },
    //                 },
    //             }
    //         },
    //         enableLayoutEditing: false,
    //         enableLayoutSaving: true,
    //         initialData: {
    //             itemContent: {
    //                 1: {
    //                     blocks: [],
    //                 },
    //             },
    //             layout: {
    //                 type: "container",
    //                 id: "",
    //                 className: "",
    //                 style: "border: 1px solid #000000; ",
    //                 children: [
    //                     {
    //                         type: "item",
    //                         id: "",
    //                         className: "",
    //                         style: "border: 1px solid #000000; display: inline-block; ",
    //                         itemContentId: "1",
    //                     },
    //                 ],
    //             },
    //         },
    //     },
    // },
})

export const Editor = () => {
    const editorRef = useRef(null);
    const editorInstance = useRef<EditorJS | null>(null);
    const [data, setData] = useState<any>();
    const savedDataRef = useRef<any>(null);
    const [resultData, setResultData] = useState<any>(null);

    useEffect(() => {
        if (!editorRef.current) return;
        (window as any).EditorJS = EditorJS;
        const initEditor = async () => {
            const editor = new EditorJS({
                holder: editorRef.current!,
                placeholder: 'Let`s write an awesome story!',
                tools: tools(editorInstance),
                onChange: async (api) => {
                    const savedData = await api.saver.save();
                    savedDataRef.current = savedData; // ← обновляем ref, не state
                    console.log('Editor.js output (ref):', savedData);
                },
            });
            //await здесь нужен
            editorInstance.current = await editor;
        };

        initEditor();

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, []);
    const handleShowResult = () => {
        // Обновляем состояние только при нажатии кнопки
        setResultData(savedDataRef.current);
    };
    return (
        <div className={"p-10"}>
            <div ref={editorRef} style={{border: '1px solid #ccc', padding: '16px'}}/>
            <button
                type="button"
                onClick={handleShowResult}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Обновить результат
            </button>

            <h3 className="mt-4">Результат (только для чтения):</h3>
            <Result data={resultData} />
        </div>
    );
};