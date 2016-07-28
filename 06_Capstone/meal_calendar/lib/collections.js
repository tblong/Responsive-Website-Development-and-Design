/* global Meals:true */
/* global Calendars:true */

import { Mongo } from 'meteor/mongo';

Meals = new Mongo.Collection('meals');
Calendars = new Mongo.Collection('calendars');
