"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[9558],{9558:(e,t,a)=>{a.d(t,{ParallaxMover:()=>o});var i=a(4409);class o{async init(){await Promise.resolve()}isEnabled(e){return!(0,i.B9)()&&!e.destroyed&&e.container.actualOptions.interactivity.events.onHover.parallax.enable}async move(e){const t=e.container,a=t.actualOptions.interactivity.events.onHover.parallax;if((0,i.B9)()||!a.enable)return;const o=a.force,n=t.interactivity.mouse.position;if(!n)return;const s=t.canvas.size,r=.5*s.width,c=.5*s.height,l=a.smooth,v=e.getRadius()/o,u=(n.x-r)*v,y=(n.y-c)*v,{offset:p}=e;p.x+=(u-p.x)/l,p.y+=(y-p.y)/l,await Promise.resolve()}}}}]);
//# sourceMappingURL=9558.3417ca1c.chunk.js.map