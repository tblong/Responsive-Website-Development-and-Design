import './home.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.home.helpers({
    isLoggedIn() {
        if (Meteor.user()) {
            return '';
        }
        return 'disabled';
    },
});


Template.home.events({
    'click .js-meals-link, click .js-cals-link'(event) { // eslint-disable-line no-unused-vars
        if (Meteor.user()) {
            return;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        return false; // eslint-disable-line consistent-return
    },
});
