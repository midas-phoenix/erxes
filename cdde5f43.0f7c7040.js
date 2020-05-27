(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{193:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return c}));var a=n(2),r=n(9),o=(n(0),n(206)),l={id:"heroku",title:"Heroku"},p={id:"installation/heroku",title:"Heroku",description:"Learn how to deploy Erxes on Heroku.",source:"@site/docs/installation/heroku.md",permalink:"/installation/heroku",editUrl:"https://github.com/erxes/erxes/edit/develop/docs/docs/installation/heroku.md",lastUpdatedBy:"Munkhjargal",lastUpdatedAt:1590570298,sidebar:"docs",previous:{title:"Docker",permalink:"/installation/docker"},next:{title:"AWS Marketplace",permalink:"/installation/aws"}},i=[{value:"Deploying Erxes on Heroku",id:"deploying-erxes-on-heroku",children:[]},{value:"One Click deployment",id:"one-click-deployment",children:[{value:"1. Install erxes",id:"1-install-erxes",children:[]},{value:"2. Install erxes API",id:"2-install-erxes-api",children:[]},{value:"3. Install erxes Widgets",id:"3-install-erxes-widgets",children:[]}]},{value:"Extra features",id:"extra-features",children:[{value:"4. Install Logger",id:"4-install-logger",children:[]},{value:"5. Install erxes integrations",id:"5-install-erxes-integrations",children:[]}]}],s={rightToc:i};function c(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Learn how to deploy Erxes on Heroku."),Object(o.b)("h2",{id:"deploying-erxes-on-heroku"},"Deploying Erxes on Heroku"),Object(o.b)("p",null,"Heroku is a container-based cloud Platform as a Service (PaaS)."),Object(o.b)("p",null,"In order to deploy erxes and other related apps, you will need ",Object(o.b)("inlineCode",{parentName:"p"},"mLab MongoDB")," (MongoDB), ",Object(o.b)("inlineCode",{parentName:"p"},"Heroku Redis")," (Redis), and ",Object(o.b)("inlineCode",{parentName:"p"},"CloudAMQP")," (RabbitMQ) addons."),Object(o.b)("p",null,"To add any addon to an app, you will need to register your credit card. So please add your creadit card and verify your account prior to proceeding further."),Object(o.b)("h2",{id:"one-click-deployment"},"One Click deployment"),Object(o.b)("p",null,"In this installation guide, we pretend the following app names will be available on Heroku and they will be used to demonstrate - we expect you to choose any available names on Heroku."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"erxes")," - ",Object(o.b)("strong",{parentName:"li"},"erxes")," ",Object(o.b)("inlineCode",{parentName:"li"},"(https://erxes.herokuapp.com)")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"erxes API")," - ",Object(o.b)("strong",{parentName:"li"},"erxes-api")," ",Object(o.b)("inlineCode",{parentName:"li"},"(https://erxes-api.herokuapp.com)")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"erxes Widget")," - ",Object(o.b)("strong",{parentName:"li"},"erxes-widget")," ",Object(o.b)("inlineCode",{parentName:"li"},"(https://erxes-widget.herokuapp.com)"))),Object(o.b)("p",null,"Try the following 3 steps to install all required apps on Heroku."),Object(o.b)("h3",{id:"1-install-erxes"},"1. Install erxes"),Object(o.b)("p",null,"Please try clicking the deploy button below, then set all the config vars and hit the Deploy app button."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Config vars:")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"REACT_APP_API_SUBSCRIPTION_URL = ws://erxes-api.herokuapp.com/subscriptions\nREACT_APP_API_URL = https://erxes-api.herokuapp.com\nREACT_APP_CDN_HOST = https://erxes-widget.herokuapp.com\n")),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://heroku.com/deploy?template=https://github.com/erxes/erxes/tree/develop"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://www.herokucdn.com/deploy/button.svg#heroku",alt:"Deploy erxes",title:"Deploy erxes"})))),Object(o.b)("h3",{id:"2-install-erxes-api"},"2. Install erxes API"),Object(o.b)("p",null,"Now it's time to install erxes API - click the button below and set the config vars."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Config vars:")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),'PORT = 3300\nPORT_CRONS = 3600\nPORT_WORKERS = 3700\nDOMAIN = https://erxes-api.herokuapp.com\nMAIN_APP_DOMAIN = https://erxes.herokuapp.com\nMONGO_URL = mongodb:// # leave it as is, we will update it later on\nRABBITMQ_HOST = RABBITMQ_HOST # we will update it later on\nREDIS_HOST = REDIS_HOST # we will update it later on\nREDIS_PASSWORD = REDIS_PASS # we will update it later on\nREDIS_PORT = 28229 # update it later on\nJWT_TOKEN_SECRET: "replact it with your token"\nLOGS_API_DOMAIN = "update it when you install logger app"\nINTEGRATIONS_API_DOMAIN = "update it when you install integrations app"\n')),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://heroku.com/deploy?template=https://github.com/erxes/erxes-api/tree/develop"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://www.herokucdn.com/deploy/button.svg#heroku",alt:"Deploy erxes API",title:"Deploy erxes API"})))),Object(o.b)("p",null,"Now go to Heroku dashboard and select the ",Object(o.b)("strong",{parentName:"p"},"erxes-api app")," from the Apps tab."),Object(o.b)("p",null,"Go to Settings tab where you can manage your Config Vars as you need to update config vars of ",Object(o.b)("strong",{parentName:"p"},"erxes-api")," app."),Object(o.b)("p",null,"In the Config Vars section, click a button 'Reveal Config Vars' so that you will be able to see all the config vars."),Object(o.b)("p",null,"Copy MONGO_URI's value and paste it into MONGO_URL."),Object(o.b)("p",null,"Copy RABBITMQ_URL's value and paste into RABBITMQ_HOST."),Object(o.b)("p",null,"Update REDIS_HOST, REDIS_PASSWORD, and REDIS_PORT values using REDIS_URL's value."),Object(o.b)("p",null,"Please now go to Resources tab as you will need to start ",Object(o.b)("inlineCode",{parentName:"p"},"cronjob")," and ",Object(o.b)("inlineCode",{parentName:"p"},"worker")," processes.\nStart ",Object(o.b)("inlineCode",{parentName:"p"},"cronjob")," and ",Object(o.b)("inlineCode",{parentName:"p"},"worker"),"."),Object(o.b)("h4",{id:"load-initial-data"},"Load initial data"),Object(o.b)("p",null,"The last step is to insert initial data. To do that you will need to clone ",Object(o.b)("inlineCode",{parentName:"p"},"erxes-api")," repo and ",Object(o.b)("inlineCode",{parentName:"p"},"mongorestore")," tool."),Object(o.b)("p",null,"Clone the ",Object(o.b)("inlineCode",{parentName:"p"},"erxes-api")," and run the following commands in the terminal."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"cd erxes-api/src")),Object(o.b)("p",null,"The below command will create initial permission groups, permissions, growth hack templates, email templates and some sample data."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"mongorestore --host=<host> --port=<port> -u <user> -d <db> initialData")),Object(o.b)("p",null,"If do not want to load sample data then you can run following command just to load permissions."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"mongorestore --host=<host> --port=<port> -u <user> -d <db> permissionData")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Note"),": extract ",Object(o.b)("inlineCode",{parentName:"p"},"host"),", ",Object(o.b)("inlineCode",{parentName:"p"},"port"),", ",Object(o.b)("inlineCode",{parentName:"p"},"user"),", ",Object(o.b)("inlineCode",{parentName:"p"},"db")," from the ",Object(o.b)("inlineCode",{parentName:"p"},"MONGO_URI")," config var."),Object(o.b)("p",null,"Now you can log into ",Object(o.b)("inlineCode",{parentName:"p"},"https://erxes.herokuapp.com")," using the following credentials."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"username: admin@erxes.io\npassword: erxes\n")),Object(o.b)("h3",{id:"3-install-erxes-widgets"},"3. Install erxes Widgets"),Object(o.b)("p",null,"Now install erxes Widget app by clicking the deploy button below and set config vars."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Config vars:")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"ROOT_URL = https://erxes-widget.herokuapp.com\nAPI_URL = https://erxes-api.herokuapp.com\nAPI_SUBSCRIPTIONS_URL = wss://erxes-api.herokuapp.com/subscriptions\nPORT = 3200\n")),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://heroku.com/deploy?template=https://github.com/batnasan/erxes-widgets-heroku-button"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://www.herokucdn.com/deploy/button.svg#heroku",alt:"Deploy Widgets",title:"Deploy erxes Widgets"})))),Object(o.b)("p",null,"Now it's time to grab yourself a cup of coffee and enjoy using ",Object(o.b)("strong",{parentName:"p"},"erxes"),"."),Object(o.b)("h2",{id:"extra-features"},"Extra features"),Object(o.b)("p",null,"There is a several apps available for you to install and make erxes even more powerful.",Object(o.b)("br",{parentName:"p"}),"\n","The steps of installing them are same as above."),Object(o.b)("h3",{id:"4-install-logger"},"4. Install Logger"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Config vars:")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"PORT = 3800\nMONGO_URL = MONGO_URL # we will update it later on\nRABBITMQ_HOST = copy and paste from erxes-api RABBITMQ_HOST config var\n")),Object(o.b)("p",null,"Once the app is deployed, go to ",Object(o.b)("inlineCode",{parentName:"p"},"Settings")," and click ",Object(o.b)("inlineCode",{parentName:"p"},"Config Vars")," button.",Object(o.b)("br",{parentName:"p"}),"\n","Copy ",Object(o.b)("inlineCode",{parentName:"p"},"MONGO_URI"),"'s value and paste it into ",Object(o.b)("inlineCode",{parentName:"p"},"MONGO_URL"),"."),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://heroku.com/deploy?template=https://github.com/batnasan/erxes-logger-heroku-button"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://www.herokucdn.com/deploy/button.svg#heroku",alt:"Deploy Widgets",title:"Deploy erxes integrations"})))),Object(o.b)("h3",{id:"5-install-erxes-integrations"},"5. Install erxes integrations"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Config vars:")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"PORT = 3400\nDOMAIN = https://erxes-integration.herokuapp.com\nMAIN_API_DOMAIN = API domain\nMAIN_APP_DOMAIN = Front app domain\nMONGO_URL = INTEGRATION_MONGO_URL # we will update it later on\nRABBITMQ_HOST = copy and paste from erxes-api RABBITMQ_HOST config var\nREDIS_HOST = copy and paste from erxes-api REDIS_HOST config var\nREDIS_PASSWORD = copy and paste from erxes-api REDIS_PASSWORD config var\nREDIS_PORT = copy and paste from erxes-api REDIS_PORT config var\n")),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://heroku.com/deploy?template=https://github.com/erxes/erxes-integrations/tree/develop"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://www.herokucdn.com/deploy/button.svg#heroku",alt:"Deploy Widgets",title:"Deploy erxes integrations"})))),Object(o.b)("p",null,"Once the app is deployed, go to ",Object(o.b)("inlineCode",{parentName:"p"},"Settings")," and click ",Object(o.b)("inlineCode",{parentName:"p"},"Config Vars")," button.",Object(o.b)("br",{parentName:"p"}),"\n","Copy ",Object(o.b)("inlineCode",{parentName:"p"},"MONGODB_URI"),"'s value and paste it into ",Object(o.b)("inlineCode",{parentName:"p"},"MONGO_URL"),"."))}c.isMDXComponent=!0},206:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return O}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),c=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},b=function(e){var t=c(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),b=c(n),d=a,O=b["".concat(l,".").concat(d)]||b[d]||u[d]||o;return n?r.a.createElement(O,p(p({ref:t},s),{},{components:n})):r.a.createElement(O,p({ref:t},s))}));function O(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var s=2;s<o;s++)l[s]=n[s];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);