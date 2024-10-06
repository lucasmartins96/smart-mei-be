import Route from '../interfaces/route';
import AuthRoute from './auth';
import TestRoute from './test';
import UserRoute from './user';

const routes: Route[] = [new TestRoute(), new AuthRoute(), new UserRoute()];

export default routes;
