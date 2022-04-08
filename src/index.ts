import { SampleScene } from "./core/sample/SampleScene";


const sample = new SampleScene();
sample.initialize();
sample.start();

setInterval(sample.update.bind(sample), 1000);

