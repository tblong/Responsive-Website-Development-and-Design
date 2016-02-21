/* global points */
/* global Meteor */

points = new Meteor.Collection('pointsCollection');

Meteor.methods({
    'clear': function () {
        points.remove({});
    }
});
