"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[5337],{5337:(i,t,e)=>{e.d(t,{applyDistance:()=>y,getProximitySpeedFactor:()=>x,initSpin:()=>d,move:()=>p,spin:()=>v});var n=e(4409);const o=.5,a=0,s=1,c=60,l=0,r=.01;function y(i){const t=i.initialPosition,{dx:e,dy:s}=(0,n.vr)(t,i.position),c=Math.abs(e),l=Math.abs(s),{maxDistance:r}=i.retina,y=r.horizontal,p=r.vertical;if(!y&&!p)return;if(!((y&&c>=y)??!1)&&!((p&&l>=p)??!1)||i.misplaced){if((!y||c<y)&&(!p||l<p)&&i.misplaced)i.misplaced=!1;else if(i.misplaced){const e=i.position,o=i.velocity;y&&(e.x<t.x&&o.x<a||e.x>t.x&&o.x>a)&&(o.x*=-(0,n.G0)()),p&&(e.y<t.y&&o.y<a||e.y>t.y&&o.y>a)&&(o.y*=-(0,n.G0)())}}else i.misplaced=!!y&&c>y||!!p&&l>p,y&&(i.velocity.x=i.velocity.y*o-i.velocity.x),p&&(i.velocity.y=i.velocity.x*o-i.velocity.y)}async function p(i,t,e,o,l,r){await async function(i,t){const e=i.options,o=e.move.path;if(!o.enable)return;if(i.lastPathTime<=i.pathDelay)return void(i.lastPathTime+=t.value);const a=await(i.pathGenerator?.generate(i,t));a&&i.velocity.addTo(a);o.clamp&&(i.velocity.x=(0,n.qE)(i.velocity.x,-s,s),i.velocity.y=(0,n.qE)(i.velocity.y,-s,s));i.lastPathTime-=i.pathDelay}(i,r);const y=i.gravity,p=y?.enable&&y.inverse?-s:s;l&&e&&(i.velocity.x+=l*r.factor/(c*e)),y?.enable&&e&&(i.velocity.y+=p*(y.acceleration*r.factor)/(c*e));const v=i.moveDecay;i.velocity.multTo(v);const x=i.velocity.mult(e);y?.enable&&o>a&&(!y.inverse&&x.y>=a&&x.y>=o||y.inverse&&x.y<=a&&x.y<=-o)&&(x.y=p*o,e&&(i.velocity.y=x.y/e));const d=i.options.zIndex,u=(s-i.zIndexFactor)**d.velocityRate;x.multTo(u);const{position:h}=i;h.addTo(x),t.vibrate&&(h.x+=Math.sin(h.x*Math.cos(h.y)),h.y+=Math.cos(h.y*Math.sin(h.x)))}function v(i,t){const e=i.container;if(!i.spin)return;const n={x:"clockwise"===i.spin.direction?Math.cos:Math.sin,y:"clockwise"===i.spin.direction?Math.sin:Math.cos};i.position.x=i.spin.center.x+i.spin.radius*n.x(i.spin.angle),i.position.y=i.spin.center.y+i.spin.radius*n.y(i.spin.angle),i.spin.radius+=i.spin.acceleration;const a=Math.max(e.canvas.size.width,e.canvas.size.height),c=a*o;i.spin.radius>c?(i.spin.radius=c,i.spin.acceleration*=-s):i.spin.radius<l&&(i.spin.radius=l,i.spin.acceleration*=-s),i.spin.angle+=t*r*(s-i.spin.radius/a)}function x(i){return i.slow.inRange?i.slow.factor:s}function d(i){const t=i.container,e=i.options.move.spin;if(!e.enable)return;const o=e.position??{x:50,y:50},a={x:.01*o.x*t.canvas.size.width,y:.01*o.y*t.canvas.size.height},s=i.getPosition(),c=(0,n.Yf)(s,a),l=(0,n.VG)(e.acceleration);i.retina.spinAcceleration=l*t.retina.pixelRatio;i.spin={center:a,direction:i.velocity.x>=0?"clockwise":"counter-clockwise",angle:i.velocity.angle,radius:c,acceleration:i.retina.spinAcceleration}}}}]);
//# sourceMappingURL=5337.ff753902.chunk.js.map