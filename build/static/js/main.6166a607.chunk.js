(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{11:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(27),s=n.n(r),o=n(3),i=n.n(o),l=n(4),d=(n(11),n(14)),u=n(10),j=n.n(u);function h(e,t){return t<0&&Math.abs(t)>e.getDate()?(e.setMonth(e.getMonth()-1),e.setDate(e.getDate()+t+b(e.getMonth())),e):(e.setDate(e.getDate()+t),e)}function b(e){return"0, 2, 4, 6, 7, 9, 11".includes(e.toString())?31:2===e?28:30}function g(e){return e.includes("Pacific")?"America/Los_Angeles":e.includes("Eastern")?"America/New_York":e.includes("Central")?"America/Chicago":e.includes("Mountain")?"America/Denver":e.includes("Alaska")?"America/Anchorage":e.includes("Hawaii")?"Pacific/Honolulu":"Etc/GMT"}function O(e,t){var n=t.getTime()-e.getTime(),a=n/6e4,c=a/60,r=c/24;return{ms:n,minutes:a,hours:c,days:r,weeks:Math.floor(r/7),years:r/365}}function m(e){var t=new Date(e.getFullYear(),0,1,0,0),n=function(e){return 8-e.getDay()}(t);return t.setDate(n),O(t,e).weeks+1}function p(e){var t=function(e){var t=new Date(e).getDay(),n=0,a=0;return 0==t?a=6:1==t?(n=-1,a=5):2==t?(n=-2,a=4):3==t?(n=-3,a=3):4==t?(n=-4,a=2):5==t?(n=-5,a=1):6==t?n=-6:alert("no shift made"),{shiftLeft:n,shiftRight:a}}(e),n=new Date(e),a=new Date(e);return{weekStartsOn:n=h(n,t.shiftLeft),weekEndsOn:a=h(a,t.shiftRight)}}p(new Date("Mon Nov 29 2021"));function x(){return{endOfCurrentMonth:f(1,0),startOfOneMonthAgo:f(0,1),startOfTwoMonthsAgo:f(-1,1),startOfThreeMonthsAgo:f(-2,1),startOfSixMonthsAgo:f(-5,1),startOfNineMonthsAgo:f(-8,1),startOfTwelveMonthsAgo:f(-11,1),aYearAgo:f(-12,(new Date).getDate())}}function f(e,t){var n=new Date;return n.setMonth(n.getMonth()+e),n.setDate(t),n}var v="https://react-g-calendar-analyzer.herokuapp.com/",w=[],y=[],k=window.gapi;function D(e,t){return S.apply(this,arguments)}function S(){return(S=Object(l.a)(i.a.mark((function e(t,n){var a,c,r,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,k.client.calendar,e.next=4,k.client.calendar.calendarList.list({});case 4:a=e.sent,c=a.result.items,r=0;case 7:if(!(r<c.length)){e.next=15;break}return s=c[r],w.push(s.summary),e.next=12,C("day",s.summary,s.id,t.toISOString(),n.toISOString());case 12:r++,e.next=7;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.log("error in requestAndStore-> listOfCalendars "+e.t0.message);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})))).apply(this,arguments)}function C(e,t,n,a,c){return M.apply(this,arguments)}function M(){return(M=Object(l.a)(i.a.mark((function e(t,n,a,c,r){var s,o,l,u,j;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.client.calendar.events.list({calendarId:a,singleEvents:!0,timeZone:g((new Date).toString()),timeMin:c,timeMax:r,maxResults:2400});case 3:s=e.sent,o=s.result.items,l=Object(d.a)(o),e.prev=6,l.s();case 8:if((u=l.n()).done){e.next=14;break}return j=u.value,e.next=12,N(j,n);case 12:e.next=8;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(6),l.e(e.t0);case 19:return e.prev=19,l.f(),e.finish(19);case 22:e.next=27;break;case 24:e.prev=24,e.t1=e.catch(0),console.log("error in requestAndStore-> events: "+e.t1.message);case 27:case"end":return e.stop()}}),e,null,[[0,24],[6,16,19,22]])})))).apply(this,arguments)}function N(e,t){return A.apply(this,arguments)}function A(){return(A=Object(l.a)(i.a.mark((function e(t,n){var a,c,r,s,o,l,d,u,j,h,b,g,p;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===t.summary||t.start.date){e.next=26;break}if(y.includes(t.summary)||y.push(t.summary),a=new Date(t.start.dateTime),c=new Date(t.end.dateTime),r=I(O(a,c).hours),a.getDate()===c.getDate()){e.next=22;break}return(s=new Date(a)).setHours(23,59,59),(o=new Date(c)).setHours(0,0,0),l=m(a),d=m(c),u=a.getMonth(),j=c.getMonth(),h=I(O(a,s).hours),b=I(O(o,c).hours),e.next=18,R(a.toDateString(),t.summary,a,s,n,t.description,h,l,u);case 18:return e.next=20,R(c.toDateString(),t.summary,o,c,n,t.description,b,d,j);case 20:e.next=26;break;case 22:return g=m(a),p=a.getMonth(),e.next=26,R(a.toDateString(),t.summary,a,c,n,t.description,r,g,p);case 26:return e.abrupt("return");case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,t,n,a,c,r,s,o,i){return L.apply(this,arguments)}function L(){return(L=Object(l.a)(i.a.mark((function e(t,n,a,c,r,s,o,l,d){var u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j()({method:"post",url:"".concat(v,"api/daily/"),data:{id:t,eventName:n,startTime:a,endTime:c,calName:r,description:s,duration:o,weekNum:l,monthNum:d}});case 3:return u=e.sent,e.abrupt("return",u);case 7:e.prev=7,e.t0=e.catch(0),console.log("error in requestAndStore-> sendPost: "+e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function I(e){return Math.round(100*e)/100}var T=n(0);function E(){return Object(T.jsx)("div",{class:"loader"})}var H=window.gapi;function P(){H.client.init({apiKey:"AIzaSyBYxwNwT53EbvQNvhVCDD3FZW3KvTQWRBs",clientId:"958765352456-n0b4hg33876562lgerugi6qfei2jjaja.apps.googleusercontent.com",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],scope:"https://www.googleapis.com/auth/calendar.readonly"}).then((function(){H.auth2.getAuthInstance().isSignedIn.listen(F),F(H.auth2.getAuthInstance().isSignedIn.get())}),(function(e){alert(JSON.stringify(e,null,2))}))}function F(e){return z.apply(this,arguments)}function z(){return(z=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t?console.log("signedIn so change view to show navigation"):console.log("signing you out \n change view to home page");case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e){return Y.apply(this,arguments)}function Y(){return(Y=Object(l.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!H.auth2.getAuthInstance().isSignedIn.get()){e.next=6;break}console.log("already signed in "),window.location.replace("./daily/calName/all/".concat((new Date).toDateString())),e.next=16;break;case 6:return e.next=8,H.auth2.getAuthInstance().signIn();case 8:return console.log("first time so making a request"),n=x(),(a=document.createElement("div")).className="loader",document.getElementById("home-page").replaceWith(a),e.next=15,D(n.startOfTwoMonthsAgo,n.endOfCurrentMonth);case 15:window.location.replace("./daily/calName/all/".concat((new Date).toDateString()));case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(0),alert(e.t0.message);case 21:case"end":return e.stop()}}),e,null,[[0,18]])})))).apply(this,arguments)}function W(e){return G.apply(this,arguments)}function G(){return(G=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q();case 2:H.auth2.getAuthInstance().signOut(),window.location.replace("/");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(){return U.apply(this,arguments)}function U(){return(U=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j()({method:"delete",url:"".concat(v,"api/daily/")});case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),alert("error in requestAndStore-> sendPost: "+e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}window.onload=function(){H.load("client:auth2",P)};var _=function(e){return Object(T.jsx)("div",{class:"column is-three-fifths",children:Object(T.jsxs)("div",{id:"firstRead",children:[Object(T.jsxs)("div",{class:"block",children:[Object(T.jsx)("h1",{class:"title",style:{color:"lightblue"},children:"Analyze Your Calendar"}),Object(T.jsx)("h6",{class:"subtitle",style:{color:"gray"},children:"Made with Google Calendar API"})]}),Object(T.jsx)("hr",{style:{width:"100%"}}),Object(T.jsxs)("div",{class:"block",children:[Object(T.jsx)("p",{class:"homePageParagraph",children:" Analyze and learn how you spent your past days, weeks, or months from your google calendar."}),Object(T.jsx)("div",{class:"block",children:Object(T.jsxs)("p",{children:[" Pressing the 'Authorize' button authorizes this web app to read your google calendar events. Access to your calendar events data is terminated once you sign out. See ",Object(T.jsx)("a",{class:"tag is-primary is-light",children:" Privacy Policy "})," to learn more:"]})}),Object(T.jsx)("div",{class:"block",children:Object(T.jsxs)("button",{onClick:e.onClick,id:"authorize_button",class:"button is-primary",children:[Object(T.jsx)("span",{class:"icon",children:Object(T.jsx)("i",{class:"fab fa-google"})}),Object(T.jsx)("span",{id:"authorize_span",children:" Authorize"})]})})]})]})})},J=function(){return Object(T.jsx)("div",{class:"column",children:Object(T.jsxs)("div",{id:"authorize-view",children:[Object(T.jsx)("p",{children:" Currently the app is not verifed by Google as it is in a developement mode. You can use the following email and password for authorization."}),Object(T.jsx)("br",{}),Object(T.jsxs)("ul",{children:[Object(T.jsx)("li",{children:"username: comingSoon"}),Object(T.jsx)("li",{children:"password: comingSoon"})]}),Object(T.jsx)("br",{}),Object(T.jsxs)("p",{children:["Feel free to log in to ",Object(T.jsx)("a",{href:"https://accounts.google.com/signin/v2/identifier?service=cl&passive=1209600&osid=1&continue=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&followup=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&flowName=GlifWebSignIn&flowEntry=ServiceLogin",children:" Google Calendar"})," and update events as well"]})]})})},K=function(e){return Object(T.jsx)("div",{class:"hero-body",id:"home-page",children:Object(T.jsx)("div",{class:"container",children:Object(T.jsxs)("div",{class:"columns",children:[Object(T.jsx)(_,{onClick:e.onClick}),Object(T.jsx)(J,{})]})})})},Q=function(){return Object(T.jsx)("div",{id:"app",className:"App",children:Object(T.jsx)("header",{className:"App-header",children:Object(T.jsx)(K,{onClick:B})})})},Z=n(7),V=n(2);function X(){return Object(T.jsxs)("div",{class:"bgimg",style:{minHeight:"100%"},children:[Object(T.jsx)("div",{class:"topleft",children:Object(T.jsx)("p",{children:"GCAnalayzer"})}),Object(T.jsxs)("div",{class:"middle",children:[Object(T.jsx)("h1",{children:"COMING SOON"}),Object(T.jsx)("hr",{}),Object(T.jsx)($,{})]}),Object(T.jsx)("div",{class:"bottomleft",children:Object(T.jsxs)("p",{children:[" citation: ",Object(T.jsx)("a",{href:"https://www.w3schools.com/howto/howto_css_coming_soon.asp",children:" w3Schools "})," "]})})]})}var $=function(){var e=new Date("Dec 27, 2021 15:37:25"),t=O(new Date,e).days;return Math.floor(t)+" days"},ee=function(){return Object(T.jsx)(X,{})},te="http://localhost:5000/",ne=function(){function e(){return(e=Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j()({method:"delete",url:"".concat(te,"api/daily/")});case 3:t=e.sent,alert(JSON.stringify(t)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("error in requestAndStore-> sendPost: "+e.t0.message);case 10:W();case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return Object(T.jsxs)("div",{children:[Object(T.jsx)("div",{class:"block",children:" Contact me at merehatibebadane@gmail.com "}),Object(T.jsx)("button",{onClick:function(){return e.apply(this,arguments)},children:" Erase All Data "})]})};n(26);function ae(){return Object(T.jsxs)("div",{class:"navbar-brand",children:[Object(T.jsx)(Z.b,{to:"/home",class:"navbar-item",children:Object(T.jsxs)("span",{class:"icon-text",children:[Object(T.jsx)("span",{class:"icon",children:Object(T.jsx)("i",{class:"fas fa-history"})}),Object(T.jsx)("span",{class:"m-0 p-0 has-text-link",id:"logo",children:"GCAnalyzer"})]})}),Object(T.jsxs)("a",{role:"button",class:"navbar-burger","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample",children:[Object(T.jsx)("span",{"aria-hidden":"true"}),Object(T.jsx)("span",{"aria-hidden":"true"}),Object(T.jsx)("span",{"aria-hidden":"true"})]})]})}function ce(){var e=new Date,t=m(e),n=(new Date).getMonth();return Object(T.jsxs)("div",{id:"left-navbar-choices",class:"navbar-start",children:[Object(T.jsx)(Z.b,{id:"daily",to:"/daily/calName/all/".concat(e.toDateString()),class:"navbar-item",children:" Daily "},"period"),Object(T.jsx)(Z.b,{to:"/weekly/calName/all/".concat(t),class:"navbar-item",children:" Weekly "}),Object(T.jsx)(Z.b,{id:"monthly",to:"/monthly/calName/all/".concat(n),class:"navbar-item",children:" Monthly "}),Object(T.jsx)(Z.b,{id:"custom",to:"/custom",class:"navbar-item",children:" Custom "})]})}function re(e){return Object(T.jsxs)("div",{class:"navbar-end",id:"right-navbar-choices",children:[Object(T.jsxs)("div",{class:"navbar-item has-dropdown is-hoverable",children:[Object(T.jsx)("span",{class:"navbar-item",children:" More "}),Object(T.jsxs)("div",{class:"navbar-dropdown",children:[Object(T.jsx)("a",{disabled:!0,class:"navbar-item",children:"About"}),Object(T.jsx)(Z.b,{to:"/contact",class:"navbar-item",children:" Contatct Me "}),Object(T.jsx)(Z.b,{id:"refresh",to:"#",class:"navbar-item",children:" Refresh Data "}),Object(T.jsx)("hr",{class:"navbar-divider"}),Object(T.jsx)("a",{class:"navbar-item is-disabled",children:"Report an issue"})]})]}),Object(T.jsx)("div",{class:"navbar-item",children:Object(T.jsx)("div",{class:"buttons",children:Object(T.jsx)("button",{onClick:e.onSignout,id:"signout-button",class:"button is-primary",children:"Sign Out"})})})]})}document.addEventListener("DOMContentLoaded",(function(){var e=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);e.length>0&&e.forEach((function(e){e.addEventListener("click",(function(){var t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")}))}))}));var se=function(e){return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("nav",{class:"navbar is-light",role:"navigation","aria-label":"main navigation",children:[Object(T.jsx)(ae,{}),Object(T.jsxs)("div",{id:"navbarBasicExample",class:"navbar-menu",children:[Object(T.jsx)(ce,{}),Object(T.jsx)(re,{onSignout:e.onSignout})]})]}),Object(T.jsx)(V.a,{})]})},oe=function(){return Object(T.jsx)(X,{})},ie=n(9);var le=function(e){var t=Object(a.useState)(null),n=Object(ie.a)(t,2),c=n[0],r=n[1];if(Object(a.useEffect)((function(){fetch("https://react-g-calendar-analyzer.herokuapp.com"+e).then((function(e){return e.json()})).then((function(e){return r(e)}))}),[e]),c)return c},de=n(8),ue=n(28),je=(n(54),{counter:{productive:0,neutral:0,destructive:0,others:0},list:{productivityList:["education","med","work","tasks"],neturalList:["life"],destructiveList:["entertainment"]}});var he=function(e){var t,n;return"calName"==e.type?(t=[{Header:"Calendar",accessor:"calName"},{Header:"Hours",accessor:"totalHours"}],n=[{calName:"Loading",totalHours:0,id:"Loading"}]):(t=[{Header:"Event",accessor:"eventName"},{Header:"Hours",accessor:"totalHours"}],n=[{eventName:"Loading",totalHours:0,id:"Loading"}]),e.dataC&&(n=e.dataC),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(be,{columnsT:t,dataT:n})})};function be(e){var t=c.a.useMemo((function(){return e.columnsT}),[]),n=e.dataT,a=Object(ue.useTable)({columns:t,data:n}),r=a.getTableProps,s=a.getTableBodyProps,o=a.headerGroups,i=a.rows,l=a.prepareRow;return Object(T.jsxs)("table",Object(de.a)(Object(de.a)({class:"table"},r()),{},{style:{border:"solid 1px blue"},children:[Object(T.jsx)("thead",{children:o.map((function(e){return Object(T.jsx)("tr",Object(de.a)(Object(de.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(T.jsx)("th",Object(de.a)(Object(de.a)({},e.getHeaderProps()),{},{style:{border:"solid 1px blue",borderBottom:"solid 2px red",background:"aliceblue",color:"black",fontWeight:"bold"},children:e.render("Header")}))}))}))}))}),Object(T.jsx)("tbody",Object(de.a)(Object(de.a)({},s()),{},{children:i.map((function(e){return l(e),Object(T.jsx)("tr",Object(de.a)(Object(de.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(T.jsx)("td",Object(de.a)(Object(de.a)({},e.getCellProps()),{},{style:{padding:"10px",border:"solid 1px gray",background:"papayawhip"},children:e.render("Cell")}))}))}))}))}))]}))}function ge(e){return Math.round(100*e)+"%"}var Oe=function(e){e.data&&pe(e.data);var t=je.counter.productive+je.counter.neutral+je.counter.destructive+je.counter.others,n=[je.counter,{productive:ge(je.counter.productive/t),neutral:ge(je.counter.neutral/t),destructive:ge(je.counter.destructive/t)}];ge(je.counter.productive/t),ge(je.counter.neutral/t),ge(je.counter.destructive/t);return Object(T.jsxs)("div",{class:"column is-centered",children:["table"==e.show?Object(T.jsx)(be,{columnsT:[{Header:"Productive",accessor:"productive"},{Header:"Neutral",accessor:"neutral"},{Header:"Destructive",accessor:"destructive"}],dataT:n}):Object(T.jsx)(me,{data:je.counter}),Object(T.jsx)("div",{class:"column is-centered"}),Object(T.jsxs)("div",{class:"column is-centered",children:[Object(T.jsx)("strong",{children:" Total Hours Recorded: "})," ",I(t)]})]})},me=function(e){return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("div",{class:"column",children:[Object(T.jsx)("strong",{children:" Productive: "}),"  ",e.data.productive]}),Object(T.jsxs)("div",{class:"column",children:[Object(T.jsx)("strong",{children:" Neutral: "}),"  ",e.data.neutral]}),Object(T.jsxs)("div",{class:"column",children:[Object(T.jsx)("strong",{children:" Destructive: "}),"  ",e.data.destructive]})]})},pe=function(e){je.counter={productive:0,neutral:0,destructive:0,others:0},e.forEach((function(e){je.list.productivityList.includes(e.calName.toLowerCase())?je.counter.productive+=e.totalHours:je.list.neturalList.includes(e.calName.toLowerCase())?je.counter.neutral+=e.totalHours:je.list.destructiveList.includes(e.calName.toLowerCase())?je.counter.destructive+=e.totalHours:je.counter.others+=e.totalHours}))},xe=n(16),fe=function(e){var t=e.dateRange,n="";t.getDate()==h(new Date,-1).getDate()?n="Yesterday":t.getDate()==(new Date).getDate()?n="Today":t.getDate()==h(new Date,1).getDate()&&(n="Tomorrow");return Object(T.jsxs)("div",{class:"column is-centered is-4",children:[Object(T.jsx)("div",{class:"columns ",children:Object(T.jsxs)("div",{class:"column is-centered",children:[Object(T.jsxs)("h1",{children:[n," "]}),Object(T.jsx)(ve,{dateRange:e.dateRange,onClick:e.onClick,style:{height:10}})]})}),Object(T.jsx)(we,{onClick:e.onClick,dateRange:e.dateRange}),Object(T.jsxs)("p",{children:["Today's date is ",Object(T.jsxs)("strong",{children:[(new Date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})," "]})," , week ",m(new Date),"  "]})]})},ve=function(e){var t=e.dateRange;return t=t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),Object(T.jsxs)("div",{class:"field has-addons is-centered",children:[Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"left",id:"left-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-circle-left"})})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{class:"button textInside",children:Object(T.jsxs)("span",{id:"viewing",children:[" ",Object(T.jsxs)("strong",{children:[t," "]})]})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"right",id:"right-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-alt-circle-right"})})})})]})},we=function(e){var t={year:e.dateRange.getFullYear(),month:e.dateRange.getMonth()+1,day:e.dateRange.getDate()},n=Object(a.useState)(t),c=Object(ie.a)(n,2);c[0],c[1];return Object(T.jsx)(xe.Calendar,{value:t,onChange:e.onClick,colorPrimary:"#9c88ff",calendarClassName:"custom-calendar",calendarTodayClassName:"custom-today-day",shouldHighlightWeekends:!0})},ye=function(e){var t=m(new Date(e.dateRange.weekEndsOn)),n=m(new Date);t==n-1?t="".concat(t," (previous week)"):t==n?t="".concat(t," (current week)"):t==n+1&&(t="".concat(t," (next week)"));return Object(T.jsxs)("div",{class:"column is-centered",children:[Object(T.jsxs)("h1",{children:["  Your week ",t," summary "]}),Object(T.jsx)(ke,{dateRange:e.dateRange,onClick:e.onClick,style:{height:10}}),Object(T.jsx)(De,{onClick:e.onClick,dateRange:e.dateRange}),Object(T.jsxs)("p",{children:["Today's date is ",Object(T.jsxs)("strong",{children:[(new Date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})," "]})," , week ",m(new Date),"  "]})]})},ke=function(e){var t=e.dateRange.weekStartsOn,n=e.dateRange.weekEndsOn,a={weekday:"short",month:"short",day:"numeric"};return t=t.toLocaleDateString("en-US",a),n=n.toLocaleDateString("en-US",a),Object(T.jsxs)("div",{class:"field has-addons is-centered",children:[Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"left",id:"left-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-circle-left"})})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{class:"button textInside",children:Object(T.jsxs)("span",{id:"viewing",children:[" ",Object(T.jsxs)("strong",{children:[t," "]})," to ",Object(T.jsxs)("strong",{children:[" ",n," "]})]})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"right",id:"right-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-alt-circle-right"})})})})]})},De=function(e){var t=e.dateRange.weekStartsOn,n=e.dateRange.weekEndsOn,c={from:{year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate()},to:{year:n.getFullYear(),month:n.getMonth()+1,day:n.getDate()}},r=Object(a.useState)(c),s=Object(ie.a)(r,2);s[0],s[1];return Object(T.jsx)(xe.Calendar,{value:c,onChange:e.onClick,colorPrimary:"#0fbcf9",colorPrimaryLight:"rgba(75, 207, 250, 0.4)",shouldHighlightWeekends:!0})},Se=function(e){var t=e.dateRange;return Object(T.jsxs)("div",{class:"columns",children:[Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:t.weekStartsOn.toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),1).toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),2).toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),3).toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),4).toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),5).toDateString()})}),Object(T.jsx)("div",{class:"column",children:Object(T.jsx)(Ce,{date:h(new Date(t.weekStartsOn),6).toDateString()})})]})},Ce=function(e){var t=le("/api/daily/calName/all/".concat(e.date,"/none")),n=["Education","Entertainment","Life","MED","Work"],a={records:[]};if(t){var c=[];t.records.map((function(e){c.push(e.calName)}));for(var r=function(e){c.includes(n[e])?t.records.forEach((function(t){t.calName==n[e]&&(a.records[e]=t)})):a.records[e]={calName:n[e],totalHours:0}},s=0;s<n.length;s++)r(s);return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)("th",{class:"tc",style:{background:"aliceblue",color:"black",fontWeight:"bold",textAlign:"center",width:"85%"},children:e.date.slice(0,11)}),Object(T.jsx)(he,{dataC:a.records,type:"calName"})]})}return"Loading"},Me=function(e){var t=new Date(e.dateRange).getMonth(),n=(new Date).getMonth();t==n-1?t="".concat(t," (previous month)"):t==n?t="".concat(t," (current month)"):t==n+1&&(t="".concat(t," (next month)"));return Object(T.jsxs)("div",{class:"column is-centered",children:[Object(T.jsxs)("h1",{children:["  Your month ",t," summary "]}),Object(T.jsx)(Ne,{dateRange:e.dateRange,onClick:e.onClick,style:{height:10}}),Object(T.jsx)(Ae,{onClick:e.onClick,dateRange:e.dateRange}),Object(T.jsxs)("p",{children:["Today's date is ",Object(T.jsxs)("strong",{children:[(new Date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})," "]})," , week ",m(new Date),"  "]})]})},Ne=function(e){return Object(T.jsxs)("div",{class:"field has-addons is-centered",children:[Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"left",id:"left-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-circle-left"})})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{class:"button textInside",children:Object(T.jsxs)("span",{id:"viewing",children:[" ",Object(T.jsxs)("strong",{children:[" ",e.dateRange.toLocaleDateString("en-US",{month:"short",year:"numeric"})," "]})]})})}),Object(T.jsx)("p",{class:"control",children:Object(T.jsx)("button",{onClick:e.onClick,value:"right",id:"right-arrow",class:"button",children:Object(T.jsx)("span",{class:"icon is-small",children:Object(T.jsx)("i",{class:"fas fa-arrow-alt-circle-right"})})})})]})},Ae=function(e){var t={year:e.dateRange.getFullYear(),month:e.dateRange.getMonth()+1,day:1},n=new Date(e.dateRange);n.setMonth(e.dateRange.getMonth()+1),n.setDate(0);var c={from:t,to:{year:e.dateRange.getFullYear(),month:e.dateRange.getMonth()+1,day:n.getDate()}},r=Object(a.useState)(c),s=Object(ie.a)(r,2);s[0],s[1];return Object(T.jsx)(xe.Calendar,{value:c,onChange:e.onClick,colorPrimary:"#0fbcf9",colorPrimaryLight:"rgba(75, 207, 250, 0.4)",shouldHighlightWeekends:!0})},Re=window.gapi,Le=!0;function Ie(){return(Ie=Object(l.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(Le),t=x(),n="api/daily/calName/all/".concat(t.startOfSixMonthsAgo.toDateString(),"/none"),fetch(v+""+n).then((function(e){return e.json()})).then((function(e){if(0==e.records.length){Re.load("client:auth2",(function(){Re.client.init({apiKey:"AIzaSyBYxwNwT53EbvQNvhVCDD3FZW3KvTQWRBs",clientId:"958765352456-n0b4hg33876562lgerugi6qfei2jjaja.apps.googleusercontent.com",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],scope:"https://www.googleapis.com/auth/calendar.readonly"}).then(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return document.getElementById("monthly").style.visibility="hidden",document.getElementById("custom").style.visibility="hidden",e.next=4,D(t.startOfSixMonthsAgo,t.startOfTwoMonthsAgo);case 4:return e.next=6,D(t.startOfTwelveMonthsAgo,t.startOfSixMonthsAgo);case 6:document.getElementById("monthly").style.visibility="visible",document.getElementById("custom").style.visibility="visible";case 8:case"end":return e.stop()}}),e)}))),(function(e){console.log(JSON.stringify(e,null,2))}))}))}}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Te(){Le&&(console.log("calling FillDb"),function(){Ie.apply(this,arguments)}(),Le=!1);var e,t={weekStartsOn:new Date("Sun Oct 31 2021"),weekEndsOn:new Date("Sat Nov 5 2021")},n=new Date,a=Object(V.h)(),c=Object(V.g)(),r=a.period,s=a.type,o=a.specific,i=a.date,l=a.detail,d="/api/".concat(r,"/").concat(s,"/").concat(o,"/").concat(i,"/none"),u=le(d);if(!u||!u.records)return Object(T.jsx)(E,{});u&&(u=u.records).length&&(e=u.map(Ee),"weekly"==r?t=p(u[0].id):"monthly"==r&&(n=new Date(u[0].id)));var j=function(e){if(e.target&&e.target.id){if("right-arrow"==e.target.id)switch(r){case"daily":var t=h(new Date(i),1);i=t.toDateString();break;case"weekly":i=parseInt(i)+1;break;case"monthly":i=parseInt(i)+1,n.setMonth(n.getMonth()+1)}else if("left-arrow"==e.target.id)switch(r){case"daily":var a=h(new Date(i),-1);i=a.toDateString();break;case"weekly":i=parseInt(i)-1;break;case"monthly":i=parseInt(i)-1,n.setMonth(n.getMonth()-1)}c("/".concat(r,"/").concat(s,"/").concat(o,"/").concat(i))}else switch(r){case"daily":i=new Date("".concat(e.year,", ").concat(e.month,", ").concat(e.day)),c("/".concat(r,"/").concat(s,"/").concat(o,"/").concat(i.toDateString()));break;case"weekly":var l=m(i=new Date("".concat(e.from.year,", ").concat(e.from.month,", ").concat(e.from.day)));c("/".concat(r,"/").concat(s,"/").concat(o,"/").concat(l));break;case"monthly":var d=(n=new Date("".concat(e.from.year,", ").concat(e.from.month,", ").concat(e.from.day))).getMonth();c("/".concat(r,"/").concat(s,"/").concat(o,"/").concat(d))}};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("div",{class:"columns",style:{"margin-top":"auto","border-top":"1px solid gray"},children:["daily"==r&&Object(T.jsx)(fe,{onClick:function(e){return j(e)},dateRange:new Date(i)}),"weekly"==r&&Object(T.jsx)(ye,{onClick:function(e){return j(e)},dateRange:t}),"monthly"==r&&Object(T.jsx)(Me,{onClick:function(e){return j(e)},dateRange:n}),e&&Object(T.jsx)(he,{dataC:e,type:s,onClick:function(e){return j(e)},dateRange:new Date(i)}),Object(T.jsx)(V.a,{}),Object(T.jsx)(Oe,{data:u,show:l?"text":"table"})]}),"weekly"==r&&Object(T.jsx)(Se,{dateRange:t})]})}function Ee(e){return{calName:Object(T.jsx)(Z.c,{style:function(e){return{color:e.isActive?"red":""}},to:"./".concat(e.calName),children:e.calName},e.calName),totalHours:e.totalHours}}function He(e){var t=Object(V.h)(),n="/api",a=t.period,c=t.type,r=t.specific,s=t.date,o=t.detail;"calName"==c?n="/api/".concat(a,"/eventName/").concat(r,"/").concat(s,"/").concat(o):"eventName"==c&&alert("coming soon");var i=le(n);return i?(i=i.records,Object(T.jsx)(he,{dataC:i,type:"eventName"})):Object(T.jsx)("h1",{children:" Loading..."})}function Pe(){return Object(T.jsx)(Z.a,{children:Object(T.jsxs)(V.d,{children:[Object(T.jsx)(V.b,{path:"/",element:Object(T.jsx)(Q,{})}),Object(T.jsxs)(V.b,{path:"/",element:Object(T.jsx)(se,{onSignout:W}),children:[Object(T.jsx)(V.b,{path:"/home",element:Object(T.jsx)(ee,{})}),Object(T.jsx)(V.b,{path:"/contact",element:Object(T.jsx)(ne,{})}),Object(T.jsxs)(V.b,{path:"/:period/:type/:specific/:date",element:Object(T.jsx)(Te,{}),children:["    ",Object(T.jsx)(V.b,{path:"/:period/:type/:specific/:date/:detail",element:Object(T.jsx)(He,{})})]}),Object(T.jsx)(V.b,{path:"/custom",element:Object(T.jsx)(oe,{})})]})]})})}s.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(Pe,{})}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.6166a607.chunk.js.map