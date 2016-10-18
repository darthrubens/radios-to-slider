(function (angular) {
    angular.module('rubnetd.radio.slider', [])
        .directive('radioSlider', radioSlider)
    ;

    radioSlider.$inject = ['$timeout'];
    function radioSlider ($timeout) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                name: '=?',
                values: '='
            },
            template: '<div>'+
                '<input name="{{name}}" id="{{name}}_{{value}}" type="radio" ng-model="ngModel" ng-repeat-start="(value, label) in values" value="{{value}}">'+
                '<label for="{{name}}_{{value}}" ng-repeat-end>{{label}}</label>'+
            '</div>',
            link: function (scope, element) {
                if (!scope.name) {
                    scope.name = 'radio_slider_'+(idx++);
                }

                $timeout(function () {
                    element.find('div').first().radiosToSlider({
                        onSelect: function (radio) {
                            scope.ngModel = radio.val();
                            scope.$apply();
                        }
                    });
                }, 150);
            }
        };
    }
}(angular));
