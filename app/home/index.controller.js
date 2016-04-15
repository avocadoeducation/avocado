(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($window,UserService, CenterService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveCenter = saveCenter;
        vm.deleteCenter = deleteCenter;

        initController();

        function initController() {
            // get current user
            CenterService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveCenter() {
            CenterService.Update(vm.center)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteCenter() {
            CenterService.Delete(vm.center._id)
                .then(function () {
                    // log user out
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();
