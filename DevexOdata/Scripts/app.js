﻿/// <reference path="angular.js" />

var app = angular.module("myApp", ["dx"]);

app.controller("testCtrl", function($scope) {

    $scope.dataGridOptions = {
        dataSource: customers,
        columns: ["CompanyName", "City", "State", "Phone", "Fax"],
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Ara..."
        }
    };

});
var host = 'http://localhost:61757/';
app.controller("customerCtrl",function($scope, $http) {
    $scope.data = null;
        function init() {
            $http({
                url: host + 'api/customer/getall',
                method: 'GET'
            }).then(function (ev) {
                console.log(ev);
                if (ev.data.success) {
                    $scope.data = ev.data.data;
                    loadGrid();
                }
            });
        }
    function loadGrid() {
        console.log($scope.data);
        $scope.dataGridOptions = {
            dataSource: {
                store: {
                    type: "odata",
                    url:'/odata/CustomerOData'
                }
            },
            selection: {
                mode:"multiple"
            },
            onSelectionChanged: function(selected) {
                $scope.selected = selected.selectedRowsData;
            },
            export: {
                enabled: true,
                fileName: "Customers"+parseInt(Math.random()*100000),
                allowExportSelectedData:true
            },
            columnChooser: {
                enabled: true,
                allowSearch:true
            },
            groupPanel: {
                visible:true
            },
            filterRow: {
                visible:true
            },
            headerFilter: {
                visible: true
            },
            columns: [
                {
                    dataField: "Id",
                    caption: "Müşteri No",
                    visible:false
                }, {
                    dataField: "Name",
                    groupIndex:0

                } , "Surname", "Phone", "Address", {
                    dataField: "Balance",
                    caption: "Balance",
                    dataType: "number",
                    format:"#,###,## ₺"
                }],
            showBorders: true,
            paging: { pageSize: 10 },
            pager: {
                showPageSizeSelect:true,
                allowedPageSizes:[5,10,20],
                showInfo:true
            },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Ara..."
            },
            summary: {
                totalItems: [
                    {
                        column: "Balance",
                        summaryType: "sum",
                        valueFormat: "#,##0,## ₺"
                    }],
                groupItems: [
                    {
                        column: "Name",
                        summaryType: "count",
                        displayFormat: "Toplam:{0}"
                    }, {
                        column: "Balance",
                        summaryType: "avg",
                        displayFormat: "Ortalama:{0}",
                        alignByColumn: true,
                        valueFormat: "#,##0,## ₺"
                    }]
            }
            };
        }
        init();
    });

var customers = [{
    "ID": 1,
    "CompanyName": "Super Mart of the West",
    "Address": "702 SW 8th Street",
    "City": "Bentonville",
    "State": "Arkansas",
    "Zipcode": 72716,
    "Phone": "(800) 555-2797",
    "Fax": "(800) 555-2171",
    "Website": "http://www.nowebsitesupermart.com"
}, {
    "ID": 2,
    "CompanyName": "Electronics Depot",
    "Address": "2455 Paces Ferry Road NW",
    "City": "Atlanta",
    "State": "Georgia",
    "Zipcode": 30339,
    "Phone": "(800) 595-3232",
    "Fax": "(800) 595-3231",
    "Website": "http://www.nowebsitedepot.com"
}, {
    "ID": 3,
    "CompanyName": "K&S Music",
    "Address": "1000 Nicllet Mall",
    "City": "Minneapolis",
    "State": "Minnesota",
    "Zipcode": 55403,
    "Phone": "(612) 304-6073",
    "Fax": "(612) 304-6074",
    "Website": "http://www.nowebsitemusic.com"
}, {
    "ID": 4,
    "CompanyName": "Tom's Club",
    "Address": "999 Lake Drive",
    "City": "Issaquah",
    "State": "Washington",
    "Zipcode": 98027,
    "Phone": "(800) 955-2292",
    "Fax": "(800) 955-2293",
    "Website": "http://www.nowebsitetomsclub.com"
}, {
    "ID": 5,
    "CompanyName": "E-Mart",
    "Address": "3333 Beverly Rd",
    "City": "Hoffman Estates",
    "State": "Illinois",
    "Zipcode": 60179,
    "Phone": "(847) 286-2500",
    "Fax": "(847) 286-2501",
    "Website": "http://www.nowebsiteemart.com"
}, {
    "ID": 6,
    "CompanyName": "Walters",
    "Address": "200 Wilmot Rd",
    "City": "Deerfield",
    "State": "Illinois",
    "Zipcode": 60015,
    "Phone": "(847) 940-2500",
    "Fax": "(847) 940-2501",
    "Website": "http://www.nowebsitewalters.com"
}, {
    "ID": 7,
    "CompanyName": "StereoShack",
    "Address": "400 Commerce S",
    "City": "Fort Worth",
    "State": "Texas",
    "Zipcode": 76102,
    "Phone": "(817) 820-0741",
    "Fax": "(817) 820-0742",
    "Website": "http://www.nowebsiteshack.com"
}, {
    "ID": 8,
    "CompanyName": "Circuit Town",
    "Address": "2200 Kensington Court",
    "City": "Oak Brook",
    "State": "Illinois",
    "Zipcode": 60523,
    "Phone": "(800) 955-2929",
    "Fax": "(800) 955-9392",
    "Website": "http://www.nowebsitecircuittown.com"
}, {
    "ID": 9,
    "CompanyName": "Premier Buy",
    "Address": "7601 Penn Avenue South",
    "City": "Richfield",
    "State": "Minnesota",
    "Zipcode": 55423,
    "Phone": "(612) 291-1000",
    "Fax": "(612) 291-2001",
    "Website": "http://www.nowebsitepremierbuy.com"
}, {
    "ID": 10,
    "CompanyName": "ElectrixMax",
    "Address": "263 Shuman Blvd",
    "City": "Naperville",
    "State": "Illinois",
    "Zipcode": 60563,
    "Phone": "(630) 438-7800",
    "Fax": "(630) 438-7801",
    "Website": "http://www.nowebsiteelectrixmax.com"
}, {
    "ID": 11,
    "CompanyName": "Video Emporium",
    "Address": "1201 Elm Street",
    "City": "Dallas",
    "State": "Texas",
    "Zipcode": 75270,
    "Phone": "(214) 854-3000",
    "Fax": "(214) 854-3001",
    "Website": "http://www.nowebsitevideoemporium.com"
}, {
    "ID": 12,
    "CompanyName": "Screen Shop",
    "Address": "1000 Lowes Blvd",
    "City": "Mooresville",
    "State": "North Carolina",
    "Zipcode": 28117,
    "Phone": "(800) 445-6937",
    "Fax": "(800) 445-6938",
    "Website": "http://www.nowebsitescreenshop.com"
}];