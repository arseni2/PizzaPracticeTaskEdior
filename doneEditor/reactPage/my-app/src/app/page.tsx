// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';

// Define plugins
const cellPlugins = [slate(), image];

export default function Home() {
  const [value, setValue] = useState<Value | null>(null);

  return (
      <main className="flex min-h-screen flex-col items-center justify-start p-6 lg:p-24">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">React-Page Editor</h1>
          <div className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-900">
            <Editor
                value={value}
                onChange={setValue}
                cellPlugins={cellPlugins}
                className="min-h-[500px]"
            />
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>Try typing or inserting an image! Content is stored in state (not persisted).</p>
          </div>
        </div>
      </main>
  );
}