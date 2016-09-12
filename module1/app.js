(function () {
    'use strict';

    angular.module("first_app", [])
        .controller("my_controller", my_controller);
    my_controller.$inject = ['$scope'];
    function my_controller($scope) {
        $scope.lunch = "";
        $scope.message = "";

        $scope.input_css_class = "";
        $scope.message_css_class = "";


        $scope.handlerClick = function() {
            var dishesCount = countDishes($scope.lunch);
            displayMessage(dishesCount);
        };

        var countDishes = function(dishesString) {
            var dishes = dishesString.split(",");
            var totalDishesCount = dishes.length;
            var validDishesCount = dishes.filter(function(x){ return x.trim()!=""}).length;
            return {totalDishesCount: totalDishesCount, validDishesCount: validDishesCount}
        };

        var displayMessage = function(dishesCount){
            var validDishesCount = dishesCount.validDishesCount;
            var totalDishesCount = dishesCount.totalDishesCount;
            if(validDishesCount == 0) {
                $scope.message = "Please enter data first";
                $scope.input_css_class = "has-error";
                $scope.message_css_class = "alert alert-danger";
            } else if (validDishesCount <= 3) {
                $scope.message = "Enjoy!";
                $scope.input_css_class = "has-success";
                $scope.message_css_class = "alert alert-success";
            } else {
                $scope.message = "Too much!";
                $scope.input_css_class = "has-success";
                $scope.message_css_class = "alert alert-success";
            }

            if(validDishesCount != totalDishesCount) {
                $scope.message = $scope.message + " (Only valid dishes, blank dishes are invalid)";
            }
        }

    }

})();
