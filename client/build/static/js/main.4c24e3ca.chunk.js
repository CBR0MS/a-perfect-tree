(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,a){e.exports=a(99)},45:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(21),c=a.n(s),r=a(18),l=(a(45),a(38)),o=a(37),p=a(5),u=a(9),h=a(10),m=a(12),d=a(11),g=a(13),f=a(1),b=a(3),v=a.n(b),S=a(16),E=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={games:[]},a.getGames=a.getGames.bind(Object(f.a)(Object(f.a)(a))),a.playGame=a.playGame.bind(Object(f.a)(Object(f.a)(a))),a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.getGames()}},{key:"getGames",value:function(){var e=this;v.a.get("/api/games").then(function(t){t.data&&e.setState({games:t.data})}).catch(function(e){return console.log(e)})}},{key:"playGame",value:function(e){this.setState({redirect:"/play/".concat(e,"/?page=1")})}},{key:"render",value:function(){var e=this;if(this.state.redirect)return i.a.createElement(p.a,{to:this.state.redirect});var t=this.state.games.map(function(t){return i.a.createElement("div",{className:"item centered",key:S()},i.a.createElement("h2",null,t.name),i.a.createElement("p",null,t.snippets.length," Snippets"),i.a.createElement("button",{onClick:function(){}},"View Results"),i.a.createElement("button",{onClick:function(){return e.playGame(t.id)}},"Contribute \u2192"))});return i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"wrapperFlex"},t))}}]),t}(i.a.Component),j=a(34),O=a.n(j),y=a(35),k=a.n(y),C=a(16),N=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={snippet:{}},a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.props.snippetData&&this.props.interpsData)this.setState({snippet:this.props.snippetData,interps:this.props.interpsData,snippetChars:this.props.snippetData.text.split("")});else{var t=this.props.snippetId;this.props.match&&void 0===(t=this.props.match.params.id)&&(t=this.props.snippetId),v.a.get("/api/snippets/".concat(t)).then(function(t){t.data&&e.setState({snippet:t.data[0],interps:t.data[0].interps,snippetChars:t.data[0].text.split("")})}).catch(function(e){return console.log(e)})}}},{key:"render",value:function(){var e=this,t=i.a.createElement("div",null);return this.state.interps&&(t=this.state.snippetChars.map(function(t,a){var n=e.state.interps.map(function(e,t){return e.selection[a]}).reduce(function(e,t){return t?e+1:e})/e.state.interps.length,s="rgba(249, 140, 94, ".concat(n.toString(),")");return i.a.createElement("span",{style:{backgroundColor:s},key:C()},t)})),i.a.createElement("div",null,t)}}]),t}(i.a.Component),w=a(86),x=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={pageNum:1,highlightedRange:[],gameSnippets:[],fullSnippets:[],selections:[],submittedCurrent:!1},a.getGame=a.getGame.bind(Object(f.a)(Object(f.a)(a))),a.getSnippet=a.getSnippet.bind(Object(f.a)(Object(f.a)(a))),a.nextPage=a.nextPage.bind(Object(f.a)(Object(f.a)(a))),a.handleContentSelect=a.handleContentSelect.bind(Object(f.a)(Object(f.a)(a))),a.resetContentSelect=a.resetContentSelect.bind(Object(f.a)(Object(f.a)(a))),a.submitCurrent=a.submitCurrent.bind(Object(f.a)(Object(f.a)(a))),a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){console.log("User "+this.props.userId);var e=this.props.match.params.id,t=w.parse(this.props.location.search);this.setState({pageNum:parseInt(t.page),gameId:e}),this.getGame(e)}},{key:"getGame",value:function(e){var t=this;v.a.get("/api/games/".concat(e)).then(function(e){e.data&&(t.setState({gameName:e.data[0].name,gameSnippets:e.data[0].snippets}),t.getSnippet(t.state.pageNum))}).catch(function(e){return console.log(e)})}},{key:"getSnippet",value:function(e){var t=this;v.a.get("/api/snippets/".concat(this.state.gameSnippets[e-1].id)).then(function(e){e.data&&t.setState({currSnippet:e.data[0]})}).catch(function(e){return console.log(e)})}},{key:"nextPage",value:function(){this.state.pageNum+1>this.state.gameSnippets.length?this.setState({redirect:"/game-results/".concat(this.state.gameId)}):(this.props.history.push({pathname:"/play/".concat(this.state.gameId,"/"),search:"?page=".concat(this.state.pageNum+1)}),this.setState({pageNum:this.state.pageNum+1,submittedCurrent:!1}),this.getSnippet(this.state.pageNum+1),this.resetContentSelect())}},{key:"handleContentSelect",value:function(e){this.setState({highlightedRange:this.state.highlightedRange.concat(e)})}},{key:"resetContentSelect",value:function(){this.setState({highlightedRange:[]})}},{key:"submitCurrent",value:function(){var e=this,t=Array.apply(null,Array(this.state.currSnippet.text.length)).map(function(e){return!1}),a=function(a){var n=e.state.highlightedRange[a],i=n.start,s=n.end;t=t.map(function(e,t){return t>=i&&t<=s||e})};for(var n in this.state.highlightedRange)a(n);this.setState({submittedCurrent:!0,fullSnippets:this.state.fullSnippets.concat(this.state.currSnippet),selections:this.state.selections.concat([t])},function(){if(e.state.pageNum===e.state.gameSnippets.length&&e.state.fullSnippets.length===e.state.selections.length)for(var t in e.state.fullSnippets){var a={user:e.props.userId,selection:e.state.selections[t]},n={text:e.state.fullSnippets[t].text,id:e.state.fullSnippets[t].id,interps:e.state.fullSnippets[t].interps.length>0?e.state.fullSnippets[t].interps.concat([a]):[a]};v.a.patch("/api/snippets/".concat(e.state.fullSnippets[t].id),n).then(function(e){e.data&&console.log(e.data)}).catch(function(e){return console.log(e)})}})}},{key:"render",value:function(){if(this.state.redirect)return i.a.createElement(p.a,{to:this.state.redirect});var e=i.a.createElement("div",null),t=i.a.createElement("div",null);if(this.state.currSnippet&&(e=i.a.createElement(O.a,{ranges:this.state.highlightedRange,enabled:!0,onTextHighlighted:this.handleContentSelect,id:"snippet",highlightStyle:{backgroundColor:"#f98c5e"},text:this.state.currSnippet.text})),this.state.submittedCurrent){var a=this.state.fullSnippets[this.state.pageNum-1].interps.concat({selection:this.state.selections[this.state.pageNum-1]});t=i.a.createElement(N,{snippetData:this.state.currSnippet,interpsData:a})}var n=this.state.highlightedRange.length>0,s=i.a.createElement("div",null,i.a.createElement("button",{onClick:this.resetContentSelect,className:"light"},"Reset Selection"),i.a.createElement("button",{onClick:n?this.submitCurrent:function(){},className:n?"":"disabled","data-tip":!0,"data-for":"helpMakingSelection"},"Compare Selection \u2192"),i.a.createElement(k.a,{id:"helpMakingSelection",place:"bottom",type:"dark",effect:"solid",getContent:function(){return n?null:"Highlight some text to continue"}}));return this.state.submittedCurrent&&(s=i.a.createElement("button",{onClick:this.nextPage},this.state.pageNum===this.state.gameSnippets.length?"Summary \u2192":"Next Page \u2192")),console.log(this.state),i.a.createElement("div",{className:"playWrapper"},i.a.createElement("div",{className:"playHeader"},i.a.createElement("span",{style:{float:"left"}},this.state.gameName),i.a.createElement("span",{style:{float:"right"}},this.state.pageNum,"/",this.state.gameSnippets.length)),i.a.createElement("div",{className:"snipArea"},i.a.createElement("div",{className:"padder"},e),i.a.createElement("div",{className:"padder"},t)),s)}}]),t}(i.a.Component),I=a(36),D=a(16),G=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={games:[],snippets:[],gameName:"",gameSnippets:"",snippetText:""},a.getData=a.getData.bind(Object(f.a)(Object(f.a)(a))),a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a.addGame=a.addGame.bind(Object(f.a)(Object(f.a)(a))),a.addSnippet=a.addSnippet.bind(Object(f.a)(Object(f.a)(a))),a.deleteItem=a.deleteItem.bind(Object(f.a)(Object(f.a)(a))),a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getData",value:function(){var e=this;v.a.get("/api/games").then(function(t){t.data&&e.setState({games:t.data})}).catch(function(e){return console.log(e)}),v.a.get("/api/snippets").then(function(t){t.data&&e.setState({snippets:t.data})}).catch(function(e){return console.log(e)})}},{key:"handleChange",value:function(e){var t=e.target,a=t.value,n=t.name;this.setState(Object(I.a)({},n,a))}},{key:"addGame",value:function(){var e=this;if(this.state.gameName.length>0&&this.state.gameSnippets.length>0){var t=this.state.gameSnippets.split(", ").map(function(e){return{id:e}});console.log(t);var a={name:this.state.gameName,id:D(),snippets:t};v.a.post("/api/games",a).then(function(t){t.data&&(e.setState({gameName:"",gameSnippets:""}),e.getData())}).catch(function(e){return console.log(e)})}else console.log("input field required")}},{key:"addSnippet",value:function(){var e=this;if(this.state.snippetText.length>0){var t={text:this.state.snippetText,id:D(),interps:[]};v.a.post("/api/snippets",t).then(function(t){t.data&&(e.setState({snippetText:""}),e.getData())}).catch(function(e){return console.log(e)})}else console.log("input field required")}},{key:"deleteItem",value:function(e,t){var a=this;v.a.delete("/api/".concat(t,"/").concat(e)).then(function(e){e.data&&a.getData()}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.games,n=t.snippets,s=a.map(function(t){return i.a.createElement("div",{className:"item",key:D()},i.a.createElement("h4",null,"Name"),i.a.createElement("p",null,t.name),i.a.createElement("h4",null,"ID"),i.a.createElement("p",null,t.id),i.a.createElement("button",{onClick:function(){return e.deleteItem(t.id,"games")}},"Delete"))}),c=n.map(function(t){return i.a.createElement("div",{className:"item",key:D()},i.a.createElement("h4",null,"Text"),i.a.createElement("p",null,t.text),i.a.createElement("h4",null,"ID"),i.a.createElement("p",null,t.id),i.a.createElement("button",{onClick:function(){return e.deleteItem(t.id,"snippets")}},"Delete"))});return i.a.createElement("div",{className:"wrapper"},i.a.createElement("h1",null,"Games"),i.a.createElement("div",{className:"wrapperFlex"},s,i.a.createElement("div",{className:"item"},i.a.createElement("h2",null,"Add Game"),i.a.createElement("h4",null,"Name"),i.a.createElement("input",{type:"text",onChange:this.handleChange,name:"gameName",value:this.state.gameName}),i.a.createElement("h4",null,"Snippets"),i.a.createElement("input",{type:"text",onChange:this.handleChange,name:"gameSnippets",value:this.state.gameSnippets}),i.a.createElement("button",{onClick:this.addGame},"Add Game"))),i.a.createElement("h1",null,"Snippets"),i.a.createElement("div",{className:"wrapperFlex"},c,i.a.createElement("div",{className:"item"},i.a.createElement("h2",null,"Add Snippet"),i.a.createElement("h4",null,"Text"),i.a.createElement("input",{type:"text",onChange:this.handleChange,name:"snippetText",value:this.state.snippetText}),i.a.createElement("button",{onClick:this.addSnippet},"Add Snippet"))))}}]),t}(i.a.Component),A=a(16),R=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;v.a.get("/api/games/".concat(t)).then(function(t){t.data&&e.setState({gameName:t.data[0].name,gameSnippets:t.data[0].snippets})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=i.a.createElement("div",null);return this.state.gameSnippets&&(e=this.state.gameSnippets.map(function(e){return i.a.createElement("div",{className:"padder",key:A()},i.a.createElement(N,{snippetId:e.id}))})),i.a.createElement("div",{className:"snipArea"},e)}}]),t}(i.a.Component),T=(a(98),a(16)),W=function(){var e=Object(r.b)(["name"]),t=Object(l.a)(e,2),a=t[0],s=t[1];return Object(n.useEffect)(function(){void 0===a.userId&&s("userId",T(),{path:"/"})}),i.a.createElement(o.a,null,i.a.createElement("div",null,i.a.createElement(p.b,{exact:!0,path:"/",render:function(e){return i.a.createElement(E,Object.assign({},e,{userId:a.userId}))}}),i.a.createElement(p.b,{path:"/play/:id",render:function(e){return i.a.createElement(x,Object.assign({},e,{userId:a.userId}))}}),i.a.createElement(p.b,{path:"/results/game/:id",render:function(e){return i.a.createElement(x,Object.assign({},e,{userId:a.userId}))}}),i.a.createElement(p.b,{path:"/snip-results/:id",component:N}),i.a.createElement(p.b,{path:"/game-results/:id",component:R}),i.a.createElement(p.b,{path:"/admin",component:G})))},M=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(i.a.createElement(r.a,null,i.a.createElement(W,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");M?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):P(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):P(t,e)})}}()}},[[39,1,2]]]);
//# sourceMappingURL=main.4c24e3ca.chunk.js.map