var danielmiessler_js=(function(){const DM_SETTINGS=(danielmiessler_js_settings)?danielmiessler_js_settings:false;const NEWSLETTER_TIMEOUT=180000
const inBrowser=typeof window!=='undefined';const UA=inBrowser&&window.navigator.userAgent.toLowerCase()
const isIE=UA&&/msie|trident/.test(UA)
const isMobile=UA&&(UA.indexOf('android')>0||/iphone|ipad|ipod|ios/.test(UA))
const DOC_EL=document
const DOC_TITLE=encodeURIComponent(DOC_EL.title.replace(' - danielmiessler.com',''))
const DOC_LOCATION=encodeURIComponent(DOC_EL.location)
const LOG=(msg)=>console.log(msg)
const DOCUMENT_HEIGHT=Math.max(DOC_EL.body.scrollHeight,DOC_EL.body.offsetHeight,DOC_EL.documentElement.clientHeight,DOC_EL.documentElement.scrollHeight,DOC_EL.documentElement.offsetHeight);const WINDOW_HEIGHT=()=>window.innerHeight||DOC_EL.documentElement.clientHeight||DOC_EL.getElementsByTagName('body')[0].clientHeight;const HAS_CLASS=(name)=>DOC_EL.body.className.indexOf(name)>-1
const ADD_CLASS=(name)=>DOC_EL.body.className+=' '+name
const REMOVE_CLASS=(name)=>DOC_EL.body.className=DOC_EL.body.className.replace(' '+name,'')
const SHARE_LINKEDIN=()=>'https://www.linkedin.com/shareArticle?mini=true&url='+DOC_LOCATION+'&title='+DOC_TITLE
const SHARE_TWITTER=()=>'https://twitter.com/share?url='+DOC_LOCATION+'&text='+DOC_TITLE
const SHARE_FACEBOOK=()=>'http://www.facebook.com/sharer.php?u='+DOC_LOCATION+'&t='+DOC_TITLE
const SHARE_GOOGLE=()=>'https://plus.google.com/share?url='+DOC_LOCATION
const SHARE_MAIL=()=>'mailto:?subject=This%20Post%20on%20danielmiessler.com&cc=daniel@danielmiessler.com&body='+DOC_LOCATION
const SHARE_REDDIT=()=>'https://www.reddit.com/submit?url='+DOC_LOCATION+'&title='+DOC_TITLE
const SHARE_COMMENT=()=>'https://www.reddit.com/submit?url='+DOC_LOCATION+'&title='+DOC_TITLE
const SHARE_HACKERNEWS=()=>'http://news.ycombinator.com/submitlink?u='+DOC_LOCATION+'&t='+DOC_TITLE;const COOKIE_CREATE=(name,value,days)=>{let expires="";if(days){let date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000))
expires="; expires="+date.toGMTString()}else{expires="";}
document.cookie=name+"="+value+expires+"; path=/";}
const COOKIE_READ=(name)=>{let nameEQ=name+"=";let ca=document.cookie.split(';');for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
const COOKIE_ERASE=(name)=>{createCookie(name,"",-1);}
function handleScrollFX(){var instance={}
var settings={top:{percent:20,pixels:200,},bottom:{percent:95,},scroll_timeout:null}
var state={watching_scroll:true,event_attached:false,event_destroyed:false,scroll:{pixels:{current:0,prev:0},percent:{current:0,prev:0},scroll_direction:''}}
var view_controller={scroll_disabled:function(){if(!HAS_CLASS('scrolling-fx-disabled'))ADD_CLASS('scrolling-fx-disabled')},scroll_up:function(){REMOVE_CLASS('scrolling-down')
if(!HAS_CLASS('scrolling-up'))ADD_CLASS('scrolling-up')},scroll_down:function(){REMOVE_CLASS('scrolling-up')
if(!HAS_CLASS('scrolling-down'))ADD_CLASS('scrolling-down')},scroll_reset:function(){REMOVE_CLASS('scrolling-down')
REMOVE_CLASS('scrolling-up')},page_mid:function(){REMOVE_CLASS('bottom-page')
if(!HAS_CLASS('mid-page'))ADD_CLASS('mid-page')},page_bottom:function(){REMOVE_CLASS('mid-page')
if(!HAS_CLASS('bottom-page'))ADD_CLASS('bottom-page')},page_reset:function(){REMOVE_CLASS('mid-page')
REMOVE_CLASS('bottom-page')}}
var init=function(){window.addEventListener('resize',resizeHandler)
attach_scroll_events()
instance.setup=true}
var attach_scroll_events=function(){if(checkCanUseScrollFX()){if(!state.event_attached){window.addEventListener('scroll',scrollHandler)
state.event_attached=true
state.event_destroyed=false}}else{if(!state.event_destroyed){window.removeEventListener('scroll',scrollHandler)
state.event_destroyed=true
state.event_attached=false}}}
var getScrollPosition=instance.getScrollPosition=function(){var val=(window.pageYOffset||document.scrollTop)-(document.clientTop||0);return(!isNaN(val))?val:0;}
var getScrollPercent=instance.getScrollPercent=function(){var val=(state.scroll.pixels.current/(DOCUMENT_HEIGHT-WINDOW_HEIGHT()))*100
return(!isNaN(val))?val:0;}
var getScrollDirection=instance.getScrollDirection=function(){var val=(window.pageYOffset||document.scrollTop)-(document.clientTop||0);return(state.scroll.pixels.current>=state.scroll.pixels.prev)?'down':'up'}
var setCurrentValues=function(){state.scroll.pixels.current=getScrollPosition();state.scroll.percent.current=getScrollPercent()}
var setPrevValues=function(){state.scroll.pixels.prev=state.scroll.pixels.current
state.scroll.percent.prev=state.scroll.percent.current}
var setDirection=function(){state.scroll_direction=getScrollDirection()}
var checkCanUseScrollFX=function(){return state.watching_scroll=(DOCUMENT_HEIGHT-WINDOW_HEIGHT())>500}
var setAll=function(){setPrevValues()
setCurrentValues()
setDirection()
if(state.scroll.pixels.current>settings.top.pixels){if(state.scroll.percent.current>settings.bottom.percent){view_controller.page_bottom()}else{view_controller.page_mid()}}else{view_controller.page_reset()}
if(state.scroll.percent.current<settings.bottom.percent&&state.scroll.percent.current>7&&state.scroll_direction==='up'){if((state.scroll.percent.prev-state.scroll.percent.current)>0.5){view_controller.scroll_up()}}else if(state.scroll.percent.current<settings.bottom.percent&&state.scroll.percent.current>10&&state.scroll_direction==='down'){if((state.scroll.percent.current-state.scroll.percent.prev)>2){view_controller.scroll_down()}}else{view_controller.scroll_reset()}}
var scrollendHandler=function(){setAll()}
var scrollHandler=throttle(function(event){if(settings.scroll_timeout!==null){clearTimeout(settings.scroll_timeout);}
if(state.watching_scroll){setAll()
settings.scroll_timeout=setTimeout(scrollendHandler,250);}},80)
var resizeHandler=throttle(function(event){attach_scroll_events()
if(state.watching_scroll){setAll()}},200)
if(!instance.setup){init();}
return instance}
function danielmiesslerMobileNav(){var nav_toggler=DOC_EL.getElementById('main-menu-toggle')||false;var site_inner=DOC_EL.getElementsByClassName('site-inner')[0]||false;var site_container=DOC_EL.getElementsByClassName('site-container')[0]||false;if(!nav_toggler)return false;var clicker=function(evt){evt.preventDefault()
console.log(evt)
if(HAS_CLASS('mobile-menu-active')){REMOVE_CLASS('mobile-menu-active');site_container.removeAttribute('style')
site_inner.removeEventListener('click',clicker);}else{ADD_CLASS('mobile-menu-active')
site_container.setAttribute('style','height:'+WINDOW_HEIGHT()+'px')
site_inner.addEventListener('click',clicker);}}
nav_toggler.addEventListener('click',clicker);};function throttle(callback,limit){let wait=false;return function(){if(!wait){callback.call();wait=true;setTimeout(function(){wait=false},limit);}}}
function social_shares(){function init(){var social_button=DOC_EL.querySelectorAll('.share-js a');for(var i=0;i<social_button.length;i++){var button=social_button[i];dm_social_click_handler(button,button.dataset.dmShare)}}
function dm_social_click_handler(obj,location){var map_social={'linkedin':()=>SHARE_LINKEDIN(),'twitter':()=>SHARE_TWITTER(),'facebook':()=>SHARE_FACEBOOK(),'google-plus':()=>SHARE_GOOGLE(),'mail':()=>SHARE_MAIL(),'reddit':()=>SHARE_REDDIT(),'google':()=>SHARE_GOOGLE(),'comment':()=>SHARE_COMMENT(),'hackernews':()=>SHARE_HACKERNEWS()};obj.addEventListener('click',function(e){e.preventDefault();if(location!=='mail'){var y=window.top.outerHeight/2+window.top.screenY-(400/2)
var x=window.top.outerWidth/2+window.top.screenX-(500/2)
objWindow=window.open(map_social[location](),'Social Share','width=500,height=400,resizable=no,top='+y+',left='+x).focus();}else{window.location=map_social[location]();}
if(typeof gtag==='function'){gtag('event','Click - Social Share - '+location,{'event_category':'Social Share','event_label':DOC_TITLE,'non_interaction':true});}});}
init();}
function Header_Search(){var setup=false;var active=false;var search_toggle=document.getElementById('top-search-toggle');var search_form=document.getElementById('dmt1-search-form');var init=function(){search_toggle.addEventListener('click',function(e){e.preventDefault();active=(active===true)?false:true;if(active===true){showSearch();}else{hideSearch();}})
setup=true;};var showSearch=function(){if(!HAS_CLASS('show-search'))ADD_CLASS('show-search')
var input=search_form.querySelector('input[type="search"]');input.focus()
active=true;};var hideSearch=function(){REMOVE_CLASS('show-search')
active=false;};var resetSearch=function(){};if(setup===false){init();}};function do_dropcaps(){var find=(function(){var found;var cc=document.getElementsByClassName('entry-content')[0];var cp=cc.querySelectorAll('p');for(var c=0;c<5;c++){if(cp[c].innerText!==''&&cp[c].classList.value.indexOf('wp-caption')===-1&&cp[c].parentNode.classList.value.indexOf('entry-content')>-1){found=cp[c];break;}}
return found}())
if(find){if(find.childNodes.length&&find.childNodes[0].nodeName!=='A'&&find.childNodes[0].nodeName!=='IMG'){find.innerHTML=find.innerHTML.replace(/\b(\w)/,'<span class="dropcaps">$&</span>');}}}
function dm_newsletter_popup(){var controls={'body':DOC_EL.body,'popup':DOC_EL.getElementById('dm-newsletter-popup'),'close_newsletter':DOC_EL.getElementById('dm-newsletter-close'),'newsletter':DOC_EL.getElementById('mc-embedded-subscribe-form')};if(COOKIE_READ('dm_ns_close')!=='1'){controls.close_newsletter.addEventListener('click',function(){togglePopup(false);COOKIE_CREATE('dm_ns_close','1',30);if(typeof gtag==='function'){gtag('event','Close',{'event_category':'Newsletter Popup','event_label':DOC_TITLE,'non_interaction':true});}});controls.newsletter.addEventListener('submit',function(){if(typeof gtag==='function'){gtag('event','Submit',{'event_category':'Newsletter Popup','event_label':DOC_TITLE,'transport':'beacon'});}
togglePopup(false);COOKIE_CREATE('dm_ns_close','1',365);return true;});DOC_EL.onkeydown=function(evt){if(controls.body.dataset.popupActive==='1'){var isEscape=false;if("key"in evt){isEscape=(evt.key=="Escape"||evt.key=="Esc");}else{isEscape=(evt.keyCode==27);}
if(isEscape){togglePopup(false);}}};if(window.location.path!=='/'){setTimeout(function(){togglePopup(true);},NEWSLETTER_TIMEOUT);}
if(window.location.search=='?popup'){togglePopup(true);}}
function togglePopup(pos){if(pos){controls.body.dataset.popupActive=(pos)?'1':'0';}else{controls.body.dataset.popupActive=(typeof controls.body.dataset.popupActive==='undefined'||controls.body.dataset.popupActive==='0')?1:0;}
if(typeof gtag==='function'){var position=(!pos)?'Close':'Open';gtag('event',position,{'event_category':'Newsletter Popup','event_label':DOC_TITLE,'non_interaction':true});}}}
try{danielmiesslerMobileNav()}catch(e){if(typeof gtag==='function'){gtag('event','JS',{'event_category':'Error','event_label':'Function init - danielmiesslerMobileNav','non_interaction':true})}}
try{social_shares()}catch(e){if(typeof gtag==='function'){gtag('event','JS',{'event_category':'Error','event_label':'Function init - social_shares','non_interaction':true});}}
try{if(!isMobile&&DOC_EL.documentElement.clientWidth>680){handleScrollFX()}}catch(e){if(typeof gtag==='function'){gtag('event','JS',{'event_category':'Error','event_label':'Function init - addScrollTriggers','non_interaction':true});}}
try{if(!isMobile&&DOC_EL.documentElement.clientWidth>680){dm_newsletter_popup()}}catch(e){if(typeof gtag==='function'){gtag('event','JS',{'event_category':'Error','event_label':'Function init - dm_newsletter_popup','non_interaction':true});}}
try{Header_Search()}catch(e){if(typeof gtag==='function'){gtag('event','JS',{'event_category':'Error','event_label':'Function init - dm_newsletter_popup','non_interaction':true});}}
try{var disabled=(DM_SETTINGS&&typeof DM_SETTINGS.disableDropcaps!=='undefined')?DM_SETTINGS.disableDropcaps:'1'
if(disabled!=='1'){do_dropcaps()}}catch(e){}}());
var dm_event_tracking_data={dm_primary_nav:{parent_selector_attr:'id',parent_selector_value:'menu-main-menu',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Primary Menu'},dm_site_title:{parent_selector_attr:'class',parent_selector_value:'site-title',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Header Logo'},dm_breadcrumbs:{parent_selector_attr:'class',parent_selector_value:'breadcrumb',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Breadcrumb'},dm_entry_meta:{parent_selector_attr:'class',parent_selector_value:'entry-categories',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Blog Category'},dm_entry_title:{parent_selector_attr:'class',parent_selector_value:'entry-title',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Blog Title'},dm_blog_photo:{parent_selector_attr:'',parent_selector_value:'body',selector_tag:'a',selector_attr:'class',selector_value:'entry-image-link',trigger:'click',label:'{title}',category:'Link',action:'Blog Photo'},dm_sidebar_links:{parent_selector_attr:'class',parent_selector_value:'sidebar',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Sidebar'},dm_related_posts:{parent_selector_attr:'class',parent_selector_value:'yarpp-related',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Related Posts'},dm_popular_posts:{parent_selector_attr:'class',parent_selector_value:'explore-content',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Popular Posts'},dm_popular_posts:{parent_selector_attr:'id',parent_selector_value:'support-daniel-single',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Single Support Box'},dm_related_posts_other:{parent_selector_attr:'class',parent_selector_value:'relatedthumb',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{url}',category:'Link',action:'Related Posts'},dm_social_comment:{parent_selector_attr:'',parent_selector_value:'body',selector_tag:'a',selector_attr:'class',selector_value:'top_social',trigger:'click',label:'{title}',category:'Link',action:'Social Comment'},dm_explore_more:{parent_selector_attr:'class',parent_selector_value:'explore',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Explore More'},dm_footer_links:{parent_selector_attr:'class',parent_selector_value:'site-footer',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Footer Menu'},dm_page_toc_link:{parent_selector_attr:'class',parent_selector_value:'toc',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'TOC Link - {page_title}'},dm_page_collection_link:{parent_selector_attr:'class',parent_selector_value:'collection',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Collection Link - {page_title}'},dm_form_sidebar_mc:{parent_selector_attr:'class',parent_selector_value:'sidebar',selector_tag:'form',selector_attr:'id',selector_value:'mc-embedded-subscribe-form',trigger:'submit',label:'Sidebar Subscribe',category:'Form',action:'Submit'},dm_form_sidebar_mc:{parent_selector_attr:'class',parent_selector_value:'entry-before',selector_tag:'a',selector_attr:'href',selector_value:'*',trigger:'click',label:'{title}',category:'Link',action:'Before Page Sponsor Ad'},}
if(window.addEventListener){window.addEventListener('load',doAutoEventTracking,false);}else if(window.attachEvent){window.attachEvent('onload',doAutoEventTracking);}
function doAutoEventTracking(){"use strict"
var attempts=0,get_attempts=function(){return attempts;},set_attempts=function(){return attempts++;},get_ga=function(){if(get_attempts()>=10){console.warn('Google Analytics never loaded');return false;}
if(typeof gtag!=='function'){setTimeout(function(){set_attempts();get_ga();},250);}else{return true;}};if(get_ga()){window.get_dm_ga=new ga_auto_event_tracking();}}
function ga_auto_event_tracking(){this.doTracking();};ga_auto_event_tracking.prototype.doTracking=function(){var tracking_params=dm_event_tracking_data||false;if(!tracking_params)return false;for(var key in tracking_params){if(!tracking_params.hasOwnProperty(key))continue;var obj=tracking_params[key];var tracking_element_parent=this.getElementParent(obj);var tracking_elements;if(!tracking_element_parent)continue;if(tracking_element_parent!==false&&typeof tracking_element_parent!=='undefined'){tracking_elements=this.getElementsByAttribute(tracking_element_parent,obj.selector_tag,obj.selector_attr,obj.selector_value);}
if(tracking_elements){for(var i=0,obj_length=tracking_elements.length;i<obj_length;i++){var element=tracking_elements[i],category=(obj.category.indexOf('{')>-1)?this.helperGetLabel(obj.category,element):obj.category,action=(obj.action.indexOf('{')>-1)?this.helperGetLabel(obj.action,element):obj.action,label=(obj.label.indexOf('{')>-1)?this.helperGetLabel(obj.label,element):obj.label,action_type=this.getEventTriggerType(obj);this.addEventTriggerHandler(element,category,action,label,action_type);}}}};ga_auto_event_tracking.prototype.getElementsByAttribute=function(elm,selector_tag,selector_attr,selector_value){var elements_arr=(selector_tag=="*"&&elm.all)?elm.all:elm.getElementsByTagName(selector_tag),return_elements=[],attribute_value=(typeof selector_value!="undefined")?new RegExp("(^|\\s)"+selector_value+"(\\s|$)"):null,current,attribute;for(var i=0;i<elements_arr.length;i++){current=elements_arr[i];attribute=current.getAttribute&&current.getAttribute(selector_attr);if(typeof attribute=="string"&&attribute.length>0){if(typeof selector_value=="undefined"||(attribute_value&&attribute_value.test(attribute))){return_elements.push(current);}}}
return return_elements;}
ga_auto_event_tracking.prototype.getElementParent=function(obj){var ep=false;if(obj.parent_selector_attr){ep=this.getElementsByAttribute(document.body,"*",obj.parent_selector_attr,obj.parent_selector_value);ep=(ep[0])?ep[0]:false;}else{ep=document.body;}
return ep;};ga_auto_event_tracking.prototype.getEventTriggerType=function(obj){var at=(obj.trigger)?obj.trigger.trim().toLowerCase():'';var allowed_action_types=["click","dblclick","focus","blur","change","submit"];at=(allowed_action_types.indexOf(at)>-1)?at:null;return at;};ga_auto_event_tracking.prototype.addEventTriggerHandler=function(obj,category,action,label,action_type){var ogb=this;obj.addEventListener(action_type,function(){console.log('event',category,action,label)
gtag('event',action,{'event_category':category,'event_label':label});});};ga_auto_event_tracking.prototype.helperGetLabel=function(str,element){str=(str.indexOf('{url}')>-1)?str.replace('{url}',this.helperGetElementUrl(element)):str;str=(str.indexOf('{title}')>-1)?str.replace('{title}',this.helperGetElementText(element)):str;str=(str.indexOf('{page_title}')>-1)?str.replace('{page_title}',this.helperGetPageTitle()):str;return str;}
ga_auto_event_tracking.prototype.helperGetElementText=function(element){var et=element.textContent||element.innerText;if(typeof et!=='string'||et.length<1){if(element.getAttribute('title')){et=element.getAttribute('title');}else if(typeof element.childNodes[0].alt!=='null'){et=element.childNodes[0].alt;}else{et='no text';}}
if(typeof et==='undefined'){et='no text';}
et=et.trim();return et;};ga_auto_event_tracking.prototype.helperGetPageTitle=function(){var pt=document.title||'No Page Title';return pt;};ga_auto_event_tracking.prototype.helperGetElementUrl=function(element){var eu=element.href||null;if(!eu&&typeof eu==='undefined'){eu='no link';}
return eu;};