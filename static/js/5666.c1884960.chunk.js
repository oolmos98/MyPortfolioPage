"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[5666],{5666:function(n,i,e){e.r(i),e.d(i,{LinkInstance:function(){return u}});var t=e(5861),o=e(7762),r=e(5671),a=e(3144),s=e(7757),l=e(4709);function c(n,i){var e,t=((e=n.map((function(n){return n.id}))).sort((function(n,i){return n-i})),e.join("_")),o=i.get(t);return void 0===o&&(o=(0,l.sZ)(),i.set(t,o)),o}var u=function(){function n(i){var e=this;(0,r.Z)(this,n),this.container=i,this._drawLinkLine=function(n,i){var t=n.options.links;if(null!==t&&void 0!==t&&t.enable){var o=e.container,r=o.actualOptions,a=i.destination,s=n.getPosition(),c=a.getPosition(),u=i.opacity;o.canvas.draw((function(i){var e,d,f,v,p=null===(e=n.options.twinkle)||void 0===e?void 0:e.lines;if(null!==p&&void 0!==p&&p.enable){var k=p.frequency,y=(0,l.tX)(p.color);(0,l.sZ)()<k&&y&&(v=y,u=(0,l.Gu)(p.opacity))}if(!v){var h=void 0!==t.id?o.particles.linksColors.get(t.id):o.particles.linksColor;v=(0,l.BE)(n,a,h)}if(v){var g=null!==(d=n.retina.linksWidth)&&void 0!==d?d:0,x=null!==(f=n.retina.linksDistance)&&void 0!==f?f:0,w=r.backgroundMask;!function(n){var i=!1,e=n.begin,t=n.end,o=n.maxDistance,r=n.context,a=n.canvasSize,s=n.width,c=n.backgroundMask,u=n.colorLine,d=n.opacity,f=n.links;if((0,l.Sp)(e,t)<=o)(0,l.pS)(r,e,t),i=!0;else if(f.warp){var v,p,k={x:t.x-a.width,y:t.y},y=(0,l.oW)(e,k);if(y.distance<=o){var h=e.y-y.dy/y.dx*e.x;v={x:0,y:h},p={x:a.width,y:h}}else{var g={x:t.x,y:t.y-a.height},x=(0,l.oW)(e,g);if(x.distance<=o){var w=-(e.y-x.dy/x.dx*e.x)/(x.dy/x.dx);v={x:w,y:0},p={x:w,y:a.height}}else{var b={x:t.x-a.width,y:t.y-a.height},_=(0,l.oW)(e,b);if(_.distance<=o){var q=e.y-_.dy/_.dx*e.x;p={x:(v={x:-q/(_.dy/_.dx),y:q}).x+a.width,y:v.y+a.height}}}}v&&p&&((0,l.pS)(r,e,v),(0,l.pS)(r,t,p),i=!0)}if(i){r.lineWidth=s,c.enable&&(r.globalCompositeOperation=c.composite),r.strokeStyle=(0,l.iz)(u,d);var m=f.shadow;if(m.enable){var T=(0,l.tX)(m.color);T&&(r.shadowBlur=m.blur,r.shadowColor=(0,l.iz)(T))}r.stroke()}}({context:i,width:g,begin:s,end:c,maxDistance:x,canvasSize:o.canvas.size,links:t,backgroundMask:w,colorLine:v,opacity:u})}}))}},this._drawLinkTriangle=function(n,i,t){var o,r=n.options.links;if(null!==r&&void 0!==r&&r.enable){var a=r.triangles;if(a.enable){var s=e.container,c=s.actualOptions,u=i.destination,d=t.destination,f=null!==(o=a.opacity)&&void 0!==o?o:.5*(i.opacity+t.opacity);f<=0||s.canvas.draw((function(i){var e,t=n.getPosition(),o=u.getPosition(),v=d.getPosition(),p=null!==(e=n.retina.linksDistance)&&void 0!==e?e:0;if(!((0,l.Sp)(t,o)>p||(0,l.Sp)(v,o)>p||(0,l.Sp)(v,t)>p)){var k=(0,l.tX)(a.color);if(!k){var y=void 0!==r.id?s.particles.linksColors.get(r.id):s.particles.linksColor;k=(0,l.BE)(n,u,y)}k&&function(n){var i=n.context,e=n.pos1,t=n.pos2,o=n.pos3,r=n.backgroundMask,a=n.colorTriangle,s=n.opacityTriangle;!function(n,i,e,t){n.beginPath(),n.moveTo(i.x,i.y),n.lineTo(e.x,e.y),n.lineTo(t.x,t.y),n.closePath()}(i,e,t,o),r.enable&&(i.globalCompositeOperation=r.composite),i.fillStyle=(0,l.iz)(a,s),i.fill()}({context:i,pos1:t,pos2:o,pos3:v,backgroundMask:c.backgroundMask,colorTriangle:k,opacityTriangle:f})}}))}}},this._drawTriangles=function(n,i,t,r){var a,s,l,c=t.destination;if(null!==(a=n.links)&&void 0!==a&&a.triangles.enable&&null!==(s=c.options.links)&&void 0!==s&&s.triangles.enable){var u=null===(l=c.links)||void 0===l?void 0:l.filter((function(n){var i=e._getLinkFrequency(c,n.destination);return c.options.links&&i<=c.options.links.frequency&&r.findIndex((function(i){return i.destination===n.destination}))>=0}));if(null!==u&&void 0!==u&&u.length){var d,f=(0,o.Z)(u);try{for(f.s();!(d=f.n()).done;){var v=d.value,p=v.destination;e._getTriangleFrequency(i,c,p)>n.links.triangles.frequency||e._drawLinkTriangle(i,t,v)}}catch(k){f.e(k)}finally{f.f()}}}},this._getLinkFrequency=function(n,i){return c([n,i],e._freqs.links)},this._getTriangleFrequency=function(n,i,t){return c([n,i,t],e._freqs.triangles)},this._freqs={links:new Map,triangles:new Map}}return(0,a.Z)(n,[{key:"drawParticle",value:function(){var n=(0,t.Z)(s.mark((function n(i,e){var t,r,a,l,c,u,d,f=this;return s.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t=e.links,r=e.options,null!==t&&void 0!==t&&t.length){n.next=3;break}return n.abrupt("return");case 3:a=t.filter((function(n){return r.links&&(r.links.frequency>=1||f._getLinkFrequency(e,n.destination)<=r.links.frequency)})),l=(0,o.Z)(a);try{for(l.s();!(c=l.n()).done;)d=c.value,this._drawTriangles(r,e,d,a),d.opacity>0&&(null!==(u=e.retina.linksWidth)&&void 0!==u?u:0)>0&&this._drawLinkLine(e,d)}catch(i){l.e(i)}finally{l.f()}return n.next=8,Promise.resolve();case 8:case"end":return n.stop()}}),n,this)})));return function(i,e){return n.apply(this,arguments)}}()},{key:"init",value:function(){var n=(0,t.Z)(s.mark((function n(){return s.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this._freqs.links=new Map,this._freqs.triangles=new Map,n.next=4,Promise.resolve();case 4:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"particleCreated",value:function(n){if(n.links=[],n.options.links){var i=this.container.retina.pixelRatio,e=n.retina,t=n.options.links,o=t.distance,r=t.width;e.linksDistance=o*i,e.linksWidth=r*i}}},{key:"particleDestroyed",value:function(n){n.links=[]}}]),n}()}}]);
//# sourceMappingURL=5666.c1884960.chunk.js.map