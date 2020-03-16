import { AbstractService } from './abstract-service';

class AuthService extends AbstractService {
  constructor() {
      super('/login');
  }

  login = (username, password) => {
    return this.post('/authenticate', {username, password});
  }
}

export default new AuthService();