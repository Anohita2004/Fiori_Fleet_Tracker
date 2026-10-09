sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("fleetTracker.controller.LiveLocation", {
        onInit: function () {
        },

        onAfterRendering: function () {
            // Dynamically load Leaflet CSS
            if (!document.getElementById("leaflet-css")) {
                var link = document.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            // Dynamically load Leaflet JS
            if (!window.L) {
                var script = document.createElement("script");
                script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                script.onload = this._initMap.bind(this);
                document.head.appendChild(script);
            } else {
                this._initMap();
            }
        },

        onRefreshMap: function () {
            this._initMap();
        },

        _initMap: function () {
            // Wait slightly for DOM to ensure mapContainer is ready
            var checkExist = setInterval(function() {
               if (document.getElementById("fleetMapContainer")) {
                  clearInterval(checkExist);
                  
                  if(this._map) {
                      this._map.remove(); // Clean up if re-rendering
                  }

                  this._map = L.map("fleetMapContainer").setView([39.8283, -98.5795], 4); // Center of USA

                  // Standard OpenStreetMap tiles (100% free, no API key needed)
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      attribution: '© OpenStreetMap contributors',
                      maxZoom: 19
                  }).addTo(this._map);

                  // Fetch data from fleet model
                  var oModel = this.getOwnerComponent().getModel("fleet");
                  var bounds = [];
                  
                  if (oModel && oModel.getProperty("/vehicles")) {
                      var aVehicles = oModel.getProperty("/vehicles");
                      
                      // Mock coordinates for cities: NY, Chicago, Austin, Seattle, Miami
                      var mockCoords = [
                          [40.7128, -74.0060], 
                          [41.8781, -87.6298], 
                          [30.2672, -97.7431], 
                          [47.6062, -122.3321], 
                          [25.7617, -80.1918]  
                      ];

                      aVehicles.forEach(function(truck, i) {
                          var lat = mockCoords[i % mockCoords.length][0];
                          var lng = mockCoords[i % mockCoords.length][1];
                          var marker = L.marker([lat, lng]).addTo(this._map);
                          
                          var sPopupContent = "<div style='font-family: Arial;'>" +
                                              "<h3 style='margin:0 0 5px 0; color:#7956cf;'>" + truck.id + "</h3>" +
                                              "<b>Driver:</b> " + truck.driver + "<br/>" +
                                              "<b>Status:</b> " + truck.status + "<br/>" +
                                              "<b>Speed:</b> " + truck.speed +
                                              "</div>";
                          
                          marker.bindPopup(sPopupContent);
                          bounds.push([lat, lng]);
                      }.bind(this));
                  }

                  if(bounds.length > 0) {
                      this._map.fitBounds(bounds, {padding: [50, 50]});
                  }

               }
            }.bind(this), 100);
        }
    });
});
