myApp.factory('PhotoService',function($q,$window){
    return {
        getAlbums:function(){
            var deferred=$q.defer();
            FB.api("/me/albums",{fields: 'id,cover_photo,name,type'},function(response){
                if(response && !response.error) deferred.resolve(response);
                else deferred.reject();
            })
            return deferred.promise;
        },
        getAlbumPhotos:function(albumId){
            var deferred=$q.defer();
            FB.api("/"+albumId+"/photos",{fields:'id,name,created_time',type: "normal"},function(response){
                    if(response && !response.error)deferred.resolve(response);
                    else deferred.reject();
            })
            return deferred.promise;
        }
    };
})