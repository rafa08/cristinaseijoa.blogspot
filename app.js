var app = angular.module("myApp", ['firebase', 'angularUtils.directives.dirPagination']);

app.config(function (paginationTemplateProvider) {
    paginationTemplateProvider.setString('<ul class="pagination " ng-if="1 < pages.length || !autoHide">    <li class="nopad" ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }">        <a href="" ng-click="setCurrent(1)"><i class="material-icons">first_page</i></a>    </li>    <li class="nopad" ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }">        <a href="" ng-click="setCurrent(pagination.current - 1)"><i class="material-icons white-text">chevron_left</i></a>    </li>    <li ng-click="setCurrent(pageNumber)"class="waves-effect" ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }">        <a href="" class="white-text" >{{ pageNumber }}</a>    </li>    <li class="nopad" ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"> <a href="" ng-click="setCurrent(pagination.current + 1)"><i class="material-icons white-text">chevron_right</i></a>    </li> <li class="nopad" ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)"><i class="material-icons">last_page</i></a></li></ul>');
});

app.controller("cursos", function ($scope, $filter, $firebaseArray) {
    var ref = firebase.database().ref().child('Cursos');
    $scope.cursos = $firebaseArray(ref);
});
app.controller("Libros", function ($scope, $filter, $firebaseArray) {
    $scope.nombre = "";
    var ref = firebase.database().ref().child('Libros');
    $scope.libros = $firebaseArray(ref);

    $scope.verLibros = function(link,nombre){
        if(link != null){
            window.open(link,"_blank");
        }else{
            $scope.nombre = nombre;
            $('.modal').modal();
            $('#modal1').modal('open');   
        }
    };
});

app.controller("articulos", function ($scope, $filter, $firebaseArray) {
    var ref = firebase.database().ref().child('Articulos');
    $scope.articulos = $firebaseArray(ref);
});
