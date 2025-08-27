import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        direct: "Live",
        podcasts: "Podcasts",
        login: "Login",
        register: "Register",
        admin: "Admin",
        logout: "Logout"
      },
      player: {
        play: "Play",
        pause: "Pause",
        live: "LIVE",
        nowPlaying: "Now Playing",
        volume: "Volume",
        muted: "Muted"
      },
      auth: {
        login: "Login",
        register: "Register",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        name: "Name",
        loginSuccess: "Login successful!",
        registerSuccess: "Registration successful!",
        loginError: "Login failed",
        registerError: "Registration failed"
      },
      home: {
        title: "Welcome to AfroBiteFM",
        subtitle: "Listen to your favorite shows and podcasts",
        featuredShows: "Featured Shows",
        latestEpisodes: "Latest Episodes"
      },
      shows: {
        title: "Shows",
        episodes: "Episodes",
        description: "Description",
        schedule: "Schedule"
      },
      admin: {
        title: "Administration",
        shows: "Manage Shows",
        episodes: "Manage Episodes",
        schedule: "Manage Schedule",
        users: "Manage Users"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        direct: "Direct",
        podcasts: "Podcasts",
        login: "Connexion",
        register: "S'inscrire",
        admin: "Admin",
        logout: "Déconnexion"
      },
      player: {
        play: "Lecture",
        pause: "Pause",
        live: "DIRECT",
        nowPlaying: "En cours",
        volume: "Volume",
        muted: "Muet"
      },
      auth: {
        login: "Connexion",
        register: "S'inscrire",
        email: "Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        name: "Nom",
        loginSuccess: "Connexion réussie !",
        registerSuccess: "Inscription réussie !",
        loginError: "Échec de la connexion",
        registerError: "Échec de l'inscription"
      },
      home: {
        title: "Bienvenue sur la Plateforme Radio",
        subtitle: "Écoutez vos émissions et podcasts préférés",
        featuredShows: "Émissions en vedette",
        latestEpisodes: "Derniers épisodes"
      },
      shows: {
        title: "Émissions",
        episodes: "Épisodes",
        description: "Description",
        schedule: "Programme"
      },
      admin: {
        title: "Administration",
        shows: "Gérer les émissions",
        episodes: "Gérer les épisodes",
        schedule: "Gérer le programme",
        users: "Gérer les utilisateurs"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        direct: "En Vivo",
        podcasts: "Podcasts",
        login: "Iniciar Sesión",
        register: "Registrarse",
        admin: "Admin",
        logout: "Cerrar Sesión"
      },
      player: {
        play: "Reproducir",
        pause: "Pausar",
        live: "EN VIVO",
        nowPlaying: "Reproduciendo",
        volume: "Volumen",
        muted: "Silenciado"
      },
      auth: {
        login: "Iniciar Sesión",
        register: "Registrarse",
        email: "Correo",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        name: "Nombre",
        loginSuccess: "¡Inicio de sesión exitoso!",
        registerSuccess: "¡Registro exitoso!",
        loginError: "Error al iniciar sesión",
        registerError: "Error al registrarse"
      },
      home: {
        title: "Bienvenido a la Plataforma de Radio",
        subtitle: "Escucha tus programas y podcasts favoritos",
        featuredShows: "Programas Destacados",
        latestEpisodes: "Últimos Episodios"
      },
      shows: {
        title: "Programas",
        episodes: "Episodios",
        description: "Descripción",
        schedule: "Horario"
      },
      admin: {
        title: "Administración",
        shows: "Gestionar Programas",
        episodes: "Gestionar Episodios",
        schedule: "Gestionar Horario",
        users: "Gestionar Usuarios"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;