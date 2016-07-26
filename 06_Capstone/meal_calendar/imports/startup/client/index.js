import './routes.js';
import '../../api/calendars/calendars.js';
import { Mongo } from 'meteor/mongo';
import Meals from '../../api/meals/meals.js';

console.log('client ' + Meals.find({}));
console.log(Meals.findOne({}));

