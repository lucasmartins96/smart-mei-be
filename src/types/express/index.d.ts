/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express from 'express';
import JwtUserPayload from '../../interfaces/jwt';

declare global {
	namespace Express {
		interface Request {
			user?: JwtUserPayload | null;
		}
	}
}
