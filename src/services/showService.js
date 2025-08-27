// import api from './api';

// export const showService = {
//   async getAllShows() {
//     const response = await api.get('/api/shows');
//     return response.data;
//   },

//   async getShowBySlug(slug) {
//     const response = await api.get(`/api/shows/${slug}`);
//     return response.data;
//   },

//   async createShow(showData) {
//     const response = await api.post('/api/shows', showData);
//     return response.data;
//   },

//   async updateShow(slug, showData) {
//     const response = await api.put(`/api/shows/${slug}`, showData);
//     return response.data;
//   },

//   async deleteShow(slug) {
//     const response = await api.delete(`/api/shows/${slug}`);
//     return response.data;
//   },

//   async getShowEpisodes(slug) {
//     const response = await api.get(`/api/shows/${slug}/episodes`);
//     return response.data;
//   }
// };

import api from './api';
import { radioPrograms, getCurrentProgram, getNextProgram, getProgramsByDay } from '../data/programsData';

// Service original qui essaie d'abord l'API, puis utilise les données locales
export const showService = {
  async getAllShows() {
    try {
      const response = await api.get('/api/shows');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données locales:', error.message);
      // Retourner les programmes radio locaux
      return radioPrograms;
    }
  },

  async getShowBySlug(slug) {
    try {
      const response = await api.get(`/api/shows/${slug}`);
      return response.data;
    } catch (error) {
      console.warn('API non disponible, recherche dans les données locales');
      const show = radioPrograms.find(program => program.slug === slug);
      if (!show) {
        throw new Error(`Programme non trouvé: ${slug}`);
      }
      return show;
    }
  },

  async createShow(showData) {
    try {
      const response = await api.post('/api/shows', showData);
      return response.data;
    } catch (error) {
      console.error('Impossible de créer l\'émission sans API backend');
      throw error;
    }
  },

  async updateShow(slug, showData) {
    try {
      const response = await api.put(`/api/shows/${slug}`, showData);
      return response.data;
    } catch (error) {
      console.error('Impossible de mettre à jour l\'émission sans API backend');
      throw error;
    }
  },

  async deleteShow(slug) {
    try {
      const response = await api.delete(`/api/shows/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Impossible de supprimer l\'émission sans API backend');
      throw error;
    }
  },

  async getShowEpisodes(slug) {
    try {
      const response = await api.get(`/api/shows/${slug}/episodes`);
      return response.data;
    } catch (error) {
      console.warn('API non disponible pour les épisodes');
      // Retourner des épisodes factices pour le programme
      const show = radioPrograms.find(p => p.slug === slug);
      if (show) {
        return this.generateMockEpisodes(show);
      }
      return [];
    }
  },

  // Nouvelles méthodes spécifiques aux programmes radio
  getCurrentProgram() {
    return getCurrentProgram();
  },

  getNextProgram() {
    return getNextProgram();
  },

  getProgramsByDay(dayOfWeek = new Date().getDay()) {
    return getProgramsByDay(dayOfWeek);
  },

  getTodaySchedule() {
    return this.getProgramsByDay(new Date().getDay());
  },

  getWeekSchedule() {
    const schedule = {};
    for (let day = 0; day < 7; day++) {
      schedule[day] = this.getProgramsByDay(day);
    }
    return schedule;
  },

  // Générer des épisodes factices pour un programme
  generateMockEpisodes(program) {
    const episodes = [];
    const today = new Date();
    
    // Générer 10 épisodes récents
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Vérifier si le programme diffuse ce jour-là
      if (program.schedule.dayOfWeek.includes(date.getDay())) {
        episodes.push({
          _id: `${program.id}-episode-${i}`,
          id: `${program.id}-episode-${i}`,
          title: `${program.title} - ${date.toLocaleDateString('fr-FR')}`,
          description: `Émission du ${date.toLocaleDateString('fr-FR')} - ${program.description}`,
          audioUrl: process.env.REACT_APP_LIVE_URL || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          image: program.image,
          duration: program.duration * 60, // Convertir minutes en secondes
          publishedAt: date.toISOString(),
          show: {
            _id: program._id,
            title: program.title,
            slug: program.slug
          },
          isLive: false
        });
      }
    }
    
    return episodes.reverse(); // Plus récent en premier
  }
};