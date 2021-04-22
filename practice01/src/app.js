import * as math from "./math";
import "./style.css";
console.log(math.sum(1, 2));
console.log(process.env.NODE_ENV); // "development"
console.log(VERSION); // 'v.1.2.3'
console.log(PRODUCTION); // true
console.log(MAX_COUNT); // 999
console.log(api.domain); // '[http://dev.api.domain.com](http://dev.api.domain.com)'

const alert = (msg) => window.alert(msg);
