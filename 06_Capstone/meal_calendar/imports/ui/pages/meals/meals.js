/* global AutoForm:true */
/* global Meteor:true */
/* global Meals:true */
/* global $:true */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */

import './meals.html';
import '../footer.js';
import { Template } from 'meteor/templating';


// autoform hooks
AutoForm.hooks({
    mealForm: {
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

// meal_list helpers
Template.mealList.helpers({
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

Template.mealItem.events({
    'click .js-delete-meal'() {
        const instance = Template.instance();
        const row = $(instance.firstNode);
        const mealId = this.meal._id; // eslint-disable-line no-underscore-dangle

        row.fadeOut(400, function animationComplete() {
            Meals.remove({ _id: mealId });
        });

        return false;
    },
});
