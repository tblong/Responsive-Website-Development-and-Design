/* global AutoForm:true */
/* global Meteor:true */
/* global Meals:true */

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
Template.meal_list.helpers({
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
