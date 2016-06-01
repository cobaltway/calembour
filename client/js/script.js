var app = angular.module("calembour", ['angular-inview']);
app.controller("ctrl", function ($scope, $http) {
    $scope.names = [];
    $scope.extensions = [];
    $scope.displayUnavailableBol = true;
    $http.get("api/list/").success(function(d) {
        for (var i in d) {
            $scope.extensions.push({
                name: d[i],
                selected: false,
                alreadySelected: false
            });
        }
    });
    
    $scope.clickDomain = function(ext) {
        if (!ext.alreadySelected) {
            $http.get("api/extension/" + ext.name).success(function(d) {
                for (var i in d) {
                    if (d[i].indexOf(" ") == -1 && d[i].indexOf("'") == -1 && d[i].length > 1) {
                        $scope.names.push({
                            name: d[i],
                            ext: ext,
                            available: false,
                            loaded: false,
                            display: true
                        });
                    }
                }
            });
            ext.alreadySelected = true;
        }
        ext.selected = !ext.selected;
    };
    
    $scope.warnMe = function(name) {
        if (!name.loaded) {
            $http.get("api/available/" + name.name + "." + name.ext.name).success(function(d) {
                name.available = d;
                name.loaded = true;
                if (!d) {
                    name.display = $scope.displayUnavailableBol;
                }
                else {
                    name.display = true;
                }
            });
        }
    };
    
    $scope.displayUnavailable = function() {
        $scope.displayUnavailableBol = !$scope.displayUnavailableBol;
        for (var i in $scope.names) {
            if (!$scope.names[i].available && $scope.names[i].loaded) {
                $scope.names[i].display = $scope.displayUnavailableBol;
            }
        }
    };
});