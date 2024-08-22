import React from 'react';
import ReactDOM from 'react-dom/client';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </React.StrictMode>,
    );
}
