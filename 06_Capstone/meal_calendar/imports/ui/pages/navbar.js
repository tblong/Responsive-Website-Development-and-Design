import './navbar.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.navbar.events({
    'click #meals-nav, click #cals-nav'(event) { // eslint-disable-line no-unused-vars
        if (Meteor.user()) {
            return;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        return false; // eslint-disable-line consistent-return
    },
});
