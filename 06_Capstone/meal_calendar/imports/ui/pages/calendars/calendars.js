/* global $:true */
/* global AutoForm:true */
/* global Meteor:true */
/* global Meals:true */
/* global Calendars:true */

import './calendars.html';
import './fullcalendar.js';
import '../footer.js';
import { Template } from 'meteor/templating';
import fullCalendar from 'fullcalendar'; // eslint-disable-line no-unused-vars
import 'meteor/mizzao:jquery-ui';

// autoform hooks
AutoForm.hooks({
    calForm: {
        before: {
            insert: function addOwner(doc) {
                const userId = Meteor.userId();
                const result = doc;
                if (userId) {
                    result.owner = userId;
                    return result;
                }

                // not logged in, cancel insert
                return false;
            },
        },
    },
});

Template.calendars.onRendered(function renderCals() { // eslint-disable-line prefer-arrow-callback
    // init external events
    // const instance = this; // template instance
    // const div = instance.$(instance.firstNode);
    $('#external-events .fc-event').each(function initEvents() {
        // store data so the calendar knows to render an event upon drop
        const element = $(this);
        element.data('event', {
            title: $.trim(element.text()),
            stick: true,
        });

        // make the event draggable using jQuery UI
        element.draggable({
            zIndex: 999,
            revert: true,
            revertDurtation: 0,
        });
    });
});

Template.calendars.helpers({
    options(key) {
        return {
            id: key.hash.id,
            header: {
                left: 'prev,next, today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay',
            },
            editable: true,
            droppable: true,
        };
    },
});


Template.calMeals.helpers({
    meals() {
        const userId = Meteor.userId();
        return Meals.find({ owner: userId });
    },
    hasMeals() {
        const userId = Meteor.userId();
        const meals = Meals.find({ owner: userId }).count();
        return meals > 0;
    },
});

Template.calList.helpers({
    hasCals() {
        const userId = Meteor.userId();
        const cals = Calendars.find({ owner: userId }).count();
        return cals > 0;
    },
    cals() {
        const userId = Meteor.userId();
        return Calendars.find({ owner: userId });
    },
});
