"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[463],{463:(t,e,a)=>{a.d(e,{zS:()=>p,loadGifImage:()=>w});const o=[0,4,2,1],i=[8,8,4,2];class r{constructor(t){this.pos=0,this.data=new Uint8ClampedArray(t)}getString(t){const e=this.data.slice(this.pos,this.pos+t);return this.pos+=e.length,e.reduce(((t,e)=>t+String.fromCharCode(e)),"")}nextByte(){return this.data[this.pos++]}nextTwoBytes(){return this.pos+=2,this.data[this.pos-2]+(this.data[this.pos-1]<<8)}readSubBlocks(){let t="",e=0;do{e=this.data[this.pos++];for(let a=e;--a>=0;t+=String.fromCharCode(this.data[this.pos++]));}while(0!==e);return t}readSubBlocksBin(){let t=this.data[this.pos],e=0;for(let o=0;0!==t;o+=t+1,t=this.data[this.pos+o])e+=t;const a=new Uint8Array(e);t=this.data[this.pos++];for(let o=0;0!==t;t=this.data[this.pos++])for(let e=t;--e>=0;a[o++]=this.data[this.pos++]);return a}skipSubBlocks(){for(const t=1,e=0;this.data[this.pos]!==e;this.pos+=this.data[this.pos]+t);this.pos++}}const s={x:0,y:0},n=0,l=.5,h=0,c=0,g=0;function f(t,e){const a=[];for(let o=0;o<e;o++)a.push({r:t.data[t.pos],g:t.data[t.pos+1],b:t.data[t.pos+2]}),t.pos+=3;return a}async function d(t,e,a,r,s,n){switch(t.nextByte()){case 59:return!0;case 44:await async function(t,e,a,r,s,n){const l=e.frames[r(!0)];l.left=t.nextTwoBytes(),l.top=t.nextTwoBytes(),l.width=t.nextTwoBytes(),l.height=t.nextTwoBytes();const h=t.nextByte(),c=128===(128&h),g=64===(64&h);l.sortFlag=32===(32&h),l.reserved=(24&h)>>>3;const d=1<<1+(7&h);c&&(l.localColorTable=f(t,d));const p=t=>{const{r:o,g:i,b:r}=(c?l.localColorTable:e.globalColorTable)[t];return t!==s(null)?{r:o,g:i,b:r,a:255}:{r:o,g:i,b:r,a:a?~~((o+i+r)/3):0}},w=(()=>{try{return new ImageData(l.width,l.height,{colorSpace:"srgb"})}catch(t){if(t instanceof DOMException&&"IndexSizeError"===t.name)return null;throw t}})();if(null==w)throw new EvalError("GIF frame size is to large");const u=t.nextByte(),m=t.readSubBlocksBin(),y=1<<u,b=(t,e)=>{const a=t>>>3,o=7&t;return(m[a]+(m[a+1]<<8)+(m[a+2]<<16)&(1<<e)-1<<o)>>>o};if(g){for(let a=0,s=u+1,h=0,c=[[0]],g=0;g<4;g++){if(o[g]<l.height){let t=0,e=0,r=!1;for(;!r;){const n=a;if(a=b(h,s),h+=s+1,a===y){s=u+1,c.length=y+2;for(let t=0;t<c.length;t++)c[t]=t<y?[t]:[]}else{a>=c.length?c.push(c[n].concat(c[n][0])):n!==y&&c.push(c[n].concat(c[a][0]));for(const r of c[a]){const{r:a,g:s,b:n,a:h}=p(r);w.data.set([a,s,n,h],o[g]*l.width+i[g]*e+t%(4*l.width)),t+=4}c.length===1<<s&&s<12&&s++}t===4*l.width*(e+1)&&(e++,o[g]+i[g]*e>=l.height&&(r=!0))}}n?.(t.pos/(t.data.length-1),r(!1)+1,w,{x:l.left,y:l.top},{width:e.width,height:e.height})}l.image=w,l.bitmap=await createImageBitmap(w)}else{let a=0,o=u+1,i=0,s=-4,h=!1;const c=[[0]];for(;!h;){const t=a;if(a=b(i,o),i+=o,a===y){o=u+1,c.length=y+2;for(let t=0;t<c.length;t++)c[t]=t<y?[t]:[]}else{if(a===y+1){h=!0;break}a>=c.length?c.push(c[t].concat(c[t][0])):t!==y&&c.push(c[t].concat(c[a][0]));for(const t of c[a]){const{r:e,g:a,b:o,a:i}=p(t);w.data.set([e,a,o,i],s+=4)}c.length>=1<<o&&o<12&&o++}}l.image=w,l.bitmap=await createImageBitmap(w),n?.((t.pos+1)/t.data.length,r(!1)+1,l.image,{x:l.left,y:l.top},{width:e.width,height:e.height})}}(t,e,a,r,s,n);break;case 33:!function(t,e,a,o){switch(t.nextByte()){case 249:{const i=e.frames[a(!1)];t.pos++;const r=t.nextByte();i.GCreserved=(224&r)>>>5,i.disposalMethod=(28&r)>>>2,i.userInputDelayFlag=2===(2&r);const s=1===(1&r);i.delayTime=10*t.nextTwoBytes();const n=t.nextByte();s&&o(n),t.pos++;break}case 255:{t.pos++;const a={identifier:t.getString(8),authenticationCode:t.getString(3),data:t.readSubBlocksBin()};e.applicationExtensions.push(a);break}case 254:e.comments.push([a(!1),t.readSubBlocks()]);break;case 1:if(0===e.globalColorTable.length)throw new EvalError("plain text extension without global color table");t.pos++,e.frames[a(!1)].plainTextData={left:t.nextTwoBytes(),top:t.nextTwoBytes(),width:t.nextTwoBytes(),height:t.nextTwoBytes(),charSize:{width:t.nextTwoBytes(),height:t.nextTwoBytes()},foregroundColor:t.nextByte(),backgroundColor:t.nextByte(),text:t.readSubBlocks()};break;default:t.skipSubBlocks()}}(t,e,r,s);break;default:throw new EvalError("undefined block found")}return!1}function p(t){const{context:e,radius:a,particle:o,delta:i}=t,r=o.image;if(!r?.gifData||!r.gif)return;const f=new OffscreenCanvas(r.gifData.width,r.gifData.height),d=f.getContext("2d");if(!d)throw new Error("could not create offscreen canvas context");d.imageSmoothingQuality="low",d.imageSmoothingEnabled=!1,d.clearRect(s.x,s.y,f.width,f.height),void 0===o.gifLoopCount&&(o.gifLoopCount=r.gifLoopCount??g);let p=o.gifFrame??n;const w={x:-r.gifData.width*l,y:-r.gifData.height*l},u=r.gifData.frames[p];if(void 0===o.gifTime&&(o.gifTime=h),u.bitmap){switch(e.scale(a/r.gifData.width,a/r.gifData.height),u.disposalMethod){case 4:case 5:case 6:case 7:case 0:d.drawImage(u.bitmap,u.left,u.top),e.drawImage(f,w.x,w.y),d.clearRect(s.x,s.y,f.width,f.height);break;case 1:d.drawImage(u.bitmap,u.left,u.top),e.drawImage(f,w.x,w.y);break;case 2:d.drawImage(u.bitmap,u.left,u.top),e.drawImage(f,w.x,w.y),d.clearRect(s.x,s.y,f.width,f.height),r.gifData.globalColorTable.length?d.putImageData(r.gifData.backgroundImage,w.x,w.y):d.putImageData(r.gifData.frames[c].image,w.x+u.left,w.y+u.top);break;case 3:{const t=d.getImageData(s.x,s.y,f.width,f.height);d.drawImage(u.bitmap,u.left,u.top),e.drawImage(f,w.x,w.y),d.clearRect(s.x,s.y,f.width,f.height),d.putImageData(t,s.x,s.y)}}if(o.gifTime+=i.value,o.gifTime>u.delayTime){if(o.gifTime-=u.delayTime,++p>=r.gifData.frames.length){if(--o.gifLoopCount<=g)return;p=c,d.clearRect(s.x,s.y,f.width,f.height)}o.gifFrame=p}e.scale(r.gifData.width/a,r.gifData.height/a)}}async function w(t){if("gif"===t.type){t.loading=!0;try{t.gifData=await async function(t,e,a){a||(a=!1);const o=await fetch(t);if(!o.ok&&404===o.status)throw new EvalError("file not found");const i=await o.arrayBuffer(),s={width:0,height:0,totalTime:0,colorRes:0,pixelAspectRatio:0,frames:[],sortFlag:!1,globalColorTable:[],backgroundImage:new ImageData(1,1,{colorSpace:"srgb"}),comments:[],applicationExtensions:[]},n=new r(new Uint8ClampedArray(i));if("GIF89a"!==n.getString(6))throw new Error("not a supported GIF file");s.width=n.nextTwoBytes(),s.height=n.nextTwoBytes();const l=n.nextByte(),h=128===(128&l);s.colorRes=(112&l)>>>4,s.sortFlag=8===(8&l);const c=1<<1+(7&l),g=n.nextByte();s.pixelAspectRatio=n.nextByte(),0!==s.pixelAspectRatio&&(s.pixelAspectRatio=(s.pixelAspectRatio+15)/64),h&&(s.globalColorTable=f(n,c));const p=(()=>{try{return new ImageData(s.width,s.height,{colorSpace:"srgb"})}catch(t){if(t instanceof DOMException&&"IndexSizeError"===t.name)return null;throw t}})();if(null==p)throw new Error("GIF frame size is to large");const{r:w,g:u,b:m}=s.globalColorTable[g];p.data.set(h?[w,u,m,255]:[0,0,0,0]);for(let r=4;r<p.data.length;r*=2)p.data.copyWithin(r,0,r);s.backgroundImage=p;let y=-1,b=!0,x=-1;const B=t=>(t&&(b=!0),y),T=t=>(null!=t&&(x=t),x);try{do{b&&(s.frames.push({left:0,top:0,width:0,height:0,disposalMethod:0,image:new ImageData(1,1,{colorSpace:"srgb"}),plainTextData:null,userInputDelayFlag:!1,delayTime:0,sortFlag:!1,localColorTable:[],reserved:0,GCreserved:0}),y++,x=-1,b=!1)}while(!await d(n,s,a,B,T,e));s.frames.length--;for(const t of s.frames){if(t.userInputDelayFlag&&0===t.delayTime){s.totalTime=1/0;break}s.totalTime+=t.delayTime}return s}catch(C){if(C instanceof EvalError)throw new Error(`error while parsing frame ${y} "${C.message}"`);throw C}}(t.source),t.gifLoopCount=function(t){for(const e of t.applicationExtensions)if(e.identifier+e.authenticationCode==="NETSCAPE2.0")return e.data[1]+(e.data[2]<<8);return NaN}(t.gifData)??g,t.gifLoopCount||(t.gifLoopCount=1/0)}catch{t.error=!0}t.loading=!1}else{const{loadImage:e}=await Promise.resolve().then(a.bind(a,1977));await e(t)}}}}]);
//# sourceMappingURL=463.fb902705.chunk.js.map