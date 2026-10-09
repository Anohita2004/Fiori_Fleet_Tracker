sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("fleetTracker.controller.TruckTracking", {
        formatter: {
            statusText: function (sStatus) {
                switch (sStatus) {
                    case "Active": return "Success";
                    case "In Maintenance": return "Warning";
                    case "Inactive": return "Error";
                    default: return "None";
                }
            },
            fuelState: function (iFuelLevel) {
                if (iFuelLevel > 50) return "Success";
                if (iFuelLevel > 20) return "Warning";
                return "Error";
            }
        },

        onInit: function () {
        },

        onSearch: function (oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("id", FilterOperator.Contains, sQuery));
            }
            var oList = this.byId("vehiclesTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});
