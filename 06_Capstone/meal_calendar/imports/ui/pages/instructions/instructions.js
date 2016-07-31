import './instructions.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.instructions.events({
    'click .js-meals-link, click .js-cals-link'(event) {
        if (Meteor.user()) {
            return true;
        }
        alert('Please create an account and/or login first.');
        return false;
    },
});
