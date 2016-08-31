/* global Meals:true */
/* global Calendars:true */
/* global SimpleSchema:true */

import { Mongo } from 'meteor/mongo';

Meals = new Mongo.Collection('meals');
Calendars = new Mongo.Collection('calendars');


// calendar schema
Calendars.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max: 20,
        label: 'Calendar Name',
    },
    description: {
        type: String,
        label: 'Calendar Description',
        max: 1000,
        autoform: {
            rows: 4,
        },
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            omit: true,
        },
    },
}));

// meals schema
Meals.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max: 20,
        label: 'Meal Name',
    },
    description: {
        type: String,
        label: 'Meal Description',
        max: 1000,
        autoform: {
            rows: 4,
        },
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            omit: true,
        },
    },
}));
