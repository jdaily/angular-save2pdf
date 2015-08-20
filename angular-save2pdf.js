/**
 * angular-save2pdf - angular jsPDF wrapper
 * Copyright (c) 2015 John Daily Jr., 
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */

(function() {
    'use strict';

    angular
        .module('save2pdf', [])
            .value('ngHtmlPdfConfig', {
                pagesplit : true,
                height : null,
                pdfName : 'exportedPDF'
            })
        .directive('save2pdf', ngHtmlPdf);

        ngHtmlPdf.$inject = ['ngHtmlPdfConfig'];

        function ngHtmlPdf(ngHtmlPdfConfig) {
          return {
            link: function($scope, element, Attrs, controller) {
                if (!element[0]) { return;}

                var pagesplit = ngHtmlPdfConfig.pagesplit || true, 
                height = ngHtmlPdfConfig.pagesplit || element[0].offsetHeight, 
                pdfName = Attrs.pdfName || gHtmlPdfConfig.pdfName;
                
                $scope.$on('saveToPdf', function(event, mass) {
                    var pdf = new jsPDF('p','px','letter');
                    console.log(element, 'height', element[0].offsetHeight);
                    // We'll make our own renderer to skip this editor
                    var specialElementHandlers = {
                        '#editor': function(element, renderer){
                            return true;
                        }
                    };

                    // All units are in the set measurement for the document
                    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
                    pdf.addHTML(element[0], 50, 50, {
                        'pagesplit':pagesplit,
                        'height': element[0].offsetHeight, 
                        'elementHandlers': specialElementHandlers
                    },function(dispose) {
                        pdf.save(pdfName+".pdf");
                    });
             });
            }
          };
        };
    }
)();