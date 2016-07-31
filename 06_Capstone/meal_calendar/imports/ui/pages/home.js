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
