"use strict";(self.webpackChunkmyportfolio=self.webpackChunkmyportfolio||[]).push([[3585],{3585:function(i,t,o){o.r(t),o.d(t,{bounceHorizontal:function(){return n},bounceVertical:function(){return c}});var e=o(4709);function n(i){if(!("bounce"!==i.outMode&&"split"!==i.outMode||"left"!==i.direction&&"right"!==i.direction)){i.bounds.right<0&&"left"===i.direction?i.particle.position.x=i.size+i.offset.x:i.bounds.left>i.canvasSize.width&&"right"===i.direction&&(i.particle.position.x=i.canvasSize.width-i.size-i.offset.x);var t=i.particle.velocity.x,o=!1;if("right"===i.direction&&i.bounds.right>=i.canvasSize.width&&t>0||"left"===i.direction&&i.bounds.left<=0&&t<0){var n=(0,e.Gu)(i.particle.options.bounce.horizontal.value);i.particle.velocity.x*=-n,o=!0}if(o){var c=i.offset.x+i.size;i.bounds.right>=i.canvasSize.width&&"right"===i.direction?i.particle.position.x=i.canvasSize.width-c:i.bounds.left<=0&&"left"===i.direction&&(i.particle.position.x=c),"split"===i.outMode&&i.particle.destroy()}}}function c(i){if(!("bounce"!==i.outMode&&"split"!==i.outMode||"bottom"!==i.direction&&"top"!==i.direction)){i.bounds.bottom<0&&"top"===i.direction?i.particle.position.y=i.size+i.offset.y:i.bounds.top>i.canvasSize.height&&"bottom"===i.direction&&(i.particle.position.y=i.canvasSize.height-i.size-i.offset.y);var t=i.particle.velocity.y,o=!1;if("bottom"===i.direction&&i.bounds.bottom>=i.canvasSize.height&&t>0||"top"===i.direction&&i.bounds.top<=0&&t<0){var n=(0,e.Gu)(i.particle.options.bounce.vertical.value);i.particle.velocity.y*=-n,o=!0}if(o){var c=i.offset.y+i.size;i.bounds.bottom>=i.canvasSize.height&&"bottom"===i.direction?i.particle.position.y=i.canvasSize.height-c:i.bounds.top<=0&&"top"===i.direction&&(i.particle.position.y=c),"split"===i.outMode&&i.particle.destroy()}}}}}]);
//# sourceMappingURL=3585.900a6cce.chunk.js.map