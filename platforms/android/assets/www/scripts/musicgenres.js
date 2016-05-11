define(["jQuery"],function(e){function r(){var e=a(),r=o[e];return r||(r=o[e]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Audio,MusicVideo",Recursive:!0,Fields:"DateCreated,SyncInfo,ItemCounts",StartIndex:0,Limit:LibraryBrowser.getDefaultPageSize()},view:LibraryBrowser.getSavedView(e)||LibraryBrowser.getDefaultItemsView("Thumb","Thumb")},r.query.ParentId=LibraryMenu.getTopParentId(),LibraryBrowser.loadSavedQueryValues(e,r.query)),r}function t(){return r().query}function a(){return LibraryBrowser.getSavedQueryKey("genres")}function i(o){Dashboard.showLoadingMsg();var n=t();ApiClient.getMusicGenres(Dashboard.getCurrentUserId(),n).then(function(t){window.scrollTo(0,0);var s="",u=r().view;e(".listTopPaging",o).html(LibraryBrowser.getQueryPagingHtml({startIndex:n.StartIndex,limit:n.Limit,totalRecordCount:t.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!0,currentLayout:u})),"Thumb"==u?s=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:"backdrop",preferThumb:!0,showItemCounts:!0,context:"music",lazy:!0,centerText:!0,overlayPlayButton:!0}):"ThumbCard"==u?s=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:"backdrop",preferThumb:!0,context:"music",showItemCounts:!0,cardLayout:!0,lazy:!0,showTitle:!0}):"Poster"==u&&(s=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:"portrait",context:"music",centerText:!0,showItemCounts:!0,lazy:!0}));var d=o.querySelector("#items");d.innerHTML=s,ImageLoader.lazyChildren(d),e(".btnNextPage",o).on("click",function(){n.StartIndex+=n.Limit,i(o)}),e(".btnPreviousPage",o).on("click",function(){n.StartIndex-=n.Limit,i(o)}),e(".btnChangeLayout",o).on("layoutchange",function(e,t){r().view=t,LibraryBrowser.saveViewSetting(a(),t),i(o)}),LibraryBrowser.saveQueryValues(a(),n),Dashboard.hideLoadingMsg()})}var o={};window.MusicPage.renderGenresTab=function(e,r){LibraryBrowser.needsRefresh(r)&&i(r)}});