import apiService from '../services/api';
import { StringMatrix } from '../types/random-code';

class RandomCodeClient {
  private prefix: string = 'random-code';

  async get(weightChar?: string): Promise<StringMatrix> {
    const { data } = await apiService.get(this.prefix, {
      params: { weightChar },
    });
    return data;
  }
}

export default new RandomCodeClient();
