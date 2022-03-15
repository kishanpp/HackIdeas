// routes.js

// import components

import Login from './components/Login.vue';
import HomePage from './components/HomePage.vue';
import PageNotFound from './components/PageNotFound.vue';
import ChallengeForm from './components/ChallengeForm.vue';


const pageTitle = 'Hack Ideas | ';

const routes = [
	{
		name : 'root',
		path : '/',
		component : HomePage,
		isPublic: false,
		pageTitle: pageTitle,
		meta : {
			isPublic: false
		}
	},
	{
		name : 'login',
		path : '/login', 
		component : Login,
		isPublic: true,
		pageTitle: pageTitle + 'Login',
		meta : {
			isPublic: true
		}
	},
	{
		name : 'ChallengeForm',
		path : '/addChallenge', 
		component : ChallengeForm,
		isPublic: false,
		pageTitle: pageTitle + 'Add Challenge',
		meta : {
			isPublic: false
		}
	},
	{
		name: 'PageNotFound',
		path: '*', 
		component: PageNotFound,
		isPublic: false,
		pageTitle: pageTitle + 'Invalid location',
	},
];

export default routes;