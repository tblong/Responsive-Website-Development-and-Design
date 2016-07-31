import './instructions.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.instructions.events({
    'click .js-meals-link, click .js-cals-link'(event) { // eslint-disable-line no-unused-vars
        if (Meteor.user()) {
            return true;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        return false;
    },
});
