window.xhrPolyfill=window.xhrPolyfill||{},window.xhrPolyfill.originalXMLHttpRequest=window.XMLHttpRequest,window.xhrPolyfill.getOrigin=function(e){var n;if(n=/^(?:\w+\:)?(?:\/\/)([^\/]*)/.exec(e),!n)throw"invalid url";return n[0]},window.xhrPolyfill.parseHeaders=function(e){var n,i,r,t;if(!e)return{};if("string"==typeof e&&(e=e.split(/\r\n/)),"[object Array]"===Object.prototype.toString.apply(e)){for(r={},n=e.length-1;n>=0;n--)t=/^(.+?)\:\s*(.+)$/.exec(e[n]),t&&(r[t[1]]=t[2]);e=r,r=null}if("object"==typeof e){r={};for(i in e)r[i.toLowerCase()]=e[i];e=r,r=null}return e},window.xhrPolyfill.bindEvent=function(e,n,i){var r,t="on"+n;if("addEventListener"in e)return e.addEventListener(n,i,!1);if("attachEvent"in e)return e.attachEvent(t,i);if(t in e)return r=e[t],void(e[t]=r?function(){r.apply(this,arguments),i.apply(this,arguments)}:i);throw"could not bind to event '"+n+"'"},window.xhrPolyfill.resolveUrl=function(e){var n=document.createElement("a");return n.href=e,n.href},window.xhrPolyfill.receiveMessage=function(e,n){var i;if(e.source!==n)return null;if(i=e.data,"string"==typeof i){if("{"!==i[0])return null;i=JSON.parse(i)}return"object"!=typeof i?null:i},window.xhrPolyfill.xhrSend=function(e,n){var i,r,t=window.xhrPolyfill.originalXMLHttpRequest?new window.xhrPolyfill.originalXMLHttpRequest:function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(n){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(i){}throw new Error("This browser does not support XMLHttpRequest.")}();if(t.onreadystatechange=function(){var i={};switch(i.id=e.id,i.readyState=this.readyState,this.readyState){case 1:case 2:case 3:break;case 4:i.responseBody=this.responseText,i.responseHeaders=this.getAllResponseHeaders(),i.statusCode=this.status,i.statusText=this.statusText;break;default:throw new Error("invalid state")}n(i)},t.open(e.method,e.url,!0,e.username,e.password),e.requestHeaders){r=window.xhrPolyfill.parseHeaders(e.requestHeaders);for(i in r)t.setRequestHeader(i,r[i])}t.send(e.requestBody)},window.xhrPolyfill=window.xhrPolyfill||{},window.xhrPolyfill.bindEvent(window,"message",function(e){var n,i;e.origin in window.xhrPolyfill.channels&&(i=window.xhrPolyfill.channels[e.origin],(n=window.xhrPolyfill.receiveMessage(e,i.iframe.contentWindow))&&i.onreceive&&i.onreceive(n))}),window.xhrPolyfill.IFrameChannel=function(e){var n=this;e=window.xhrPolyfill.resolveUrl(e),n.origin=window.xhrPolyfill.getOrigin(e),n.send=function(i){var r=[i];n.send=function(e){r.push(e)},n.iframe=document.createElement("iframe"),window.xhrPolyfill.bindEvent(n.iframe,"load",function(){var e;for(n.send=function(e){n.iframe.contentWindow.postMessage(JSON.stringify(e),n.origin)};e=r.shift();)n.send(e);r=null}),n.iframe.src=e,n.iframe.style.display="none",document.scripts[0].parentNode.insertBefore(n.iframe,document.scripts[0])},this.onreceive=null},window.xhrPolyfill=window.xhrPolyfill||{},window.xhrPolyfill.channels={},window.xhrPolyfill.proxies={},window.xhrPolyfill.idSequence=0,window.xhrPolyfill.ensureChannel=function(e){var n;return e=window.xhrPolyfill.resolveUrl(e),n=window.xhrPolyfill.getOrigin(e),n in window.xhrPolyfill.channels||(window.xhrPolyfill.channels[n]=window.xhrPolyfill.createChannel(e)),window.xhrPolyfill.channels[n]},window.xhrPolyfill.createChannel=function(e){var n=new window.xhrPolyfill.IFrameChannel(e);return window.xhrPolyfill.bindEvent(n,"receive",function(e){var n;return e.id in window.xhrPolyfill.proxies?(n=window.xhrPolyfill.proxies[e.id],4===e.readyState&&delete window.xhrPolyfill.proxies[e.id],void window.xhrPolyfill.xhrReceive(n,e)):!1}),n},window.xhrPolyfill.xhrReceive=function(e,n){var i;i=window.xhrPolyfill.parseHeaders(n.responseHeaders),e.readyState=n.readyState,e.status=n.statusCode,e.statusText=n.statusText,e.responseText=n.responseBody,e.getAllResponseHeaders=function(){return n.responseHeaders},e.getResponseHeader=function(e){return e=e.toLowerCase(),e in i?i[e]:void 0},e.onreadystatechange&&e.onreadystatechange(e)},window.xhrPolyfill.XMLHttpRequestProxy=function(){var e=(++window.xhrPolyfill.idSequence).toString(36),n=this,i=null,r=window.xhrPolyfill.getOrigin(location.href),t=null,o={id:e,requestHeaders:{}};this.onreadystatechange=null,this.readyState=0,this.responseText=null,this.status=null,this.statusText=null,this.open=function(e,n,r,t,l){if(r===!1)throw"only asynchronous behavior is supported";n=window.xhrPolyfill.resolveUrl(n),i=window.xhrPolyfill.getOrigin(n),o.method=e,o.url=n,o.username=t,o.password=l},this.send=function(l){o.requestBody=l,r==i?window.xhrPolyfill.xhrSend(o,function(e){window.xhrPolyfill.xhrReceive(n,e)}):(window.xhrPolyfill.proxies[e]=this,t=window.xhrPolyfill.ensureChannel(i+"/xhr-channel.html"),t.send(o))},this.abort=function(){},this.setRequestHeader=function(e,n){e=e.toLowerCase(),o.requestHeaders[e]=n},this.getAllResponseHeaders=function(){},this.getResponseHeader=function(){}},document.documentMode&&document.documentMode<10&&(window.XMLHttpRequest=window.XMLHttpRequestProxy);