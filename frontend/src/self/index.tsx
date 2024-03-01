import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/App/App';
import {Metric, ReportHandler} from 'web-vitals';
import 'katex/dist/katex.min.css';

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
