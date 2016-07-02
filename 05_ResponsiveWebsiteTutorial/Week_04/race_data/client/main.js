
// this variable will store the visualisation so we can delete it when we need to 
var visjsobj;

Template.raceData_visjs.onRendered(function () {
    // template rendered
    initBlobVis();
});

// template events
Template.raceData.events({
    "click #driver-dob": function () {
        initDriverDob();
    },
    "click #driver-speed": function () {
        initBlobVis();
    },
    "click #driver-fastest-lap": function () {
        initDriverFastestLap();
    }
});

function initDriverFastestLap() {
    $.getJSON("20160501_RussianGrandPrixdata.json", function (json) {
        var results = getRaceResults(json);
        var nodes = [];
        var edges = [];

        // iterate over the drivers in the result set
        $.each(results, function (index, driver) {
            var driverName = driver.Driver.driverId;
            var driverPosition = Number(driver.position);
            var fastestLap = driver.FastestLap;
            var fastestLapNumber = 0.0;
            if (fastestLap) {
                fastestLapNumber = Number(fastestLap.lap);
            }

            // push nodes 
            if (fastestLapNumber > 0.0) {
                nodes.push({
                    id: index + 1,  // wierd bug when id=0 with vis.js
                    value: fastestLapNumber,
                    label: driverName + ":" + driverPosition,
                    title: "Lap#" + fastestLapNumber
                });
            }
        });

        // 
        // build vis stuff
        // 

        // clear out the old visualisation if needed
        if (visjsobj !== undefined) {
            visjsobj.destroy();
        }

        var container = document.getElementById("visjs");

        var data = {
            nodes: nodes,
            edges: edges
        }
        var options = {
            nodes: {
                shape: "dot"
            }
        }

        visjsobj = new vis.Network(container, data, options);

    });
}

function initDriverDob() {
    $.getJSON("20160501_RussianGrandPrixdata.json", function (json) {
        var results = getRaceResults(json);
        var items = [];

        // iterate over the drivers in the result set
        $.each(results, function (index, driver) {
            var driverName = driver.Driver.driverId;
            var driverPosition = Number(driver.position);
            var driverDob = driver.Driver.dateOfBirth;

            // push items 
            items.push({
                id: index + 1,  // wierd bug when id=0 with vis.js
                content: driverName + ":" + driverPosition,
                start: driverDob,
                title: driverDob
            });

        });

        // 
        // build vis stuff
        // 

        // clear out the old visualisation if needed
        if (visjsobj !== undefined) {
            visjsobj.destroy();
        }

        var container = document.getElementById("visjs");

        var options = {};

        visjsobj = new vis.Timeline(container, items, options);

    });


}

// function that creates a new blobby visualisation
function initBlobVis() {
    // try to get json data
    $.getJSON("20160501_RussianGrandPrixdata.json", function (json) {
        var results = getRaceResults(json);
        var nodes = [];
        var edges = [];

        // iterate over the drivers in the result set
        $.each(results, function (index, driver) {
            var driverName = driver.Driver.driverId;
            var driverPosition = Number(driver.position);
            var fastestLap = driver.FastestLap;
            var avgSpeed = 0.0;
            if (fastestLap) {
                avgSpeed = Number(fastestLap.AverageSpeed.speed);
            }

            // push nodes 
            if (avgSpeed > 1.0) {
                nodes.push({
                    id: index + 1,  // wierd bug when id=0 with vis.js
                    value: avgSpeed,
                    label: driverName + ":" + driverPosition,
                    title: avgSpeed + "kph"
                });
            }
        });

        // 
        // build vis stuff
        // 

        // clear out the old visualisation if needed
        if (visjsobj !== undefined) {
            visjsobj.destroy();
        }

        var container = document.getElementById("visjs");

        var data = {
            nodes: nodes,
            edges: edges
        }
        var options = {
            nodes: {
                shape: "dot"
            }
        }

        visjsobj = new vis.Network(container, data, options);

    });

}

// returns the array of results from the race
function getRaceResults(json) {

    if (!json)
        return [];

    return json.MRData.RaceTable.Races[0].Results;
}
