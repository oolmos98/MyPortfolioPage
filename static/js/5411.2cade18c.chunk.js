"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[5411],{5411:(e,o,t)=>{t.d(o,{BounceOutMode:()=>s});var i=t(4409);class s{constructor(e){this.container=e,this.modes=["bounce","split"]}async update(e,o,s,n){if(!this.modes.includes(n))return;const c=this.container;let a=!1;for(const[,t]of c.plugins)if(void 0!==t.particleBounce&&(a=await t.particleBounce(e,s,o)),a)break;if(a)return;const r=e.getPosition(),u=e.offset,d=e.getRadius(),f=(0,i.AE)(r,d),l=c.canvas.size,{bounceHorizontal:p,bounceVertical:b}=await t.e(6221).then(t.bind(t,6221));p({particle:e,outMode:n,direction:o,bounds:f,canvasSize:l,offset:u,size:d}),b({particle:e,outMode:n,direction:o,bounds:f,canvasSize:l,offset:u,size:d})}}}}]);
//# sourceMappingURL=5411.2cade18c.chunk.js.map