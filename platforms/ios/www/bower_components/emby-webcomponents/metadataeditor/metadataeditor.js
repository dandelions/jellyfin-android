define(["itemHelper","layoutManager","scrollHelper","dialogHelper","datetime","loading","focusManager","connectionManager","globalize","require","emby-checkbox","emby-input","emby-select","listViewStyle","emby-textarea","emby-button","paper-icon-button-light","css!./../formdialog"],function(e,t,r,a,l,n,i,o,u,s){function c(){return J.classList.contains("dialog")}function d(){c()&&a.close(J)}function y(e,t){function r(){s(["toast"],function(e){e(u.translate("MessageItemSaved"))}),n.hide(),d(!0)}var a=L();a.updateItem(t).then(function(){var l=e.querySelector("#selectContentType").value||"";(Q.ContentType||"")!=l?a.ajax({url:a.getUrl("Items/"+t.Id+"/ContentType",{ContentType:l}),type:"POST"}).then(function(){r()}):r()})}function p(e){var t=e.querySelectorAll(".chkAirDay:checked")||[];return Array.prototype.map.call(t,function(){return this.getAttribute("data-day")})}function v(e){return e.querySelector("#txtAlbumArtist").value.trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function m(e){return e.querySelector("#txtArtist").value.trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function S(e,t,r){var a=e.querySelector(t).value;if(!a)return null;if(W[r]){var n=l.parseISO8601Date(W[r],!0),i=n.toISOString().split("T");if(0==i[0].indexOf(a)){var o=i[1];a+="T"+o}}return a}function f(e){n.show();var t=this;try{var r={Id:W.Id,Name:t.querySelector("#txtName").value,OriginalTitle:t.querySelector("#txtOriginalName").value,ForcedSortName:t.querySelector("#txtSortName").value,DisplayMediaType:t.querySelector("#txtDisplayMediaType").value,CommunityRating:t.querySelector("#txtCommunityRating").value,VoteCount:t.querySelector("#txtCommunityVoteCount").value,HomePageUrl:t.querySelector("#txtHomePageUrl").value,Budget:t.querySelector("#txtBudget").value,Revenue:t.querySelector("#txtRevenue").value,CriticRating:t.querySelector("#txtCriticRating").value,CriticRatingSummary:t.querySelector("#txtCriticRatingSummary").value,IndexNumber:t.querySelector("#txtIndexNumber").value||null,AbsoluteEpisodeNumber:t.querySelector("#txtAbsoluteEpisodeNumber").value,DvdEpisodeNumber:t.querySelector("#txtDvdEpisodeNumber").value,DvdSeasonNumber:t.querySelector("#txtDvdSeasonNumber").value,AirsBeforeSeasonNumber:t.querySelector("#txtAirsBeforeSeason").value,AirsAfterSeasonNumber:t.querySelector("#txtAirsAfterSeason").value,AirsBeforeEpisodeNumber:t.querySelector("#txtAirsBeforeEpisode").value,ParentIndexNumber:t.querySelector("#txtParentIndexNumber").value||null,DisplayOrder:t.querySelector("#selectDisplayOrder").value,Players:t.querySelector("#txtPlayers").value,Album:t.querySelector("#txtAlbum").value,AlbumArtist:v(t),ArtistItems:m(t),Metascore:t.querySelector("#txtMetascore").value,AwardSummary:t.querySelector("#txtAwardSummary").value,Overview:t.querySelector("#txtOverview").value,ShortOverview:t.querySelector("#txtShortOverview").value,Status:t.querySelector("#selectStatus").value,AirDays:p(t),AirTime:t.querySelector("#txtAirTime").value,Genres:g(t.querySelector("#listGenres")),ProductionLocations:g(t.querySelector("#listCountries")),Tags:g(t.querySelector("#listTags")),Keywords:g(t.querySelector("#listKeywords")),Studios:g(t.querySelector("#listStudios")).map(function(e){return{Name:e}}),PremiereDate:S(t,"#txtPremiereDate","PremiereDate"),DateCreated:S(t,"#txtDateAdded","DateCreated"),EndDate:S(t,"#txtEndDate","EndDate"),ProductionYear:t.querySelector("#txtProductionYear").value,AspectRatio:t.querySelector("#txtOriginalAspectRatio").value,Video3DFormat:t.querySelector("#select3dFormat").value,OfficialRating:t.querySelector("#selectOfficialRating").value,CustomRating:t.querySelector("#selectCustomRating").value,People:W.People,LockData:t.querySelector("#chkLockData").checked,LockedFields:Array.prototype.filter.call(t.querySelectorAll(".selectLockedField"),function(e){return!e.checked}).map(function(e){return e.getAttribute("data-value")})};r.ProviderIds=Object.assign({},W.ProviderIds);var a=t.querySelectorAll(".txtExternalId");if(Array.prototype.map.call(a,function(e){var t=e.getAttribute("data-providerkey");r.ProviderIds[t]=e.value}),r.PreferredMetadataLanguage=t.querySelector("#selectLanguage").value,r.PreferredMetadataCountryCode=t.querySelector("#selectCountry").value,"Person"==W.Type){var l=t.querySelector("#txtPlaceOfBirth").value;r.ProductionLocations=l?[l]:[]}if("Series"==W.Type){var i=t.querySelector("#txtSeriesRuntime").value;r.RunTimeTicks=i?6e8*i:null}var o=t.querySelector("#txtTagline").value;r.Taglines=o?[o]:[],y(t,r)}catch(u){alert(u)}return e.preventDefault(),e.stopPropagation(),!1}function b(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function g(e){return Array.prototype.map.call(e.querySelectorAll(".textValue"),function(e){return e.textContent})}function q(e,t){s(["prompt"],function(r){r({label:"Value:"}).then(function(r){var a=b(e,"editableListviewContainer").querySelector(".paperList"),l=g(a);l.push(r),K(a,l,t)})})}function x(e){var t=b(e,"listItem");t.parentNode.removeChild(t)}function T(e,t,r){s(["personEditor"],function(a){a.show(t).then(function(t){var a=-1==r;a&&W.People.push(t),Y(e,W.People)})})}function h(e,t){s(["itemContextMenu"],function(r){r.show({item:W,positionTo:t,edit:!1,editImages:!0,editSubtitles:!0,sync:!1,share:!1}).then(function(t){t.deleted?Emby.Page.goHome():t.updated&&_(e,W.Id,W.ServerId)})})}function A(e,t){var r=t;"LibraryChanged"===r.MessageType&&-1!=r.Data.ItemsUpdated.indexOf(W.Id)&&_(J,W.Id,W.ServerId)}function C(e,t){Events.on(t,"websocketmessage",A)}function D(e,t){Events.off(t,"websocketmessage",A)}function P(e){var t=b(e.target,"btnRemoveFromEditorList");if(t)return void x(t);var r=b(e.target,"btnAddTextItem");r&&q(r)}function L(){return o.getApiClient(W.ServerId)}function N(e,t){e.querySelector(".btnCancel").addEventListener("click",function(){d(!1)}),e.querySelector(".btnMore").addEventListener("click",function(t){L().getCurrentUser().then(function(r){h(e,t.target,r)})}),e.querySelector(".btnHeaderSave").addEventListener("click",function(){e.querySelector(".btnSave").click()}),e.querySelector("#chkLockData").addEventListener("click",function(e){e.target.checked?B(".providerSettingsContainer"):H(".providerSettingsContainer")}),e.removeEventListener("click",P),e.addEventListener("click",P);var r=e.querySelector("form");r.removeEventListener("submit",f),r.addEventListener("submit",f),e.querySelector("#btnAddPerson").addEventListener("click",function(){T(e,{},-1)}),c()&&C(e,t)}function O(e,t){var r=o.getApiClient(t);return e?r.getItem(r.getCurrentUserId(),e):r.getRootFolder(r.getCurrentUserId())}function E(e,t){var r=o.getApiClient(t);return e?r.getJSON(r.getUrl("Items/"+e+"/MetadataEditor")):Promise.resolve({})}function I(e,t){var r="";r+="<option value=''></option>";for(var a=0,l=t.length;l>a;a++){var n=t[a];r+="<option value='"+n.TwoLetterISORegionName+"'>"+n.DisplayName+"</option>"}e.innerHTML=r}function R(e,t){var r="";r+="<option value=''></option>";for(var a=0,l=t.length;l>a;a++){var n=t[a];r+="<option value='"+n.TwoLetterISOLanguageName+"'>"+n.DisplayName+"</option>"}e.innerHTML=r}function M(e,t){t.ContentTypeOptions.length?H("#fldContentType",e):B("#fldContentType",e);var r=t.ContentTypeOptions.map(function(e){return'<option value="'+e.Value+'">'+e.Name+"</option>"}).join(""),a=e.querySelector("#selectContentType");a.innerHTML=r,a.value=t.ContentType||""}function k(){var e=this.getAttribute("data-formatstring"),t=this.getAttribute("data-buttonclass");this.value?document.querySelector("."+t).setAttribute("href",e.replace("{0}",this.value)):document.querySelector("."+t).setAttribute("href","#")}function w(e,t,r){for(var a="",l=t.ProviderIds||{},n=0,i=r.length;i>n;n++){var o=r[n],s="txt1"+o.Key,c="btnOpen1"+o.Key,d=o.UrlFormatString||"",y=u.translate("LabelDynamicExternalId").replace("{0}",o.Name);a+='<div class="inputContainer">',a+='<div style="display: flex; align-items: center;">';var p=l[o.Key]||"";a+='<div style="flex-grow:1;">',a+='<input is="emby-input" class="txtExternalId" value="'+p+'" data-providerkey="'+o.Key+'" data-formatstring="'+d+'" data-buttonclass="'+c+'" id="'+s+'" label="'+y+'"/>',a+="</div>",d&&(a+='<a class="clearLink '+c+'" href="#" target="_blank" data-role="none" style="float: none; width: 1.75em"><button type="button" is="paper-icon-button-light" class="autoSize"><i class="md-icon">open_in_browser</i></button></a>'),a+="</div>",a+="</div>"}var v=e.querySelector(".externalIds",e);v.innerHTML=a;var m=v.querySelector(".txtExternalId")||[];Array.prototype.forEach.call(m,function(e){e.addEventListener("change",k.bind(e)),e.dispatchEvent(new Event("change"))})}function B(e,t,r){if(t=t||document,"string"==typeof e){var a=r?t.querySelectorAll(e):[t.querySelector(e)];Array.prototype.forEach.call(a,function(e){e&&e.classList.add("hide")})}else e.classList.add("hide")}function H(e,t,r){if(t=t||document,"string"==typeof e){var a=r?t.querySelectorAll(e):[t.querySelector(e)];Array.prototype.forEach.call(a,function(e){e&&e.classList.remove("hide")})}else e.classList.remove("hide")}function V(e,t){t.Path&&"Remote"!=t.LocationType?H("#fldPath",e):B("#fldPath",e),"Series"==t.Type||"Movie"==t.Type||"Trailer"==t.Type?H("#fldOriginalName",e):B("#fldOriginalName",e),"Series"==t.Type?H("#fldSeriesRuntime",e):B("#fldSeriesRuntime",e),"Series"==t.Type||"Person"==t.Type?H("#fldEndDate",e):B("#fldEndDate",e),"Movie"==t.Type||"Game"==t.MediaType||"Trailer"==t.MediaType||"MusicVideo"==t.Type?(H("#fldBudget",e),H("#fldRevenue",e)):(B("#fldBudget",e),B("#fldRevenue",e)),"MusicAlbum"==t.Type?H("#albumAssociationMessage",e):B("#albumAssociationMessage",e),"Game"==t.MediaType?H("#fldPlayers",e):B("#fldPlayers",e),"Movie"==t.Type||"Trailer"==t.Type?(H("#fldCriticRating",e),H("#fldCriticRatingSummary",e)):(B("#fldCriticRating",e),B("#fldCriticRatingSummary",e)),"Movie"==t.Type?H("#fldAwardSummary",e):B("#fldAwardSummary",e),"Movie"==t.Type||"Trailer"==t.Type?H("#fldMetascore",e):B("#fldMetascore",e),"Series"==t.Type?(H("#fldStatus",e),H("#fldAirDays",e),H("#fldAirTime",e)):(B("#fldStatus",e),B("#fldAirDays",e),B("#fldAirTime",e)),"Video"==t.MediaType&&"TvChannel"!=t.Type?H("#fld3dFormat",e):B("#fld3dFormat",e),"Audio"==t.Type?H("#fldAlbumArtist",e):B("#fldAlbumArtist",e),"Audio"==t.Type||"MusicVideo"==t.Type?(H("#fldArtist",e),H("#fldAlbum",e)):(B("#fldArtist",e),B("#fldAlbum",e)),"Episode"==t.Type?H("#collapsibleDvdEpisodeInfo",e):B("#collapsibleDvdEpisodeInfo",e),"Episode"==t.Type&&0==t.ParentIndexNumber?H("#collapsibleSpecialEpisodeInfo",e):B("#collapsibleSpecialEpisodeInfo",e),"Person"==t.Type||"Genre"==t.Type||"Studio"==t.Type||"GameGenre"==t.Type||"MusicGenre"==t.Type||"TvChannel"==t.Type?(B("#fldCommunityRating",e),B("#fldCommunityVoteCount",e),B("#genresCollapsible",e),B("#peopleCollapsible",e),B("#studiosCollapsible",e),"TvChannel"==t.Type?H("#fldOfficialRating",e):B("#fldOfficialRating",e),B("#fldCustomRating",e)):(H("#fldCommunityRating",e),H("#fldCommunityVoteCount",e),H("#genresCollapsible",e),H("#peopleCollapsible",e),H("#studiosCollapsible",e),H("#fldOfficialRating",e),H("#fldCustomRating",e)),"Movie"==t.Type||"Trailer"==t.Type||"MusicArtist"==t.Type?H("#countriesCollapsible",e):B("#countriesCollapsible",e),"TvChannel"==t.Type?(B("#tagsCollapsible",e),B("#metadataSettingsCollapsible",e),B("#fldPremiereDate",e),B("#fldDateAdded",e),B("#fldYear",e)):(H("#tagsCollapsible",e),H("#metadataSettingsCollapsible",e),H("#fldPremiereDate",e),H("#fldDateAdded",e),H("#fldYear",e)),"Movie"==t.Type||"Trailer"==t.Type||"BoxSet"==t.Type?H("#keywordsCollapsible",e):B("#keywordsCollapsible",e),"Video"==t.MediaType&&"TvChannel"!=t.Type?H("#fldSourceType",e):B("#fldSourceType",e),"Person"==t.Type?(e.querySelector("#txtProductionYear").label(u.translate("LabelBirthYear")),e.querySelector("#txtPremiereDate").label(u.translate("LabelBirthDate")),e.querySelector("#txtEndDate").label(u.translate("LabelDeathDate")),H("#fldPlaceOfBirth")):(e.querySelector("#txtProductionYear").label(u.translate("LabelYear")),e.querySelector("#txtPremiereDate").label(u.translate("LabelReleaseDate")),e.querySelector("#txtEndDate").label(u.translate("LabelEndDate")),B("#fldPlaceOfBirth")),"Video"==t.MediaType&&"TvChannel"!=t.Type?H("#fldOriginalAspectRatio"):B("#fldOriginalAspectRatio"),"Audio"==t.Type||"Episode"==t.Type||"Season"==t.Type?(H("#fldIndexNumber"),e.querySelector("#txtIndexNumber").label("Episode"==t.Type?u.translate("LabelEpisodeNumber"):"Season"==t.Type?u.translate("LabelSeasonNumber"):"Audio"==t.Type?u.translate("LabelTrackNumber"):u.translate("LabelNumber"))):B("#fldIndexNumber"),"Audio"==t.Type||"Episode"==t.Type?(H("#fldParentIndexNumber"),e.querySelector("#txtParentIndexNumber").label("Episode"==t.Type?u.translate("LabelSeasonNumber"):"Audio"==t.Type?u.translate("LabelDiscNumber"):u.translate("LabelParentNumber"))):B("#fldParentIndexNumber",e),"BoxSet"==t.Type?(H("#fldDisplayOrder",e),e.querySelector("#selectDisplayOrder").innerHTML='<option value="SortName">'+u.translate("OptionSortName")+'</option><option value="PremiereDate">'+u.translate("OptionReleaseDate")+"</option>"):(e.querySelector("#selectDisplayOrder").innerHTML="",B("#fldDisplayOrder",e));var r=e.querySelectorAll(".fldDisplaySetting"),a=Array.prototype.filter.call(r,function(e){return"none"!=e.style.display});a.length?H("#collapsibleDisplaySettings",e):B("#collapsibleDisplaySettings",e)}function F(e,t,r){var a=e.querySelector("#selectOfficialRating");G(r,a,t.OfficialRating),a.value=t.OfficialRating||"",a=e.querySelector("#selectCustomRating"),G(r,a,t.CustomRating),a.value=t.CustomRating||"";var n=e.querySelector("#selectStatus");U(n),n.value=t.Status||"",e.querySelector("#select3dFormat",e).value=t.Video3DFormat||"",Array.prototype.forEach.call(e.querySelectorAll(".chkAirDay",e),function(e){e.checked=-1!=(t.AirDays||[]).indexOf(e.getAttribute("data-day"))}),K(e.querySelector("#listCountries"),t.ProductionLocations||[]),K(e.querySelector("#listGenres"),t.Genres),Y(e,t.People||[]),K(e.querySelector("#listStudios"),(t.Studios||[]).map(function(e){return e.Name||""})),K(e.querySelector("#listTags"),t.Tags),K(e.querySelector("#listKeywords"),t.Keywords);var i=t.LockData||!1,o=e.querySelector("#chkLockData");o.checked=i,o.checked?B(".providerSettingsContainer",e):H(".providerSettingsContainer",e),j(e,t,t.LockedFields),e.querySelector("#txtPath").value=t.Path||"",e.querySelector("#txtName").value=t.Name||"",e.querySelector("#txtOriginalName").value=t.OriginalTitle||"",e.querySelector("#txtOverview").value=t.Overview||"",e.querySelector("#txtShortOverview").value=t.ShortOverview||"",e.querySelector("#txtTagline").value=t.Taglines&&t.Taglines.length?t.Taglines[0]:"",e.querySelector("#txtSortName").value=t.ForcedSortName||"",e.querySelector("#txtDisplayMediaType").value=t.DisplayMediaType||"",e.querySelector("#txtCommunityRating").value=t.CommunityRating||"",e.querySelector("#txtCommunityVoteCount").value=t.VoteCount||"",e.querySelector("#txtHomePageUrl").value=t.HomePageUrl||"",e.querySelector("#txtAwardSummary").value=t.AwardSummary||"",e.querySelector("#txtMetascore").value=t.Metascore||"",e.querySelector("#txtBudget").value=t.Budget||"",e.querySelector("#txtRevenue").value=t.Revenue||"",e.querySelector("#txtCriticRating").value=t.CriticRating||"",e.querySelector("#txtCriticRatingSummary").value=t.CriticRatingSummary||"",e.querySelector("#txtIndexNumber").value="IndexNumber"in t?t.IndexNumber:"",e.querySelector("#txtParentIndexNumber").value="ParentIndexNumber"in t?t.ParentIndexNumber:"",e.querySelector("#txtPlayers").value=t.Players||"",e.querySelector("#txtAbsoluteEpisodeNumber").value="AbsoluteEpisodeNumber"in t?t.AbsoluteEpisodeNumber:"",e.querySelector("#txtDvdEpisodeNumber").value="DvdEpisodeNumber"in t?t.DvdEpisodeNumber:"",e.querySelector("#txtDvdSeasonNumber").value="DvdSeasonNumber"in t?t.DvdSeasonNumber:"",e.querySelector("#txtAirsBeforeSeason").value="AirsBeforeSeasonNumber"in t?t.AirsBeforeSeasonNumber:"",e.querySelector("#txtAirsAfterSeason").value="AirsAfterSeasonNumber"in t?t.AirsAfterSeasonNumber:"",e.querySelector("#txtAirsBeforeEpisode").value="AirsBeforeEpisodeNumber"in t?t.AirsBeforeEpisodeNumber:"",e.querySelector("#txtAlbum").value=t.Album||"",e.querySelector("#txtAlbumArtist").value=(t.AlbumArtists||[]).map(function(e){return e.Name}).join(";"),e.querySelector("#selectDisplayOrder").value=t.DisplayOrder,e.querySelector("#txtArtist").value=(t.ArtistItems||[]).map(function(e){return e.Name}).join(";");var u;if(t.DateCreated)try{u=l.parseISO8601Date(t.DateCreated,!0),e.querySelector("#txtDateAdded").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtDateAdded").value=""}else e.querySelector("#txtDateAdded").value="";if(t.PremiereDate)try{u=l.parseISO8601Date(t.PremiereDate,!0),e.querySelector("#txtPremiereDate").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtPremiereDate").value=""}else e.querySelector("#txtPremiereDate").value="";if(t.EndDate)try{u=l.parseISO8601Date(t.EndDate,!0),e.querySelector("#txtEndDate").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtEndDate").value=""}else e.querySelector("#txtEndDate").value="";e.querySelector("#txtProductionYear").value=t.ProductionYear||"",e.querySelector("#txtAirTime").value=t.AirTime||"";var c=t.ProductionLocations&&t.ProductionLocations.length?t.ProductionLocations[0]:"";if(e.querySelector("#txtPlaceOfBirth").value=c,e.querySelector("#txtOriginalAspectRatio").value=t.AspectRatio||"",e.querySelector("#selectLanguage").value=t.PreferredMetadataLanguage||"",e.querySelector("#selectCountry").value=t.PreferredMetadataCountryCode||"",t.RunTimeTicks){var d=t.RunTimeTicks/6e8;e.querySelector("#txtSeriesRuntime").value=Math.round(d)}else e.querySelector("#txtSeriesRuntime",e).value=""}function G(e,t,r){var a="";a+="<option value=''></option>";var l,n,i,o=[],u=!1;for(l=0,n=e.length;n>l;l++)i=e[l],o.push({Name:i.Name,Value:i.Name}),i.Name==r&&(u=!0);for(r&&!u&&o.push({Name:r,Value:r}),l=0,n=o.length;n>l;l++)i=o[l],a+="<option value='"+i.Value+"'>"+i.Name+"</option>";t.innerHTML=a}function U(e){var t="";t+="<option value=''></option>",t+="<option value='Continuing'>"+u.translate("OptionContinuing")+"</option>",t+="<option value='Ended'>"+u.translate("OptionEnded")+"</option>",e.innerHTML=t}function K(e,t,r){t=t||[],"undefined"==typeof r?t.sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())}):t=r(t);for(var a="",l=0;l<t.length;l++)a+='<div class="listItem">',a+='<button type="button" is="emby-button" data-index="'+l+'" class="fab autoSize mini"><i class="md-icon">live_tv</i></button>',a+='<div class="listItemBody">',a+='<div class="textValue">',a+=t[l],a+="</div>",a+="</div>",a+='<button type="button" is="paper-icon-button-light" data-index="'+l+'" class="btnRemoveFromEditorList autoSize"><i class="md-icon">delete</i></button>',a+="</div>";e.innerHTML=a}function Y(e,t){for(var r="",a="",l=e.querySelector("#peopleList"),n=0,i=t.length;i>n;n++){var o=t[n];a+='<div class="listItem">',a+='<button type="button" is="emby-button" data-index="'+n+'" class="btnEditPerson fab autoSize mini"><i class="md-icon">person</i></button>',a+='<div class="listItemBody">',a+='<a class="btnEditPerson clearLink" href="#" data-index="'+n+'">',a+='<div class="textValue">',a+=o.Name||"",a+="</div>",o.Role&&o.Role!=r&&(a+='<div class="secondary">'+o.Role+"</div>"),a+="</a>",a+="</div>",a+='<button type="button" is="paper-icon-button-light" data-index="'+n+'" class="btnDeletePerson autoSize"><i class="md-icon">delete</i></button>',a+="</div>"}l.innerHTML=a;var u=l.querySelector(".btnDeletePerson");u&&u.addEventListener("click",function(){var t=parseInt(this.getAttribute("data-index"));W.People.splice(t,1),Y(e,W.People)}.bind(u));var s=l.querySelector(".btnEditPerson");s&&s.addEventListener("click",function(){var t=parseInt(this.getAttribute("data-index"));T(e,W.People[t],t)}.bind(s))}function z(e,t){for(var r="",a=0;a<e.length;a++){var l=e[a],n=l.name,i=l.value||l.name,o=-1==t.indexOf(i)?" checked":"";r+="<label>",r+='<input type="checkbox" is="emby-checkbox" class="selectLockedField" data-value="'+i+'"'+o+"/>",r+="<span>"+n+"</span>",r+="</label>"}return r}function j(e,t,r){var a=e.querySelector(".providerSettingsContainer");r=r||new Array;var l=[{name:u.translate("OptionName"),value:"Name"},{name:u.translate("OptionOverview"),value:"Overview"},{name:u.translate("OptionGenres"),value:"Genres"},{name:u.translate("OptionParentalRating"),value:"OfficialRating"},{name:u.translate("OptionPeople"),value:"Cast"}];l.push("Person"==t.Type?{name:u.translate("OptionBirthLocation"),value:"ProductionLocations"}:{name:u.translate("OptionProductionLocations"),value:"ProductionLocations"}),"Series"==t.Type&&l.push({name:u.translate("OptionRuntime"),value:"Runtime"}),l.push({name:u.translate("OptionStudios"),value:"Studios"}),l.push({name:u.translate("OptionTags"),value:"Tags"}),l.push({name:u.translate("OptionKeywords"),value:"Keywords"}),l.push({name:u.translate("OptionImages"),value:"Images"}),l.push({name:u.translate("OptionBackdrops"),value:"Backdrops"}),"Game"==t.Type&&l.push({name:u.translate("OptionScreenshots"),value:"Screenshots"});var n="";n+="<h1>"+u.translate("HeaderEnabledFields")+"</h1>",n+="<p>"+u.translate("HeaderEnabledFieldsHelp")+"</p>",n+=z(l,r),a.innerHTML=n}function _(e,t,r){n.show(),Promise.all([O(t,r),E(t,r)]).then(function(t){var r=t[0];Q=t[1],W=r;var a=Q.Cultures,l=Q.Countries;M(e,Q),w(e,r,Q.ExternalIdInfos),R(e.querySelector("#selectLanguage"),a),I(e.querySelector("#selectCountry"),l),V(e,r),F(e,r,Q.ParentalRatingOptions),"Video"==r.MediaType&&"Episode"!=r.Type?H("#fldShortOverview",e):B("#fldShortOverview",e),"Video"==r.MediaType&&"Episode"!=r.Type?H("#fldTagline",e):B("#fldTagline",e),n.hide()})}var J,Q,W;return{show:function(e,l){return new Promise(function(i){n.show(),s(["text!./metadataeditor.template.html"],function(n){var s={removeOnClose:!0};s.size=t.tv?"fullscreen":"medium";var c=a.createDialog(s);c.classList.add("ui-body-b"),c.classList.add("background-theme-b"),c.classList.add("formDialog");var d="";d+=u.translateDocument(n),c.innerHTML=d,document.body.appendChild(c),t.tv&&r.centerFocus.on(c.querySelector(".dialogContent"),!1),a.open(c),c.addEventListener("close",function(){D(c,o.getApiClient(l)),i()}),J=c,N(c,o.getApiClient(l)),_(c,e,l)})})},embed:function(e,t,r){return new Promise(function(){n.show(),s(["text!./metadataeditor.template.html"],function(a){e.innerHTML=u.translateDocument(a),e.querySelector(".btnCancel").classList.add("hide"),J=e,N(e,o.getApiClient(r)),_(e,t,r),i.autoFocus(e)})})}}});