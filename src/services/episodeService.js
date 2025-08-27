import api from './api';

export const episodeService = {
  async getAllEpisodes() {
    const response = await api.get('/api/episodes');
    return response.data;
  },

  async getEpisodeById(id) {
    const response = await api.get(`/api/episodes/${id}`);
    return response.data;
  },

  async createEpisode(episodeData) {
    const response = await api.post('/api/episodes', episodeData);
    return response.data;
  },

  async updateEpisode(id, episodeData) {
    const response = await api.put(`/api/episodes/${id}`, episodeData);
    return response.data;
  },

  async deleteEpisode(id) {
    const response = await api.delete(`/api/episodes/${id}`);
    return response.data;
  },

  async getLatestEpisodes(limit = 10) {
    const response = await api.get(`/api/episodes?limit=${limit}&sort=-publishedAt`);
    return response.data;
  },

  async getNowPlaying() {
    const response = await api.get('/api/now');
    return response.data;
  },

  async getSchedule() {
    const response = await api.get('/api/schedule');
    return response.data;
  }
};