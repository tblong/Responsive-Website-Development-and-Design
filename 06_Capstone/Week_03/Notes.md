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

## Target audience
* Anyone needing to collaborate on a meal together

## Price, product, place, and promotion:
* Price: Free iOS/Android app + web interface. Paid $19.99/year subscription for collaborate features.
The paid version gives you access to predefined meals database, suggests meals based 
on patterns and level of difficulty, pantry list contents for meals, share meals 
and plan with others, geolocation based reminders
* Product: collaborative meal planning application
* Place: located in iOS and Android app stores along with web interface
* Promotion: social media, app stores, and web site

## Key resources needed for this project:
* open source [fullcalendar.io](http://fullcalendar.io/) project to implement drag/drop calendar features
* github account 
* iOS and Android platforms for testing
* development laptop

## High level project timeline
* week 3:
    * get base project created
    * get linting working
    * get main and navbar templates working
    * add all meteor base packages required for project
    * research how to import `fullcalendar.io` project
* week 4:
    * get `fullcalendar.io` displaying calendars correctly
    * get drag and drop working
    * add feature to let users create meals and calendars
    * figure out app folder structure
    * get `Meals` and `Calendars` collections working
    * start working out how the user shares a calendar with another user
    * testing app
* week 5:
    * have work in progress app ready for submission
    * more testing of app
    * continue working on feature set
* week 6:
    * create technical demo video
    * test and finalize app

## TODO for week 3
* get base project created
* get linting working
* get main and navbar templates working
* add all meteor base packages required for project
* research how to import `fullcalendar.io` project

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
