sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fleetTracker.controller.OperationsSupport", {
        onInit: function () {
            var oViewModel = new JSONModel({
                selectedShipment: "VDC-222987"
            });
            this.getView().setModel(oViewModel, "view");
        }
    });
});
