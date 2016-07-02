/* global Meteor */
// 
// server code
// 

// collections to publish
Meteor.publish("musicMachine", function () {
    return MusicMachine.find({});
});


//      MusicMachine.remove({});
if (MusicMachine.find().count() === 0) {
    MusicMachine.insert({
        slide: 50,
        tracks: [
            {
                displayName: "Bell Synth",
                path: "Bell_Synth_125_A#.wav",
                playing: 0
            },
            {
                displayName: "Disturbing Synth",
                path: "Disturbing1_Synth_125_C.wav",
                playing: 0
            },
            {
                displayName: "Dirty Bass",
                path: "Drty_Bass_125_A.wav",
                playing: 0
            },
            {
                displayName: "Drum Loop 03",
                path: "FM_120-DrumLoop_003.wav",
                playing: 0
            },
            {
                displayName: "Drum Loop 06",
                path: "FM_120-DrumLoop_006.wav",
                playing: 0
            },
            {
                displayName: "Fmod Synth",
                path: "Fmod_Synth_125_E.wav",
                playing: 0
            },
            {
                displayName: "Layh Pad",
                path: "Layh_Pad_125_CA#.wav",
                playing: 0
            },
            {
                displayName: "Powerplant Lead",
                path: "Powerplant_Lead_125_G.wav",
                playing: 0
            },
            {
                displayName: "Terraforming Synth",
                path: "Terraforming_Synth_125_E.wav",
                playing: 0
            },
            {
                displayName: "Wimp Synth",
                path: "Wimp_Synth_125_E.wav",
                playing: 0
            }
        ]
    });

}