import { Application } from 'https://unpkg.com/@splinetool/runtime@1.0.70/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/h3Be0Yi9H5vwPt4r/scene.splinecode');