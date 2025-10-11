"use client";
import {useEffect, useRef} from 'react';
import EditorJS from '@editorjs/editorjs';
import {tools} from "@/app/Editor";


export const Result = ({ data }: {data: any}) => {
    const holderRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!holderRef.current || !data) return;

        const editor = new EditorJS({
            holder: holderRef.current,
            readOnly: true, // 🔑 ключевая опция
            data, // передаём сохранённые данные
            tools: tools(editorRef)
        });

        editorRef.current = editor;

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, [data]);

    return <div ref={holderRef} />;
};