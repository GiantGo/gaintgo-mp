(function(window){var svgSprite='<svg><symbol id="icon-yuyin" viewBox="0 0 1024 1024"><path d="M636.16512 957.44l-70.80448-70.8096c107.59168-92.06272 176.03072-228.58752 176.03072-381.31712 0-145.49504-62.2848-276.1216-161.1776-367.77472L651.19232 66.56c117.01248 109.82912 190.51008 265.47712 190.51008 438.60992 0 180.44416-79.77984 341.90848-205.53728 452.27008z" fill="#333333" ></path><path d="M445.08672 766.35648l-72.93952-72.92928c66.28352-36.64384 111.19104-107.16672 111.19104-188.25728 0-73.61536-37.04832-138.5216-93.47072-177.29024l71.62368-71.61344C535.72096 313.97376 583.68 403.88096 583.68 505.16992c0 108.65664-54.95808 204.44672-138.59328 261.18656zM253.96736 591.18592c-39.5776 0-71.66976-32.08192-71.66976-71.67488 0-39.59808 32.08704-71.67488 71.66976-71.67488 39.60832 0 71.68 32.0768 71.68 71.67488 0 39.59296-32.07168 71.67488-71.68 71.67488z" fill="#333333" ></path></symbol><symbol id="icon-jiantou" viewBox="0 0 1024 1024"><path d="M537.6 230.4L704 390.4c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L544 326.4v448c0 19.2-12.8 32-32 32s-32-12.8-32-32v-448L364.8 441.6c-12.8 6.4-32 6.4-44.8-6.4-12.8-12.8-12.8-32 0-44.8l160-160c6.4-6.4 32-32 57.6 0z" fill="" ></path></symbol><symbol id="icon-zanting" viewBox="0 0 1024 1024"><path d="M430.4 340.608c-18.24 0-33.088 12.736-33.088 28.544v285.696c0 15.744 14.784 28.544 33.088 28.544 18.24 0 33.024-12.8 33.024-28.544V369.152c0-15.808-14.848-28.544-33.024-28.544zM594.624 340.608c-18.24 0-33.024 12.736-33.024 28.544v285.696c0 15.744 14.72 28.544 33.024 28.544s33.088-12.8 33.088-28.544V369.152c0-15.808-14.848-28.544-33.088-28.544z"  ></path><path d="M512.512 65.984C266.56 65.984 66.496 266.048 66.496 512s200.064 446.016 446.016 446.016S958.528 757.952 958.528 512s-200.064-446.016-446.016-446.016z m0 828.032c-210.624 0-382.016-171.392-382.016-382.016s171.392-382.016 382.016-382.016S894.528 301.376 894.528 512s-171.392 382.016-382.016 382.016z"  ></path></symbol><symbol id="icon-bofang" viewBox="0 0 1024 1024"><path d="M540.032 70.976c-245.952 0-446.016 200.064-446.016 446.016s200.064 446.016 446.016 446.016 446.016-200.064 446.016-446.016-200.064-446.016-446.016-446.016z m0 828.032c-210.624 0-382.016-171.392-382.016-382.016s171.392-382.016 382.016-382.016 382.016 171.392 382.016 382.016-171.392 382.016-382.016 382.016z"  ></path><path d="M417.152 643.84c0 35.2 24.96 49.6 55.424 32l219.584-126.784c30.528-17.6 30.528-46.4 0-64L472.576 358.208c-30.528-17.6-55.424-3.2-55.424 32v253.632z"  ></path></symbol><symbol id="icon-zhongzhi" viewBox="0 0 1024 1024"><path d="M931.07 384.75a368 368 0 0 0-704 95.25H64l192 192 192-192H288.91C312 333.51 439.12 221.13 592 221.13c169.21 0 306.87 137.66 306.87 306.87S761.21 834.87 592 834.87a307.37 307.37 0 0 1-194.56-69.55 30.57 30.57 0 0 0-38.79 47.25 368.1 368.1 0 0 0 572.42-427.82z"  ></path></symbol><symbol id="icon-maikefenghuatongyuyin" viewBox="0 0 1024 1024"><path d="M511.336 628.299c99.736 0 180.88-80.247 180.88-178.88V243.662c0-98.638-81.144-178.885-180.88-178.885s-180.88 80.247-180.88 178.885v205.757c0 98.633 81.144 178.88 180.88 178.88z" fill="#4D4D4D" ></path><path d="M802.203 447.895c0-14.689-12.043-26.599-26.896-26.599s-26.896 11.91-26.896 26.599c0 129.28-106.35 234.455-237.075 234.455s-237.08-105.175-237.08-234.455c0-14.689-12.043-26.599-26.896-26.599s-26.896 11.91-26.896 26.599c0 149.639 116.156 272.904 263.976 286.376v172.754H357.352c-14.853 0-26.896 11.909-26.896 26.599 0 14.689 12.043 26.599 26.896 26.599h307.967c14.853 0 26.896-11.91 26.896-26.599s-12.043-26.599-26.896-26.599H538.232V734.271c147.816-13.473 263.971-136.738 263.971-286.376z" fill="#4D4D4D" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)