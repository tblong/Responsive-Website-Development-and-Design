import { Mongo } from 'meteor/mongo';

const Meals = new Mongo.Collection('meals');

// console.log("meals.js" + Meals);

export default Meals;
