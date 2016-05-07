define(["datetime","jQuery"],function(e,i){function a(e,i){require(["confirm"],function(a){a(Globalize.translate("MessageConfirmSeriesCancellation"),Globalize.translate("HeaderConfirmSeriesCancellation")).then(function(){Dashboard.showLoadingMsg(),ApiClient.cancelLiveTvSeriesTimer(i).then(function(){require(["toast"],function(e){e(Globalize.translate("MessageSeriesCancelled"))}),t(e)})})})}function n(n,t){var r="";t.length&&(r+='<div class="paperList">');for(var s=0,o=t.length;o>s;s++){var l=t[s];if(r+="<paper-icon-item>",r+='<paper-fab mini icon="live-tv" item-icon></paper-fab>',r+="<paper-item-body three-line>",r+='<a class="clearLink" href="livetvseriestimer.html?id='+l.Id+'">',r+="<div>",r+=l.Name,r+="</div>",r+="<div secondary>",l.DayPattern)r+=l.DayPattern;else{var c=l.Days||[];r+=c.join(", ")}r+=l.RecordAnyTime?" - "+Globalize.translate("LabelAnytime"):" - "+e.getDisplayTime(l.StartDate),r+="</div>",r+="<div secondary>",l.RecordAnyChannel?r+=Globalize.translate("LabelAllChannels"):l.ChannelId&&(r+=l.ChannelName),r+="</div>",r+="</a>",r+="</paper-item-body>",r+='<paper-icon-button icon="cancel" data-seriestimerid="'+l.Id+'" title="'+Globalize.translate("ButtonCancelSeries")+'" class="btnCancelSeries"></paper-icon-button>',r+="</paper-icon-item>"}t.length&&(r+="</div>");var d=i("#items",n).html(r);i(".btnCancelSeries",d).on("click",function(){a(n,this.getAttribute("data-seriestimerid"))}),Dashboard.hideLoadingMsg()}function t(e){Dashboard.showLoadingMsg(),ApiClient.getLiveTvSeriesTimers(r).then(function(i){require(["paper-fab","paper-item-body","paper-icon-item"],function(){n(e,i.Items)}),LibraryBrowser.setLastRefreshed(e)})}var r={SortBy:"SortName",SortOrder:"Ascending"};window.LiveTvPage.renderSeriesTimersTab=function(e,i){LibraryBrowser.needsRefresh(i)&&t(i)}});