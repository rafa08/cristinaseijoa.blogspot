var app = angular.module("myApp", ['firebase', 'angularUtils.directives.dirPagination']);

app.config(function (paginationTemplateProvider) {
    paginationTemplateProvider.setString('<ul class="pagination " ng-if="1 < pages.length || !autoHide">    <li class="nopad" ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }">        <a href="" ng-click="setCurrent(1)"><i class="material-icons">first_page</i></a>    </li>    <li class="nopad" ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }">        <a href="" ng-click="setCurrent(pagination.current - 1)"><i class="material-icons">chevron_left</i></a>    </li>    <li ng-click="setCurrent(pageNumber)"class="waves-effect white-text" ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }">        <a href="" >{{ pageNumber }}</a>    </li>    <li class="nopad" ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"> <a href="" ng-click="setCurrent(pagination.current + 1)"><i class="material-icons">chevron_right</i></a>    </li> <li class="nopad" ng-if="boundaryLinks"  ng-class="{ white-text: pagination.current != pagination.last, disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)"><i class="material-icons">last_page</i></a></li></ul>');
});

app.controller("cursos", function ($scope, $filter, $firebaseArray) {
    var ref = firebase.database().ref().child('Cursos');
    $scope.cursos = $firebaseArray(ref);
});
app.controller("Libros", function ($scope, $filter, $firebaseArray) {
    $scope.Sort = function (val) {
        if ($scope.sort == val) {
            $scope.reverse = !$scope.reverse;
        }
        $scope.sort = val;
        $('th a').each(function () {
            $(this).removeClass().addClass('icon-sort');
        });

    };

    $scope.currentPage = 0;
    $scope.pageSize = 6;
    var ref = firebase.database().ref().child('Libros');
    $scope.libros = $firebaseArray(ref);
    $scope.numberOfPages = function () {
        return Math.ceil($scope.libros.length / $scope.pageSize);
    }
});
app.$inject = ['$scope', '$filter'];

app.directive("customSort", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            order: '=',
            sort: '='
        },
        template:
            " <a ng-click='sort_by(order)' style='color: #555555;'>" +
            "    <span ng-transclude=''/>" +
            "    <i ng-class='selectedCls(order)'/>" +
            "</a>",
        link: function (scope) {

            // change sorting order
            scope.sort_by = function (newSortingOrder) {
                var sort = scope.sort;

                if (sort.sortingOrder == newSortingOrder) {
                    sort.reverse = !sort.reverse;
                }

                sort.sortingOrder = newSortingOrder;
            };


            scope.selectedCls = function (column) {
                if (column == scope.sort.sortingOrder) {
                    return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
                }
                else {
                    return 'icon-sort'
                }
            };
        }// end link
    }
});

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});