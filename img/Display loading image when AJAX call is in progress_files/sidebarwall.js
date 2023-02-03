var sidebarWall=function(){const logs=false;const contentElemsMaxDepth=10;const barHeight=350;const adaptive=(typeof __ez_edge_a!=='undefined')?__ez_edge_a:false;const minWidth=(typeof __ez_edge_mw!=='undefined')?__ez_edge_mw:1600;const margin=(typeof __ez_edge_m!=='undefined')?__ez_edge_m:15;const verticalPosition=(typeof __ez_edge_v!=='undefined')?__ez_edge_v:'top';const horizontalPosition=(typeof __ez_edge_h!=='undefined')?__ez_edge_h:'inner';const unitWidth=160;const unitHeight=600+(margin*2);var checkInterval;var isBar=(elem=>{return elem.getBoundingClientRect().height<barHeight;});var hasBorder=(elem=>{let elemStyle=window.getComputedStyle(elem);return(elemStyle.borderRightStyle!=='none'||elemStyle.borderLeftStyle!=='none'||elemStyle.borderTopStyle!=='none'||elemStyle.borderBottomStyle!=='none')})
var isTransparent=(elem=>{let elemStyle=window.getComputedStyle(elem);let parentStyle=window.getComputedStyle(elem.parentElement);return(((elemStyle.backgroundColor==='rgba(0, 0, 0, 0)'||elemStyle.backgroundColor===parentStyle.backgroundColor)&&elemStyle.backgroundImage==='none')&&!hasBorder(elem));});var getCoordinates=function(elem,relativeToPage){let rect=elem.getBoundingClientRect();let coords={top:rect.top,right:rect.right,bottom:rect.bottom,left:rect.left,};if(relativeToPage){coords.top+=window.scrollY;coords.bottom+=window.scrollY;}
return coords};var elemOverlap=(a,b)=>{let h_overlap,v_overlap;if(a.left<b.left){h_overlap=(a.right>b.left);}else{h_overlap=(a.left<b.right);}
if(a.top<b.top){v_overlap=(a.bottom>b.top);}else{v_overlap=(a.top<b.bottom);}
return h_overlap&&v_overlap;}
var destroyRail=(sidebarElem,sidebarAdElem)=>{if(logs)console.log("No space, destroying",sidebarElem.id);if(typeof window.ezoGetSlotNum!=='undefined'){let adElem1=sidebarAdElem.querySelector(':scope > .ezoic-ad');if(typeof adElem1!=='undefined'&&adElem1!==null){let gptdiv=adElem1.querySelector(':scope > .ezoic-ad');if(typeof gptdiv!=='undefined'&&gptdiv!==null){let gptslotid=window.ezoGetSlotNum(gptdiv.id);let gptslot=window[gptslotid];if(typeof googletag!=='undefined'&&typeof googletag.destroySlots!=='undefined'){googletag.destroySlots([gptslot]);}}}}
sidebarElem.remove();}
var sidebarElems=Array.from(document.querySelectorAll(".ez-sidebar-wall"));if(adaptive){var contentElems=Array.from(document.querySelectorAll('body > *:not(script,style,.ezmob-footer)'));for(i=0;i<contentElemsMaxDepth;i++){let newContentElems=[];let toRemove=[];contentElems.forEach(elem=>{if(window.getComputedStyle(elem).width==window.getComputedStyle(document.body).width&&(!isBar(elem)||isTransparent(elem))){var children=Array.from(elem.children);if(children.length>0){newContentElems.push(...children);}
toRemove.push(elem);}});contentElems.push(...newContentElems);contentElems=contentElems.filter(elem=>!toRemove.includes(elem));}
var fixedElems=Array.from(document.querySelectorAll('*:not(script,style,.ezmob-footer)')).filter(elem=>window.getComputedStyle(elem).position=='fixed');ezVideoContainer=document.querySelector('.ez-video-container');if(ezVideoContainer!==null)fixedElems.push(ezVideoContainer);contentElems.push(...fixedElems);if(logs)console.log(contentElems);if(logs)console.log(fixedElems);}
var checkOverlap=()=>{let startTime=Date.now();var documentHeight=document.body.clientHeight;var documentWidth=document.body.clientWidth;sidebarElems=Array.from(document.querySelectorAll(".ez-sidebar-wall"));if(sidebarElems.length==0){clearInterval(checkInterval);return;}
sidebarElems.forEach(sidebarElem=>{let sidebarAdElem=sidebarElem.querySelector('.ez-sidebar-wall-ad');if(!adaptive){if(window.innerWidth<minWidth){destroyRail(sidebarElem,sidebarAdElem);return;}else{window.addEventListener("resize",checkOverlap,{once:true});return;}}
let overlaps=[];let checker=document.body.appendChild(document.createElement('div'));checker.style.position="absolute";checker.style.top='0px';checker.style.height=(documentHeight)+'px';checker.style.width=(unitWidth+margin)+'px';if(sidebarElem.id=='ez-sidebar-wall-left'){checker.style.left='0px';}else{checker.style.right='0px';}
let headerMargin=0;let widestLeft=(documentWidth/2)-unitWidth;let widestRight=(documentWidth/2)+unitWidth;contentElems.forEach(contentElem=>{if(sidebarElem!=contentElem&&typeof sidebarElem.getBoundingClientRect==='function'&&typeof contentElem.getBoundingClientRect==='function'&&contentElem!=sidebarElem.parentElement&&contentElem.parentElement!=sidebarElem&&!(contentElem.clientWidth<=1&&contentElem.clientHeight<=1)&&!(contentElem.clientWidth==0||contentElem.clientHeight==0)){a=getCoordinates(checker,true);b=getCoordinates(contentElem,true);if(elemOverlap(a,b)){if(window.getComputedStyle(contentElem).position!=='fixed'){overlaps.push(b);if(logs)console.log('Overlapping div: ',contentElem,window.getComputedStyle(contentElem).position,b);}else{b=getCoordinates(contentElem,false);if(b.top<=0&&b.bottom>headerMargin&&b.bottom<(window.innerHeight-600)){headerMargin=b.bottom;if(logs)console.log("Header margin: ",headerMargin,contentElem);}}}else{if(window.getComputedStyle(contentElem).position!=='fixed'){let left=getCoordinates(contentElem,true).left;let right=getCoordinates(contentElem,true).right;if(left<widestLeft){widestLeft=left;}
if(right>widestRight){widestRight=right;}}}}});let overlapsBlockCheck=[];overlapsBlockCheck.push({bottom:0,top:0});overlapsBlockCheck.push(...overlaps);overlapsBlockCheck.push({bottom:documentHeight,top:documentHeight});if(logs)console.log(overlapsBlockCheck);let bestGap=-1;let bestStart=0;let bestEnd=0;for(let i=0;i<overlapsBlockCheck.length;i++){let start=overlapsBlockCheck[i].bottom;for(let j=0;j<overlapsBlockCheck.length;j++){let end=overlapsBlockCheck[j].top;if(i==j)continue;var gap=end-start;if(gap<=0)continue;var blocking=overlaps.filter(check=>{return((check.top>=start&&check.top<end)||(check.bottom>start&&check.bottom<=end))});if(logs)console.log(start,end,blocking);if(blocking.length==0&&gap>unitHeight&&gap>bestGap){bestGap=gap;bestStart=start;bestEnd=end;}}}
if(logs){console.log("Overlapping divs: ",overlaps);console.log("Longest Gap: ",bestGap);console.log("Earlist start pos: ",bestStart);console.log("Latest end pos: ",bestEnd);console.log("Widest left pos: ",widestLeft);console.log("Widest right pos: ",widestRight);}
if(horizontalPosition==='inner'){if(sidebarElem.id=='ez-sidebar-wall-left'){if((widestLeft-unitWidth-margin)>0){sidebarElem.style.left=(widestLeft-unitWidth-margin)+'px';}}else{if((documentWidth-widestRight)-unitWidth-margin>0){sidebarElem.style.right=((documentWidth-widestRight)-unitWidth-margin)+'px';}}}else{if(sidebarElem.id=='ez-sidebar-wall-left'){sidebarElem.style.left=(margin)+'px';}else{sidebarElem.style.right=(margin)+'px';}}
if(overlaps.length==0){sidebarElem.style.position="absolute";sidebarElem.style.top=margin+'px';sidebarElem.style.height=(documentHeight-(margin*2))+'px';if(verticalPosition==="top")sidebarAdElem.style.top=(headerMargin+margin)+'px';}
else if(bestGap==-1){__ez_close_rail(sidebarElem.id);}
else{sidebarElem.style.position="absolute";sidebarElem.style.top=bestStart+margin+'px';sidebarElem.style.height=(bestEnd-bestStart-(margin*2))+'px';if(verticalPosition==="top")sidebarAdElem.style.top=(headerMargin+margin)+'px';}
checker.remove();});if(logs)console.log("SidebarWall time elapsed:",Date.now()-startTime);window.addEventListener("resize",checkOverlap,{once:true});};document.body.style.overflow='visible';checkOverlap();if(adaptive)checkInterval=setInterval(checkOverlap,5000);window.addEventListener("load",()=>{setTimeout(checkOverlap,1000)},{once:true});window.addEventListener("resize",checkOverlap,{once:true});};if(document.readyState!=="loading"){sidebarWall();}else{document.addEventListener("DOMContentLoaded",sidebarWall);};function __ez_close_rail(id){switch(id){case 'ez-sidebar-wall-left':var adlocation=38;break;case 'ez-sidebar-wall-right':var adlocation=39;break;default:return;}
googletag.cmd.push(function(slot){for(var i=0;i<window.ezslots.length;i++){var slot=window[ezslots[i]];if(typeof slot==='undefined'){continue;}
var alS=slot.getTargeting('al')[0]%1000;if(alS==adlocation){googletag.destroySlots([slot]);}}
var sideRail=document.getElementById(id);if(!sideRail){return;}
sideRail.remove();});}
function __ez_handle_rail_loaded(id){var gptElement=document.getElementById(id);if(gptElement!=null){var rail=gptElement.parentElement.parentElement;if(rail!=null)rail.style.backgroundColor='white';}}