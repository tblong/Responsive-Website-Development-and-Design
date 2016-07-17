# Week 3 Notes

* Thoughts on meteor collections to create for use in the project:
    * Meals: where each meal doc has a `owner` id which is the user id
    from the `Meteor.users` collection.  This collection also needs a `sharedWith`
    object where keys are user IDs and values are either `read-only` or `edit`
    * Calendars: the collection of calendars where each doc has a `owner` id which is the
    user id from the `Meteor.users` collection.  This collection also needs a `sharedWith`
    object where keys are user IDs and values are either `read-only` or `edit`
        * metadata for each calendar: 
            * date created
            * owner
            * shared with
* use `kadira:flow-router` for routing
* use `zimme:active-route` for figuring out the active route or path
* separate the calendars `owned by me` and `share with me` in the UI
* create blaze templates for:
    * calendars
    * meals


## Design Specification assignment

### Part 1: Brief descriptions of one key process that will be implemented in your application

A key process in the MealCalendar application will be the user's ability to drag and drop
a user defined meal onto a calendar.  The user will be presented with a list of meals which
will be draggable onto a calendar. The user will click, drag, and then release a meal onto 
the calendar.  The meal will then be shown on the calendar.  The meal on the calendar can then
be moved to other parts of the calendar. 

### Part 2: An image showing the steps a user goes through in this key process
See meal to calendar process image.

### Part 3: Wireframe mock ups of the layout for one key page in your application
See meal to calendar wireframe image.
