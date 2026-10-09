sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("fleetTracker.controller.TruckAllocation", {
        onInit: function () {
        },

        onAllocate: function () {
            var driver = this.byId("driverSelect").getSelectedKey();
            var truck = this.byId("truckSelect").getSelectedKey();
            var date = this.byId("allocDate").getValue();

            if (!driver || !truck || !date) {
                MessageToast.show("Please select a driver, a truck, and a date.");
                return;
            }

            MessageToast.show("Successfully allocated Truck " + truck + " to Driver " + driver);
            
            // clear form
            this.byId("driverSelect").setSelectedKey("");
            this.byId("truckSelect").setSelectedKey("");
            this.byId("allocDate").setValue("");
        }
    });
});
