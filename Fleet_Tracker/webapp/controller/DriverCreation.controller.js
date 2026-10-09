sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("fleetTracker.controller.DriverCreation", {
        onInit: function () {
        },

        onSaveDriver: function () {
            var fName = this.byId("fName").getValue();
            var lName = this.byId("lName").getValue();
            var license = this.byId("license").getValue();

            if (!fName || !lName || !license) {
                MessageToast.show("Please fill in all required fields.");
                return;
            }

            // Mock saving driver logic
            MessageToast.show("Driver " + fName + " " + lName + " created successfully!");
            this.onClearForm();
        },

        onClearForm: function () {
            this.byId("fName").setValue("");
            this.byId("lName").setValue("");
            this.byId("license").setValue("");
            this.byId("contact").setValue("");
            this.byId("experience").setValue(0);
        }
    });
});