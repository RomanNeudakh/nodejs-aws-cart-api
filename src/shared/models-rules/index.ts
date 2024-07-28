import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  console.log(request)
  return 'd2f6ac5b-c433-4a9f-8d6f-52ccd9fceef1';
}
