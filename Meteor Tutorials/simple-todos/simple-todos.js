/* global Mongo */
/* global Tasks */
/* global Template */
/* global Meteor */

Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
    
    // body helpers
    Template.body.helpers({
        tasks: function () {
            return Tasks.find({});
        }
    });
    
    // body event handlers
    Template.body.events({
        "submit .new-task": function (event) {
            console.log(event);
            
            // prevent default browser form submit
            event.preventDefault();
            
            // get value from form element
            var text = event.target.text.value;
            
            // don't allow blank tasks to be inserted
            if (text == "") {
                alert("Please insert a task");
                return;
            }
            
            // insert task into collection
            Tasks.insert({
                text: text,
                createdAt: new Date()
            });
            
            // clear the form
            event.target.text.value = "";
        }

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
