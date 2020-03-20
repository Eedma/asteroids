!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";var s,n=i(1),o=i(2),r=(s=o)&&s.__esModule?s:{default:s};var a=void 0,l=void 0,h=window.innerWidth,d=window.innerHeight,u=void 0,c=void 0,f=void 0,y=void 0,v=void 0;function g(){c=new n.Game,a=document.getElementById("canvas"),l=a.getContext("2d"),a.width=h,a.height=d,l.fillStyle="black",l.fillRect(0,0,a.width,a.height),f=new n.Ship;for(var e=0;e<c.exp+8;e++)c.asteroids.push(new n.Asteroid);document.body.addEventListener("keydown",m),document.body.addEventListener("keyup",p),y=null==localStorage.getItem("HighScore")?0:localStorage.getItem("HighScore"),x()}function m(e){c.keys[e.keyCode]=!0}function p(e){c.keys[e.keyCode]=!1,32===e.keyCode&&c.bullets.push(new n.Bullet(f))}function b(e,t,i,s,n,o){var r,a;return r=e-s,a=t-n,i+o>Math.sqrt(r*r+a*a)}function x(){if(f.movingForward=c.keys[87],c.keys[68]&&f.Rotate(1),c.keys[65]&&f.Rotate(-1),l.clearRect(0,0,h,d),document.getElementById("score").innerHTML="",document.getElementById("score").innerHTML="score: "+c.score,0===c.asteroids.length){c.exp+=1;for(var e=0;e<c.exp+8;e++){var t=new n.Asteroid;t.speed=c.exp,c.asteroids.push(t)}}if(function(){var e=1350,t=[[9,9],[-9,9]];l.strokeStyle="white";for(var i=0;i<c.lives;i++){l.beginPath(),l.moveTo(e,10);for(var s=0;s<t.length;s++)l.lineTo(e+t[s][0],10+t[s][1]);l.closePath(),l.stroke(),e-=30}}(),0!==c.asteroids.length)for(var i=0;i<c.asteroids.length;i++)b(f.x,f.y,11,c.asteroids[i].x,c.asteroids[i].y,c.asteroids[i].collisionRadius)&&(f.x=h/2,f.y=d/2,f.velX=0,f.velY=0,c.lives-=1);if(0!==c.asteroids.length&&0!=c.bullets.length)e:for(var s=0;s<c.asteroids.length;s++)for(var o=0;o<c.bullets.length;o++)if(b(c.bullets[o].x,c.bullets[o].y,3,c.asteroids[s].x,c.asteroids[s].y,c.asteroids[s].collisionRadius)){1===c.asteroids[s].level?(c.asteroids.push(new n.Asteroid(c.asteroids[s].x-5,c.asteroids[s].y-5,25,2,22,c.exp-1)),c.asteroids.push(new n.Asteroid(c.asteroids[s].x+5,c.asteroids[s].y+5,25,2,22,c.exp-1))):2===c.asteroids[s].level&&(c.asteroids.push(new n.Asteroid(c.asteroids[s].x-5,c.asteroids[s].y-5,15,3,12,c.exp-.5)),c.asteroids.push(new n.Asteroid(c.asteroids[s].x+5,c.asteroids[s].y+5,15,3,12,c.exp-.5))),c.asteroids.splice(s,1),c.bullets.splice(o,1),c.score+=20;break e}if(f.visible&&(f.Update(),f.Draw()),0!==c.bullets.length)for(var r=0;r<c.bullets.length;r++)c.bullets[r].Update(),c.bullets[r].Draw();if(0!==c.asteroids.length)for(var a=0;a<c.asteroids.length;a++)c.asteroids[a].Update(),c.asteroids[a].Draw(a);y=Math.max(c.score,y),localStorage.setItem("HighScore",y),document.getElementById("highscore").innerHTML="",document.getElementById("highscore").innerHTML="highscore: "+y,document.getElementById("exp").innerHTML="",document.getElementById("exp").innerHTML="level: "+c.exp,u=requestAnimationFrame(x),c.lives<=0&&w()}document.addEventListener("DOMContentLoaded",g),document.getElementById("play-again").addEventListener("click",(function(){g(),document.getElementById("read-score").style.display="none"}));var w=function(){if(document.body.removeEventListener("keydown",m),document.body.removeEventListener("keyup",p),f.visible=!1,document.getElementById("save-score").style.display="block",document.getElementById("final-score").innerHTML="Your score is "+c.score,document.getElementById("save-data").addEventListener("click",M),c.lives<=0)return cancelAnimationFrame(u)},M=function(){var e={userName:document.getElementById("name_field").value,score:c.score};console.log("this is game data",e),r.default.create(e).then((function(e){console.log(e)})).catch((function(e){console.log("An API error occurred",e)})).then(k()),document.getElementById("save-data").style.display="block",document.getElementById("read-score").style.display="block"},k=function(){r.default.readAll().then((function(e){if("unauthorized"===e.message)return isLocalHost()?alert("FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"):alert("FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"),!1;console.log("all todos",e),v=e,console.log(v),v.map((function(e){document.getElementById("scores-list").innerHTML+="\n            <tr>\n                <td>"+e.data.userName+"</td>\n                <td>"+e.data.score+"</td>\n            </tr>\n          "}))}))}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}();function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=window.innerWidth,r=window.innerHeight,a=document.getElementById("canvas"),l=a.getContext("2d");t.Game=function e(){n(this,e),this.keys=[],this.bullets=[],this.asteroids=[],this.score=0,this.lives=3,this.exp=1},t.Ship=function(){function e(){n(this,e),this.visible=!0,this.x=o/2,this.y=r/2,this.movingForward=!1,this.speed=.1,this.velX=0,this.velY=0,this.rotateSpeed=.001,this.radius=15,this.angle=0,this.strokeColor="white",this.noseX=o/2+15,this.noseY=r/2}return s(e,[{key:"Rotate",value:function(e){this.angle+=this.rotateSpeed*e}},{key:"Update",value:function(){var e=this.angle/Math.PI*180;this.movingForward&&(this.velX+=Math.cos(e)*this.speed,this.velY+=Math.sin(e)*this.speed),this.x<this.radius&&(this.x=a.width),this.x>a.width&&(this.x=this.radius),this.y<this.radius&&(this.y=a.height),this.y>a.height&&(this.y=this.radius),this.velX*=.99,this.velY*=.99,this.x-=this.velX,this.y-=this.velY}},{key:"Draw",value:function(){l.strokeStyle=this.strokeColor,l.beginPath();var e=2*Math.PI/3,t=this.angle/Math.PI*180;this.noseX=this.x-this.radius*Math.cos(t),this.noseY=this.y-this.radius*Math.sin(t);for(var i=0;i<3;i++)l.lineTo(this.x-this.radius*Math.cos(e*i+t),this.y-this.radius*Math.sin(e*i+t));l.closePath(),l.stroke()}}]),e}(),t.Bullet=function(){function e(t){n(this,e),this.visible=!0,this.x=t.noseX,this.y=t.noseY,this.angle=t.angle,this.height=4,this.width=4,this.speed=10,this.velX=0,this.velY=0}return s(e,[{key:"Update",value:function(){var e=this.angle/Math.PI*180;this.x-=Math.cos(e)*this.speed,this.y-=Math.sin(e)*this.speed}},{key:"Draw",value:function(){l.fillStyle="white",l.fillRect(this.x,this.y,this.width,this.height)}}]),e}(),t.Asteroid=function(){function e(t,i,s,a,l,h){n(this,e),this.visible=!0,this.x=t||Math.floor(Math.random()*o),this.y=i||Math.floor(Math.random()*r),this.speed=1,this.radius=s||50,this.angle=Math.floor(359*Math.random()),this.strokeColor="white",this.collisionRadius=l||46,this.level=a||1}return s(e,[{key:"Update",value:function(){var e=this.angle/Math.PI*180;this.x+=Math.cos(e)*this.speed,this.y+=Math.sin(e)*this.speed,this.x<this.radius&&(this.x=a.width),this.x>a.width&&(this.x=this.radius),this.y<this.radius&&(this.y=a.height),this.y>a.height&&(this.y=this.radius)}},{key:"Draw",value:function(){l.beginPath();for(var e=2*Math.PI/6,t=this.angle/Math.PI*180,i=0;i<6;i++)l.lineTo(this.x-this.radius*Math.cos(e*i+t),this.y-this.radius*Math.sin(e*i+t));l.closePath(),l.stroke()}}]),e}()},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={create:function(e){return fetch("/.netlify/functions/game-data-create",{body:JSON.stringify(e),method:"POST"}).then((function(e){return e.json()}))},readAll:function(){return fetch("/.netlify/functions/game-data-read-all").then((function(e){return e.json()}))}}}]);