window.__ez=window.__ez||{};window.epbjs=window.epbjs||{};epbjs.que=epbjs.que||[];__ez.ihb=(function(){let breaks={};let callbacks={};const Errors={VARIABLE_NOT_FOUND:"Variable not found.",};const PREBID_TIMEOUT_MS=15000,APS_TIMEOUT_MS=15000,APS_STATSOURCEID=11324,TARGETING_REPLACE_KEYS={"epb":"hb_bidder","epa":"hb_adid","epp":"hb_pb","epf":"hb_format","eps":"hb_ssid",},FAKE_VAST="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/"+
"single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast"+
"&unviewed_position_start=1&env=vp&impl=s&correlator=";class VideoAdTimer{constructor(videoPlayer,adBreaks){this.target=new EventTarget();this.videoPlayer=videoPlayer;this.adBreaks=adBreaks;}
deactivateBreaks(){this.videoPlayer.offTimeUpdate(this.trackBreaks_);}
activateBreaks(){this.videoPlayer.onTimeUpdate(this.trackBreaks_);}
setPlayerAndBreaks(videoPlayer,adBreaks){this.videoPlayer=videoPlayer;this.adBreaks=adBreaks;this.trackBreaks_=this.bind_(this,this.trackBreaks);this.videoPlayer.onTimeUpdate(this.trackBreaks_);}
dispatchEvent(event){this.target.dispatchEvent(event);}
addListener(eventName,callback){this.target.addEventListener(eventName,callback);}
bind_(thisObj,fn){return function(){fn.apply(thisObj,arguments);};}
trackBreaks(){let nextBreak=this.videoPlayer.getNextAdBreak(this.adBreaks);if(nextBreak){if(nextBreak.timeOffset=='start'){return;}
if(this.videoPlayer.getAdBreakTime(nextBreak)-this.videoPlayer.getCurrentVideoTime()<10&&(typeof nextBreak.isTriggered=="undefined"||nextBreak.isTriggered==false)){nextBreak.isTriggered=true;var adEvent=new Event("StartVideoHeaderBidding");adEvent.AdBreak=nextBreak;this.target.dispatchEvent(adEvent);}}}
nextOutstreamBreak(){log("outstreamTimer - nextOutstreamBreak called")
let outstreamWrapper=document.getElementById("ez-video-outstream-wrap");if(outstreamWrapper.style.display==="none"){log("in nextOutstreamBreak: outstream display is none - not bidding");return;}
let vidPlayer=this.videoPlayer.player.player
if(vidPlayer.play_outstream){__ez.ihb.requestBreaks(vidPlayer.player_id,vidPlayer.ezVideoId,vidPlayer.ads_enabled,vidPlayer.video_position_id,0,true,true)}}}
let vadTimer=new VideoAdTimer();let outstreamTimer=new VideoAdTimer();class AdBreak{constructor(solBreak){Object.keys(solBreak).forEach(key=>{this[key]=solBreak[key];});if(!this.origVastURL){this.origVastURL=this.vastURL;}
if(!this.retryCount){this.retryCount=0;this.lastBidHash=this.videoAdBidHash;this.maxHBBid=0;}
this.isComplete=false;this.prebidComplete=false;this.apsComplete=false;this.prebidBids=[];this.apsBid=null;this.bidders=[];this.receivedBidders=[];this.statSourceId=undefined;this.prebidCPM=undefined;this.played=false;}
async assembleTagURL(){if(!this.breakID.includes("outstream")&&!this.isComplete&&(!this.prebidComplete||!this.apsComplete)){log('assembleTagUrl early return instream')
return;}else if(this.breakID.includes("outstream")&&!this.isComplete&&!this.prebidComplete){log("assembleTagURL early return outstream")
return;}
let vastURL=this.origVastURL,prebidBid=this.prebidBids?this.getWinningPrebidBid():null,apsBid=this.apsBid||null,bidders=[],receivedBidders=[];this.maxHBBid=this.getMaxHBBid(prebidBid);if(this.bidAvailableAboveFloor(prebidBid)===false){prebidBid=null;}
if(typeof __ezInstream!=='undefined'&&!this.breakID.includes("outstream")){if(__ezInstream.prebidBidders&&__ezInstream.prebidBidders.length!=0){let prebidBidders=__ezInstream.prebidBidders.map((bidder)=>epbjs.SS[bidder.bidder]);bidders=bidders.concat(prebidBidders);}}
if(typeof __ezOutstream!=='undefined'&&this.breakID.includes("outstream")){if(__ezOutstream.prebidBidders&&__ezOutstream.prebidBidders.length!=0){let prebidBidders=__ezOutstream.prebidBidders.map((bidder)=>epbjs.SS[bidder.bidder]);bidders=bidders.concat(prebidBidders);}}
if(prebidBid){let adBreakBids=this.prebidBids.bids;receivedBidders=receivedBidders.concat(adBreakBids.map((bid)=>epbjs.SS[bid.bidder]));this.statSourceId=epbjs.SS[prebidBid.bidder];this.prebidCPM=prebidBid.cpm;vastURL=this.setUpPrebidAdBreak(prebidBid);}
if(typeof __ezInstream!=='undefined'){if(__ezInstream.apsSlot.slotID){bidders.push(APS_STATSOURCEID);}}
if(apsBid&&!this.breakID.includes("outstream")){receivedBidders.push(APS_STATSOURCEID);vastURL+=apsBid.encodedQsParams;}
log(this.key+"\nVAST URL: ",vastURL+"\nPrebid:",prebidBid,"\nAPS:",apsBid);this.vastURL=vastURL;this.bidders=bidders;this.receivedBidders=receivedBidders;this.isComplete=true;if(typeof callbacks[this.key]!=="undefined"){callbacks[this.key](this);delete callbacks[this.key];}}
getWinningPrebidBid(){if(!this.prebidBids||!this.prebidBids.bids){return;}
return this.prebidBids.bids.reduce(function(prev,current){return(prev.cpm>current.cpm)?prev:current;});}
bidAvailableAboveFloor(prebidBid){if(prebidBid===null||prebidBid==="undefined"||prebidBid===undefined){return false;}
if(prebidBid.cpm<this.videoAdBidFloor){log("Prebid bid below our floor, skipping.  Bid: ",prebidBid.cpm,"Floor: ",this.videoAdBidFloor);return false;}
return true;}
getMaxHBBid(prebidBid){if(prebidBid!==null&&prebidBid!=="undefined"&&prebidBid!==undefined){if(prebidBid.cpm!==undefined&&prebidBid.cpm>this.maxHBBid){return prebidBid.cpm;}else if(prebidBid.originalCpm!==undefined&&prebidBid.originalCpm>this.maxHBBid){return prebidBid.originalCpm;}}
if(this.maxHBBid>0){return this.maxHBBid;}
return 0;}
setUpPrebidAdBreak(bid){let epbjs=window.epbjs;if(!epbjs||!epbjs.markWinningBidAsUsed||!epbjs.adServers){return this.vastURL;}
if(bid.adserverTargeting){bid.adserverTargeting=Object.entries(bid.adserverTargeting).reduce((acc,[key,value])=>{acc[TARGETING_REPLACE_KEYS[key]||key]=value;return acc;},{});}
epbjs.markWinningBidAsUsed({adUnitCode:this.BreakID,adId:bid.adId,});return epbjs.adServers.dfp.buildVideoUrl({adUnit:this.prebidAdUnit,url:this.origVastURL,bid:bid,});}}
function createVideoAdUnit(adBreak){let adUnit={code:adBreak.key,mediaTypes:{video:adBreak.prebidParams,}};adUnit.bids=getBidders(adBreak);if(adBreak.videoAdBidFloor>0){adUnit.floors={currency:'USD',schema:{delimiter:'|',fields:['mediaType','size']},values:{'video|*':adBreak.videoAdBidFloor,},}}
adBreak.prebidAdUnit=adUnit;return[adUnit];}
function getBidders(adBreak){let bidders=adBreak.breakID.includes("outstream")?__ezOutstream.prebidBidders:__ezInstream.prebidBidders;bidders=setCustomParams(adBreak,bidders);return bidders;}
function setCustomParams(adBreak,bidders){let skippable=adBreak.params.skip;let maxDur=adBreak.params.max/1000;let minDur=adBreak.params.min/1000;let adPosition="";switch(adBreak.timeOffset){case 'start':adPosition='pre_roll';break;case 'end':adPosition='post_roll';break;default:adPosition='mid_roll';break;}
bidders.forEach(function(b){switch(b.bidder){case "appnexus":b.params["reserve"]=adBreak.videoAdBidFloor;b.params["video"]={context:adPosition,minduration:minDur,maxduration:maxDur,skippable:skippable};break;case "medianet":b.params["bidfloor"]=adBreak.videoAdBidFloor;break;case "nobid":b.params["video"]={minduration:minDur,maxduration:maxDur,mimes:adBreak.prebidParams.mimes,skippable:skippable};break;case "pubmatic":b.params["kadfloor"]=adBreak.videoAdBidFloor.toString();break;case "pulsepoint":b.params["bidfloor"]=adBreak.videoAdBidFloor;break;case "rise":b.params["floorPrice"]=adBreak.videoAdBidFloor;break;case "rubicon":b.params["floor"]=adBreak.videoAdBidFloor;break;case "sovrn":b.params["bidfloor"]=adBreak.videoAdBidFloor.toString();break;case "yieldmo":b.params["bidFloor"]=adBreak.videoAdBidFloor;break;}});return bidders;}
async function prebidOnAdBreak(adBreak){log("PrebidOnAdBreak called")
let bidders=adBreak.breakID.includes("outstream")?__ezOutstream.prebidBidders:__ezInstream.prebidBidders;if(!bidders||bidders.length==0){log("No Prebid bidders");adBreak.prebidComplete=true;adBreak.assembleTagURL();return;}
let videoAdUnit=createVideoAdUnit(adBreak);return new Promise((resolve,reject)=>{let prebidTimeout,queueInterval;prebidTimeout=setTimeout(()=>{clearInterval(queueInterval);reject("Prebid timed out");},PREBID_TIMEOUT_MS);queueInterval=setInterval(()=>{if(typeof __ez!=="undefined"&&__ez["queue"]&&__ez["queue"]["items"]&&__ez["queue"]["items"]["dall.js"]){let dallScript=__ez["queue"]["items"]["dall.js"];if(!!dallScript.isError){clearTimeout(prebidTimeout);clearInterval(queueInterval);reject("epbjs failed to load");}else if(!!dallScript.isComplete){clearInterval(queueInterval);}}},1000);waitForVariable("ezDallErr",PREBID_TIMEOUT_MS).then(()=>{clearInterval(queueInterval);reject("epbjs failed to load");}).catch(err=>{});epbjs.que.push(function(){clearInterval(queueInterval);const consentManagement={usp:{cmpApi:'iab',timeout:100}};if(typeof window.__tcfapi==="function"){consentManagement.strictStorageEnforcement=true;consentManagement.gdpr={cmpApi:'iab',timeout:5*60*1000,defaultGdprScope:true,};}
epbjs.setConfig({floors:{skipRate:0,enforcement:{bidAdjustment:false,enforceJS:true,},},debug:epbjs.getConfig("debug")||isDebug(),cache:{url:"https://prebid.adnxs.com/pbc/v1/cache",},rubicon:{disableFloors:true,},s2sConfig:{accountId:"1",bidders:__s2sinstreambidders,timeout:1500,enabled:true,endpoint:"https://pb-server.ezoic.com/openrtb2/auction",syncEndpoint:"https://pb-server.ezoic.com/cookie_sync",extPrebid:{cache:{vastxml:{returnCreative:false}},aliases:{"viewdeosDX":"viewdeos"},},},consentManagement:consentManagement});let hasYahoo=bidders.find(el=>el.bidder==="yahoossp")!==undefined
if(hasYahoo){epbjs.setConfig({yahoossp:{mode:"all",},});}
log("Prebid.js requesting bids",videoAdUnit);epbjs.requestBids({adUnits:videoAdUnit,bidsBackHandler:function(bids){clearTimeout(prebidTimeout);log("Current ad break: ",adBreak);log("Prebid received bids: ",bids);breakBids=bids[adBreak.key];if(breakBids){adBreak.prebidBids=breakBids;}
adBreak.prebidComplete=true;adBreak.assembleTagURL();resolve();},});});});}
function enableVideoAdTimer(videoPlayer,adBreaks){if(videoPlayer.player.player.id_==='ez-video-outstream'){outstreamTimer.setPlayerAndBreaks(videoPlayer,adBreaks)
return outstreamTimer;}else{vadTimer.setPlayerAndBreaks(videoPlayer,adBreaks);return vadTimer;}}
function callNextOutstreamBreak(){let delayBetweenAds=0
setTimeout(()=>outstreamTimer.nextOutstreamBreak(),delayBetweenAds*1000)}
async function startAPSBiddingOnAdBreak(adBreak){if(!__ezInstream.apsSlot.slotID){log("No APS slots");adBreak.apsComplete=true;adBreak.assembleTagURL();return;}
log("Setting up APS");return new Promise(async(resolve,reject)=>{await waitForVariable("apstag",APS_TIMEOUT_MS).catch(()=>{reject("APS timed out");});apsSlot=__ezInstream.apsSlot;if(!apsSlot.slotID){adBreak.apsComplete=true;adBreak.assembleTagURL();return;}
if(adBreak.videoAdBidFloor>0){apsSlot.floor={currency:'USD',value:Math.round(adBreak.videoAdBidFloor*100)}}else{delete apsSlot.floor}
function bidsBackHandler(bids){log("APS received bids for key =",adBreak.key,bids);if(bids.length>0){adBreak.apsBid=bids[0];}
adBreak.apsComplete=true;adBreak.assembleTagURL();resolve();}
log("APS requesting instream bids for key =",adBreak.key);apstag.fetchBids({slots:[apsSlot],timeout:APS_TIMEOUT_MS,},bidsBackHandler);});}
function mergeAdBreaks(adBreaks){log("mergeAdBreaks")
let newBreaks=adBreaks.reduce((map,adBreak)=>{map[adBreak.key]=new AdBreak(adBreak);return map;},{});breaks={...breaks,...newBreaks};return newBreaks}
function bidFirst(adBreaks){let newBreaks=mergeAdBreaks(adBreaks);if(isFakeAds()){Object.keys(adBreaks).forEach(key=>{let adBreak=adBreaks[key];adBreak.vastURL=FAKE_VAST;adBreak.isComplete=true;var adEvent=new Event("RenderAdBreak");adEvent.AdBreak=adBreak;vadTimer.dispatchEvent(adEvent);if(typeof callbacks[key]!=="undefined"){callbacks[key](adBreak);delete callbacks[key];}});return;}
let firstAdBreakKey=Object.keys(newBreaks).find(key=>{return key.includes("preroll-1")||key.includes("outstream");});let firstAdBreak=newBreaks[firstAdBreakKey];if(!firstAdBreak){log("No first ad breaks to bid");return;}
firstAdBreak.isTriggered=true;Promise.all(firstAdBreak.breakID.includes("outstream")?[prebidOnAdBreak(firstAdBreak)]:[prebidOnAdBreak(firstAdBreak),startAPSBiddingOnAdBreak(firstAdBreak)]).then(()=>{log("first ad break bidding is finished");var adEvent=new Event("RenderAdBreak");adEvent.AdBreak=firstAdBreak;if(firstAdBreak.breakID.includes("outstream")){outstreamTimer.dispatchEvent(adEvent);}else{vadTimer.dispatchEvent(adEvent);}}).catch(err=>{if(isDebug()){console.warn("[Instream HB]",err);}
firstAdBreak.isComplete=true;firstAdBreak.assembleTagURL();var adEvent=new Event("RenderAdBreak");adEvent.AdBreak=firstAdBreak;if(firstAdBreak.breakID.includes("outstream")){outstreamTimer.dispatchEvent(adEvent);}else{vadTimer.dispatchEvent(adEvent);}});}
function bidSingleBreak(adBreak){Promise.all(adBreak.breakID.includes("outstream")?[prebidOnAdBreak(adBreak)]:[prebidOnAdBreak(adBreak),startAPSBiddingOnAdBreak(adBreak)]).then(()=>{log("single ad break bidding finished");var adEvent=new Event("RenderAdBreak");adEvent.AdBreak=adBreak;if(adBreak.breakID.includes("outstream")){outstreamTimer.dispatchEvent(adEvent);}else{vadTimer.dispatchEvent(adEvent);}}).catch(err=>{if(isDebug()){console.warn("[Instream HB]",err);}
adBreak.isComplete=true;adBreak.assembleTagURL();var adEvent=new Event("RenderAdBreak");adEvent.AdBreak=adBreak;if(adBreak.breakID.includes("outstream")){outstreamTimer.dispatchEvent(adEvent)}else{vadTimer.dispatchEvent(adEvent);}});}
function bid(solBreak,callback=null){let newBreak=new AdBreak(solBreak);bidSingleBreak(newBreak);if(typeof callback==="function"){this.on(key,callback);}}
function bidOn(solBreak,callback=null){bidSingleBreak(solBreak);if(typeof callback==="function"){this.on(key,callback);}}
function on(key,callback){if(typeof breaks[key]!=="undefined"&&breaks[key].isComplete){callback(breaks[key]);}else{callbacks[key]=callback;}}
function getBreaks(playerId,videoId,videoIndex=0){let keyPrefix=playerId+"$"+videoId+"$"+videoIndex;return Object.keys(breaks).reduce((list,key)=>{if(key.includes(keyPrefix)){list.push(breaks[key]);}
return list;},[]);}
async function requestBreaks(playerId,videoId,adsEnabled,videoPositionId,videoIndex,isAutoPlay,isFloating){let keyPrefix=playerId+"$"+videoId+"$"+videoIndex;Object.keys(breaks).forEach(key=>{if(key.includes(keyPrefix)){delete breaks[key];}});let params={player_id:playerId,content_id:videoId,ads_enabled:adsEnabled,position_id:videoPositionId,autoplay:isAutoPlay?1:0,floating:isFloating?1:0,}
if(videoIndex){params.video_index=videoIndex;}
let baseURL;if(window.hasOwnProperty("ezIntType")&&window.ezIntType==="wp"){baseURL="https://g.ezoic.net";}else{baseURL=window.location.origin;}
let vastsURL=new URL("/ez-vasts",baseURL);vastsURL.search=new URLSearchParams(params);let fetchErr;let resp=await fetch(vastsURL).catch(err=>{fetchErr=err;});if(fetchErr){console.error("Error:",err);return;}
let data=await resp.json();if(!data||data.length===0){console.error("No breaks receieved. Not bidding.");return;}
bidFirst(data);return getBreaks(playerId,videoId,videoIndex);}
function handleStartVideoHeaderBidding(event){var adBreak=event.AdBreak;bidSingleBreak(adBreak);}
function init(){log("__ez.ihb init()");if(typeof __ezInstream==="undefined"&&typeof __ezOutstream==="undefined"){log("No __ezInstream or __ezOutstream found. Not bidding.");return;}
if(typeof __ezInstream!=="undefined"){mergeAdBreaks(__ezInstream.breaks);vadTimer.addListener("StartVideoHeaderBidding",handleStartVideoHeaderBidding);}else{log("No __ezInstream found. Not bidding for instream.");}
if(typeof __ezOutstream!=="undefined"){mergeAdBreaks(__ezOutstream.breaks);outstreamTimer.addListener("StartVideoHeaderBidding",handleStartVideoHeaderBidding);}else{log("No __ezOutstream found. Not bidding for outstream.");}}
function getAdBreakKey(playerId,videoId,videoIndex,adBreakId){return playerId+"$"+videoId+"$"+videoIndex+"$"+adBreakId;}
function waitForVariable(varString,timeoutMs){return new Promise((resolve,reject)=>{let timeout=setTimeout(()=>{reject(Errors.VARIABLE_NOT_FOUND);},timeoutMs);let interval=setInterval(()=>{if(window.hasOwnProperty(varString)){clearTimeout(timeout);clearInterval(interval);resolve(window[varString]);}},1000);});}
function log(){if(isDebug()){let args=Array.from(arguments);args.unshift("[Instream HB]");console.log.apply(console,args);}}
function isDebug(){const urlParams=new URLSearchParams(window.location.search);return urlParams.get("ez_instream_debug")==="1";}
function isFakeAds(){const urlParams=new URLSearchParams(window.location.search);return urlParams.get("ez_fake_instream")==="1";}
init();return{on:on,bid:bid,bidFirst,bidFirst,bidOn:bidOn,getBreaks:getBreaks,requestBreaks:requestBreaks,getAdBreakKey:getAdBreakKey,enableVideoAdTimer:enableVideoAdTimer,callNextOutstreamBreak:callNextOutstreamBreak,};})();