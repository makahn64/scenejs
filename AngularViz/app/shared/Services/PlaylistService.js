/**
 * Created by mkahn on 8/21/15.
 */

app.factory('playlistService',
    function ($rootScope, $location, $timeout, $log, $http) {
        "use strict";

        var service = {};

        var _index = 0;

        var path;

        service.playlist = [];
        service.playlistValid = false;

        function getToken() {
           return $http.get(path + 'services/session/token')
                .then(function(data) {
                    $http.defaults.headers.common["X-CSRF-Token"] = data.data;
                    return true;
                })
        }

        function setNewTokenFromLogin(res) {

            $http.defaults.headers.common["X-CSRF-Token"] = _userState.token = res.data.token;

        }

        service.login = function() {
            return getToken()

                .then(function() {
                    return $http.post(path + 'users/login.json', {
                        username: 'stubber_viz',
                        password: 'v1zu@l'
                    })
                })

                .then(setNewTokenFromLogin)

                .catch(function(err) {
                    throw new Error("Bad login. Status: " + err.status);
                })
        }

        service.init = function (endpoint) {
            path = endpoint;

            service.login()

                .then(function () {
                    $http.get(path + 'viz-playlist-rest')

                        .then(function (data) {
                            console.log(data.data);
                            debugger;
                            service.playlist = data.data;
                            service.playlistValid = true;
                            _index = 0;
                            $log.info("Playlist loaded ok: " + endpoint);
                            $rootScope.$broadcast('PLAYLIST_LOADED');
                        })

                        .catch(function () {
                            $log.error("Could not load playlist");
                            $rootScope.$broadcast('BAD_PLAYLIST');

                        })
                })

        }

        service.getLength = function () {
            return service.playlist.length;
        }

        service.getIndex = function () {
            return _index;
        }

        service.getCurrent = function () {

            return service.playlist[_index];

        }

        service.next = function () {

            _index++;

            if (_index === service.playlist.length) {
                _index = 0;
                $rootScope.$broadcast('WRAP_PLAYLIST');

            }

            return _index;

        }

        service.sequence = function () {

            var nextItem = service.getCurrent();
            $log.info("Getting ready to play: " + nextItem.src);

            switch (nextItem.type) {

                case 'image':
                    $timeout(function () {
                        $location.path('image/' + _index)
                    });
                    break;

                case 'video':
                    $timeout(function () {
                        $location.path('video/' + _index)
                    });
                    break;

                case 'viz':
                    $timeout(function () {
                        $location.path('viz/' + _index)
                    });
                    break;

                default:

                    //This shouldn't crash in production
                    throw new Error("Malformed JSON, you dope. Unrecognized type: " + nextItem.type);

            }


        }

        service.completed = function () {

            service.next();
            service.sequence();

        }

        return service;


    });
