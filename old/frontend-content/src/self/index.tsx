import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App/App';
import 'katex/dist/katex.min.css';
import {Metric} from "web-vitals";
import $ from "jquery";

(window as unknown as {$: unknown}).$ = $;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App/>);

// performance measuring
import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
    function onPerfEntry(_metric: Metric) {
        // console.log(metric);
    }
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
});
