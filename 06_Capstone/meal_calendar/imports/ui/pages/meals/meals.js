/* global AutoForm:true */
/* global Meteor:true */
import './meals.html';
import '../footer.js';


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
