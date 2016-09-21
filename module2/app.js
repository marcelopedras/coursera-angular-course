(function(){
    'use strict';
    angular.module("ShoppingList",[])
        .controller("ToBuyShoppingController", ToBuyShoppingController)
        .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ["ShoppingListCheckOffService"];
    AlreadyBoughtShoppingController.$inject = ["ShoppingListCheckOffService"];


    function ToBuyShoppingController(ShoppingListCheckOffService){
        var toBuy = this;

        toBuy.itemName = "";
        toBuy.itemQuantity = "";

        toBuy.toBuyList = ShoppingListCheckOffService.listsToBuy();


        toBuy.boughtButton = function(pos) {
            ShoppingListCheckOffService.checkoutItem(pos);
        };

        toBuy.addItem = function() {
            ShoppingListCheckOffService.addToBuyItem(toBuy.itemName, toBuy.itemQuantity);
            toBuy.itemName = "";
            toBuy.itemQuantity = "";

        };

        toBuy.isEmpty = function() {
            return toBuy.toBuyList.length ==0;
        };
    }

    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.alreadyBoughtList = ShoppingListCheckOffService.listsAlreadyBought();

        alreadyBought.cancelItem = function(pos) {
            ShoppingListCheckOffService.cancelCheckoutItem(pos);
        };

        alreadyBought.isEmpty = function() {
            return alreadyBought.alreadyBoughtList.length ==0;
        };
    }

    function ShoppingListCheckOffService() {

        var service = this;

        var toBuyList=[
            {name: "Banana", quantity: "2 kg"},
            {name: "Cookies", quantity: "3 bags"},
            {name: "Chocolate", quantity: "1 kg"},
            {name: "Rice", quantity: "3 bags"},
            {name: "Bean", quantity: "3 bags"}
        ];
        var alreadyBoughtList = [];

        service.addToBuyItem = function(itemName, itemQuantity) {
            toBuyList.push({name: itemName, quantity: itemQuantity})
        };

        service.checkoutItem = function(pos) {
            var element = toBuyList.splice(pos,1)[0];
            alreadyBoughtList.push(element);
        };

        service.cancelCheckoutItem = function(pos) {
            var element = alreadyBoughtList.splice(pos,1)[0];
            toBuyList.push(element);
        };



        service.listsToBuy = function() {
            return toBuyList;
        };

        service.listsAlreadyBought = function() {
            return alreadyBoughtList;
        };


    }

})();