define(['jquery'],function($){
  var Url = {};
  Url.parseUrl = function (){
    var urlParams;
    (window.onpopstate = function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);

      urlParams = {};
      while (match = search.exec(query)){
        urlParams[decode(match[1])] = decode(match[2]);
      }
    })();
    return urlParams;
  };
  Url.updateUrl = function(data){
    // 正则匹配出当前url中的搜索条件,更新选中条件
    // TODO: 不依赖jquery
    // for(var key in urlParams){
    //   if(data.hasOwnProperty(key) || key === 'error'){
    //     delete urlParams[key];
    //   }
    // }
    // for(var key2 in data){
    //   if(!data[key2]){
    //     delete data[key2];
    //   }
    // }
    var urlParams = Url.parseUrl();
    $.each(urlParams,function(key,value){
      if(data.hasOwnProperty(key)){
        delete urlParams[key];
      }
      if(key === 'error'){
        delete urlParams.error;
      }
    });
    $.each(data,function(key, value){
      if(value === ''){
        delete data[key];
      }
    });

    data = $.extend(urlParams,data);
    return data;

  };
  return Url;
});
