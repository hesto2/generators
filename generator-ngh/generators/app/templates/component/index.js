'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
export class <%= lowerCamelCaseName%>{
    constructor() {
        'ngInject';
    }
}

export default angular.module('directives.<%= lowerCamelCaseName %>', [])
    .component('<%= lowerCamelCaseName %>', {
        template: require('./<%= dashedName %>.html'),
        controller: <%= lowerCamelCaseName%>  
    })
    .name;
