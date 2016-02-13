// 
// server code
// 

// collections to publish
Meteor.publish("musicMachine", function() {
    return MusicMachine.find({});
});


//      MusicMachine.remove({});
if (MusicMachine.find().count() === 0) {
    MusicMachine.insert({ slide: 50 });

}