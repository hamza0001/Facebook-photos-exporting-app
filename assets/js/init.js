myApp.run(['$rootScope', '$window','$state',
  function($rootScope, $window,$state) {
        $rootScope.user={}
        $rootScope.albums={}
        
        $window.fbAsyncInit = function () {
            FB.init({
                appId: '1745981035655002',
                xfbml: true,
                version: 'v2.8'
            });
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
            };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "http://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js,fjs);
            }
            (document, 'script', 'facebook-jssdk')
        );

        this.checkLoginStatus=function() {
            FB.getLoginStatus(function (response) { statusChangeCallback(response); });
        }
      
        this.statusChangeCallback=function (response) {
            if (response.status === 'connected') {
                $rootScope.accessToken=response.authResponse.accessToken || '';   
                 FB.api('/me', function(res) {
                        $rootScope.$apply(function() {
                             $rootScope.user = res;
                             $state.go('main.albums');
                        });
                    });     
            }
            else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            }
            else {
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }
        this.logout=function(){
             FB.logout(function(response) {
                 document.location.href="/";
             });
        }
     }
]);