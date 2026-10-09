sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fleetTracker.controller.VehicleDetail", {
        onInit: function () {
            var oViewModel = new JSONModel({
                selectedVehicle: "TRK-001"
            });
            this.getView().setModel(oViewModel, "view");
            
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("VehicleDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel("fleet");
            if (oModel) {
                // Ensure default binding exists when opening page directly
                var sKey = oView.getModel("view").getProperty("/selectedVehicle");
                var aVehicles = oModel.getProperty("/vehicles");
                if (aVehicles) {
                    var iIndex = aVehicles.findIndex(v => v.id === sKey);
                    if (iIndex === -1) iIndex = 0;
                    oView.bindElement({
                        path: "/vehicles/" + iIndex,
                        model: "fleet"
                    });
                } else {
                    oModel.dataLoaded().then(function() {
                        oView.bindElement({
                            path: "/vehicles/0",
                            model: "fleet"
                        });
                    });
                }
            }
        },

        onVehicleSelect: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var sPath = oSelectedItem.getBindingContext("fleet").getPath();
                this.getView().bindElement({
                    path: sPath,
                    model: "fleet"
                });
            }
        }
    });
});
