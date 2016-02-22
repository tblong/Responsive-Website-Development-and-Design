/* global $ */
/* global Maxim */
/* global sounds */
/* global tracks */
/* global Session */
/* global Template */
/* global MusicMachine */

// 
// client code
// 


// list of tracks to load
Session.set("tracksLoaded", false);
Session.set("soundsLoaded", false);
Session.set("lastDacState", "Play All Clicked");
tracks = undefined;
sounds = undefined;

// startup
Meteor.startup(function () {
    Meteor.subscribe("musicMachine", function () {
        // subscription is ready
        if (tracks === undefined) {
            // tracks not initialized yet
            tracks = [];
            tracks = MusicMachine.findOne().tracks;
            Session.set("tracksLoaded", true);
        }

        if (sounds === undefined) {
            // sounds no loaded
            sounds = [];
            
            // init sounds and get Maxim audio refs for each track listed in db
            for (var i = 0; i < tracks.length; i++) {
                var maxim = new Maxim();
                var player = maxim.loadFile(tracks[i].path);
                player.setLooping(true);
                sounds.push(player);
            }
        }
    });
});


function playAllTracks() {
    for (var i = 0; i < sounds.length; i++) {
        sounds[i].play();
        sounds[i].volume(1);
        Session.set("volume" + i, 1.0);
    }
    
    // update all sliders to max volume
    $(".vol-slider").slider("value", 1.0);

    Session.set("lastDacState", "Play All Clicked");
    Session.set('startdac', 1);
    var val = MusicMachine.findOne({});
    MusicMachine.update({ _id: val._id }, { $set: { start: 1 } });
}

function stopAllTracks() {
    for (var i = 0; i < sounds.length; i++) {
        sounds[i].stop();
    }
    Session.set("lastDacState", "Stop All Clicked");
    Session.set('startdac', 0);
    var val = MusicMachine.findOne({});
    MusicMachine.update({ _id: val._id }, { $set: { start: 0 } });
}


function muteAllTracks() {
    for (var i = 0; i < sounds.length; i++) {
        sounds[i].volume(0);
        Session.set("volume" + i, 0);
    }
    
    // update all sliders to min volume
    $(".vol-slider").slider("value", 0.0);

    Session.set("lastDacState", "Mute All Clicked");
}


// 
// template helpers
// 

//  mixer onrendered
Template.mixer.onRendered(function () {
    
    // create slider handlers
    var volSliderHandler = _.throttle(function (event, ui) {
        var id = $(event.target).data("trackid");
        Session.set("volume" + id, ui.value);
        // TODO need to set 
    }, 100, { leading: false });

    var spdSliderHandler = _.throttle(function (event, ui) {
        var id = $(event.target).data("trackid");
        Session.set("speed" + id, ui.value);
    }, 100, { leading: false });

    // add volume sliders to DOM
    $(".vol-slider").slider({
        slide: volSliderHandler,
        max: 1.0,
        min: 0.0,
        step: 0.1,
        value: 1.0
    });
    
    // add speed sliders to DOM
    $(".spd-slider").slider({
        slide: spdSliderHandler,
        max: 1.0,
        min: 0.0,
        step: 0.1,
        value: 1.0
    });

});


// mixer helpers
Template.mixer.helpers({
    // TODO
    tracks: function () {
        return MusicMachine.findOne().tracks;
    },
    lastDacState: function () {
        return Session.get("lastDacState");
    },
    getVolume: function (id) {
        return Session.get("volume" + id);
    },
    getSpeed: function (id) {
        return Session.get("speed" + id);
    }

});

// mixer event handlers
Template.mixer.events({
    "click button#play-all": function () {
        playAllTracks();
    },
    "click button#stop-all": function () {
        stopAllTracks();
    },
    "click button#mute-all": function () {
        muteAllTracks();
    },
    "click button.play-track": function () {
        var id = $(event.target).data("trackid");
        sounds[id].volume(1);
        Session.set("volume" + id, 1.0);
        $('.vol-slider[data-trackid="' + id + '"]').slider("value", 1.0);
    },
    "click button.stop-track": function () {
        var id = $(event.target).data("trackid")
        sounds[id].volume(0);
        Session.set("volume" + id, 0);
        $('.vol-slider[data-trackid="' + id + '"]').slider("value", 0.0);
    }
});

// playground helpers
// Template.playground.helpers({

//     "startdac": function () {

//         var starter = MusicMachine.findOne();
//         if (starter) {
//             if (starter.start == 1) {
//                 playAll();

//             }
//             else if (starter.start == 0) {
//                 stopAll();
//             }
//         }

//         return Session.get('startdac');
//     },

//     "drums": function () {

//         var starter = MusicMachine.findOne();
//         if (starter) {
//             if (starter.drums == 1) {
//                 playDrums();

//             } else if (starter.drums == 0) {

//                 stopDrums();

//             }
//         }

//         return Session.get('drums');
//     },

//     "bass": function () {
//         var starter = MusicMachine.findOne();
//         if (starter) {
//             if (starter.bassline == 1) {
//                 playBass();

//             } else if (starter.bassline == 0) {

//                 stopBass();

//             }
//         }
//         return Session.get('bass');
//     },

//     "arp": function () {
//         var starter = MusicMachine.findOne();
//         if (starter) {
//             if (starter.arp == 1) {
//                 playArp();

//             } else if (starter.arp == 0) {

//                 stopArp();

//             }
//         }
//         return Session.get('arp');
//     },

   

//     //don't forget the commas between each function
//     //the last one doesn't have to have one!


//     "sliderVal1": function () {
//         var slider = MusicMachine.findOne();
//         if (slider) {
//             Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
//             setSpeed(slider.slide / 50);
//             return slider.slide;
//         }
//     },

// });



// 
// event handlers
// 

// Template.playground.events({

//     "click button.startButton": function () {
//         Session.set('startdac', 1);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { start: 1 } });
//     },

//     "click button.myButton1": function () {
//         Session.set('drums', 1);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { drums: 1 } });

//     },
//     "click button.myButton2": function () {
//         Session.set('drums', 0);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { drums: 0 } });
//     },

//     "click button.myButton3": function () {
//         Session.set('bass', 1);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { bassline: 1 } });

//     },

//     "click button.myButton4": function () {
//         Session.set('bass', 0);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { bassline: 0 } });

//     },
//     "click button.myButton5": function () {
//         Session.set('arp', 1);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { arp: 1 } });

//     },

//     "click button.myButton6": function () {
//         Session.set('arp', 0);
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { arp: 0 } });

//     }

// });


// 
// other stuff
// 

// Template.playground.onRendered(function () {
//     $('h2').hide();
//     var handler = _.throttle(function (event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, { $set: { slide: ui.value } });
//     }, 50, { leading: false });

//     if (!this.$('#slider1').data('uiSlider')) {
//         $("#slider1").slider({
//             slide: handler,
//             min: 0,
//             max: 100
//         });
//     }
// });