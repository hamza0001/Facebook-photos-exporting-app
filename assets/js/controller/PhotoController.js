angular.module('myApp').controller('PhotoController',function($rootScope,$scope,$stateParams,$http,$state,PhotoService){
        $scope.currentPage = 1;
        $scope.pageSize = 2;
        $scope.albums=[];
        $scope.photos=[];
        $scope.selected={};
        $scope.formData={};
    
        $scope.getAlbums=function(){
            PhotoService.getAlbums().then(function(response){
                   console.log(response);
                   if(response){
                       for(i=0;i<response.data.length;i++){
                        $scope.albums.push({
                            id:response.data[i].id,
                            name:response.data[i].name,
                            src:makeUrl(response.data[i].id,$rootScope.accessToken)
                        });
                       }
                   }
            });
        }

        $scope.getPhotos=function(){
            var albumID=$stateParams.albumID;
            $scope.albumName=$stateParams.albumName;
            PhotoService.getAlbumPhotos(albumID).then(function(response){
                    if(response){
                        $scope.photos=[];
                         for(i=0;i<response.data.length;i++){
                            $scope.photos.push({
                                id:response.data[i].id,
                                name:response.data[i].name,
                                src:makeUrl(response.data[i].id,$rootScope.accessToken)
                            });
                        }
                    }
            });
        }

        $scope.downloadPhotos=function(){
            $scope.formData={};
            var i=0;
            for(var key in $scope.selected){
                   if($scope.selected[key]){
                       $scope.formData[key]=makeUrl(key,$rootScope.accessToken);
                   } 
            }
             $http.post('/photos',$scope.formData).
                then(function(data) {
                    console.log("posted successfully");
                    $state.go('main.sucess');
                });
        }

        var makeUrl= function( id, accessToken ) {
			return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
		}
});