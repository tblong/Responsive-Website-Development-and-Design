import './navbar.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.navbar.events({
    'click #meals-nav, click #cals-nav'(event) {
        if (Meteor.user()) {
            return true;
        }
        alert('Please create an account and/or login first.');
        return false;
    },
});
