import Route from '../interfaces/route';
import AuthRoute from './auth';
import BusinessManRoute from './business-man';
import CompanyRoute from './company';
import TestRoute from './test';
import UserRoute from './user';

const routes: Route[] = [
	new TestRoute(),
	new AuthRoute(),
	new UserRoute(),
	new BusinessManRoute(),
	new CompanyRoute(),
];

export default routes;
