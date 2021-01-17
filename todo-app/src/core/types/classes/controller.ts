import { AppRoute } from '../interfaces/route';

export abstract class AppController {
  abstract path: string | null;
  abstract routes: AppRoute[];
}
