import '../../api/calendars/calendars.js';
import Meals from '../../api/meals/meals.js';

console.log('server starup code ran');
console.log('server ' + Meals);
console.log(Meals.findOne({}));