
// this variable will store the visualisation so we can delete it when we need to 
var visjsobj;

Template.raceData_visjs.onRendered(function () {
    // template rendered
    initBlobVis();
});



// function that creates a new blobby visualisation
function initBlobVis() {
    // try to get json data
    $.getJSON("20160501_RussianGrandPrixdata.json", function (json) {
        // console.log(data);
        var results = getRaceResults(json);
        var nodes = [];
        var edges = [];
        // console.log(results);

        // iterate over the drivers in the result set
        $.each(results, function (index, driver) {
            // print each driver name and speed
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
                    id: index,
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
