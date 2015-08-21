/**
 * Created by mkahn on 8/21/15.
 */

app.factory('playlistService',
            function ($rootScope, $location, $log, $http) {
                "use strict";

                var service = {};

                var _index = 0;

                service.playlist = [];
                service.playlistValid = false;

                service.init = function () {

                    var endpoint = 'assets/playlists/playlist.json';

                    $http.get(endpoint)
                        .then(function (data) {
                                  service.playlist = data.data;
                                  service.playlistValid = true;
                                  _index = 0;
                                  $log.info("Playlist loaded ok: " + endpoint);
                                  $rootScope.$broadcast('PLAYLIST_LOADED');

                              })

                        .catch(function (err) {
                                   $log.error("Could not load playlist");
                                   $rootScope.$broadcast('BAD_PLAYLIST');

                               });

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
                            $location.path('image');
                            break;

                        case 'video':
                            $location.path('video');
                            break;

                        case 'viz':
                            $location.path('viz');
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
