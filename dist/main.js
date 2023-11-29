(()=>{"use strict";class t{constructor(){this.canvas=document.getElementsByClassName("canvas")[0],this.containers=document.querySelectorAll(".container"),this.character=document.getElementsByClassName("character")[0],this.cruceta=document.getElementsByClassName("cruceta")[0],this.right=document.getElementById("right"),this.left=document.getElementById("left"),window.addEventListener("scroll",(()=>this.handleScroll())),this.imgElements=Array.from(this.containers).flatMap((t=>Array.from(t.children)));const t=this.canvas.clientWidth,e=(this.canvas.scrollWidth-t)/2;this.canvas.scrollLeft=e;const s=t/2*1.2;this.targetX=s,this.targetY=0,this.sprite=0,this.transitionSpeed=2,this.sprites=[{nombre:"iddle",index:[0,13],time:4,on:!0},{nombre:"d",index:[14,31],time:4,on:!1},{nombre:"a",index:[31,14],time:4,on:!1},{nombre:"jBallF",index:[32,47],time:2,on:!1},{nombre:"jBallB",index:[47,32],time:2,on:!1},{nombre:"background",index:[0,5],on:!1}],this.time=0,this.frame=0,this.setupEventListeners(),this.bucleDeJuego()}bucleDeJuego(){requestAnimationFrame(this.bucleDeJuego.bind(this)),this.getRender()}setupEventListeners(){this.right.addEventListener("touchstart",(()=>{const t=this.sprites.find((t=>"iddle"===t.nombre)),e=this.sprites.find((t=>"d"===t.nombre));t&&e&&(t.on=!1,e.on=!0)})),document.addEventListener("keydown",(t=>{const e=t.key,s=this.sprites.find((t=>"iddle"===t.nombre)),i=this.sprites.find((t=>t.nombre===e&&"iddle"!==t.nombre));s&&i&&(s.on=!1,i.on=!0)})),this.right.addEventListener("touchend",(()=>{const t=this.sprites.find((t=>"iddle"===t.nombre)),e=this.sprites.find((t=>"d"===t.nombre));t&&e&&(t.on=!0,e.on=!1)})),document.addEventListener("keyup",(t=>{const e=t.key,s=this.sprites.find((t=>"iddle"===t.nombre)),i=this.sprites.find((t=>t.nombre===e&&"iddle"!==t.nombre));s&&i&&(s.on=!0,i.on=!1),s.on&&(this.frame=s.index[0])}))}handleScroll(){const t=window.scrollY||window.pageYOffset;this.cruceta.style.top=`${t}px`}getRender(){const t=this.sprites.find((t=>t.on&&"iddle"!==t.nombre));this.sprite=t?this.sprites.indexOf(t):0;const[e,s]=t?t.index:[0,13];if(this.time++,4===this.time&&(e<s?this.frame++:this.frame--,1===this.sprite&&this.targetX<1050&&(this.targetX+=10,this.character.getBoundingClientRect().right>this.canvas.clientWidth&&this.canvas.scrollBy({left:20,behavior:"smooth"})),2===this.sprite&&this.targetX>50&&(this.targetX-=10,this.character.getBoundingClientRect().left<=this.canvas.clientWidth&&this.canvas.scrollBy({left:-20,behavior:"smooth"})),this.character.style.transform=`translateX(${this.targetX}px)`,this.character.style.transition=`transform ${this.transitionSpeed/20}s ease-in-out`,this.time=0),e<s){for(let t=0;t<this.imgElements.length;t++)(t<e||t>s)&&this.imgElements[t].classList.remove("active");for(let t=e;t<=s;t++){const i=t%2==0?t+1:t-1;this.frame>=s&&(this.frame=e),t===this.frame||i===this.frame?this.imgElements[t].classList.add("active"):this.imgElements[t].classList.remove("active")}}if(s<e){this.frame<=s&&(this.frame=e);for(let t=0;t<this.imgElements.length;t++)(t<s||t>e)&&this.imgElements[t].classList.remove("active");for(let t=e;t>=s;t--){const e=t%2==0?t+1:t-1;t===this.frame||e===this.frame?this.imgElements[t].classList.add("active"):this.imgElements[t].classList.remove("active")}}}}document.addEventListener("DOMContentLoaded",(function(){this.game=new t}))})();
