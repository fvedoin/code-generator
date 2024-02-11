import apiService from '../services/api';

class SystemClockClient {
  private prefix: string = 'system-clock';

  async get(): Promise<string> {
    const { data } = await apiService.get(this.prefix);
    return data;
  }
}

export default new SystemClockClient();
