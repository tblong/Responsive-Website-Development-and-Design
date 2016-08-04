/* global Meals:true */
/* global Calendars:true */
/* global SimpleSchema:true */

import { Mongo } from 'meteor/mongo';

Meals = new Mongo.Collection('meals');
Calendars = new Mongo.Collection('calendars');


// schemas

Meals.attachSchema(new SimpleSchema({
    name: {
        type: String,
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
}));
