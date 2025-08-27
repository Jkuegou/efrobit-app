// src/data/programsData.js - Données des programmes radio

export const radioPrograms = [
  {
    _id: '1',
    id: 'good-morning-vibes',
    slug: 'good-morning-vibes',
    title: 'Good Morning Vibes',
    description: 'Commencez votre journée avec les meilleurs vibes ! Musique, actualités et bonne humeur pour bien démarrer.',
    image: '/images/programs/good-morning-vibes.png', // Remplacez par vos vraies images
    category: 'Matinal',
    host: 'L\'équipe matinale',
    schedule: {
      days: 'Tous les jours',
      time: '6h-10h',
      dayOfWeek: [1, 2, 3, 4, 5, 6, 0], // Lundi=1, Dimanche=0
      startTime: '06:00',
      endTime: '10:00'
    },
    duration: 240, // 4 heures en minutes
    isActive: true
  },
  {
    _id: '2',
    id: 'selflist',
    slug: 'selflist',
    title: 'Selflist',
    description: 'Votre playlist personnalisée ! Écoutez vos titres préférés sélectionnés par vous.',
    image: '/images/programs/selflist.png',
    category: 'Interactif',
    host: 'DJ Selflist',
    schedule: {
      days: 'Samedi/Dimanche',
      time: '17h-18h',
      dayOfWeek: [6, 0], // Samedi et Dimanche
      startTime: '17:00',
      endTime: '18:00'
    },
    duration: 60,
    isActive: true
  },
  {
    _id: '3',
    id: 'hit-30',
    slug: 'hit-30',
    title: 'Hit 30',
    description: 'Le Top 30 des hits du moment ! Découvrez les tubes qui font vibrer les ondes.',
    image: '/images/programs/hit-30.png',
    category: 'Charts',
    host: 'Hit Master',
    schedule: {
      days: 'Samedi/Dimanche',
      time: '18h-20h',
      dayOfWeek: [6, 0],
      startTime: '18:00',
      endTime: '20:00'
    },
    duration: 120,
    isActive: true
  },
  {
    _id: '4',
    id: 'roi-afrobeat',
    slug: 'les-roi-de-lafrobeat',
    title: 'Les Roi de l\'Afrobeat',
    description: 'Plongez dans l\'univers riche de l\'Afrobeat avec les plus grands classiques et nouveautés du genre.',
    image: '/images/programs/roi-afrobeat.png',
    category: 'Afrobeat',
    host: 'King Afrobeat',
    schedule: {
      days: 'Lundi à Vendredi',
      time: '19h-20h',
      dayOfWeek: [1, 2, 3, 4, 5],
      startTime: '19:00',
      endTime: '20:00'
    },
    duration: 60,
    isActive: true
  },
  {
    _id: '5',
    id: 'roots-funky',
    slug: 'roots-funky',
    title: 'Roots Funky',
    description: 'Retour aux sources avec le meilleur du funk et de la soul. Grooves garantis !',
    image: '/images/programs/roots-funky.png',
    category: 'Funk/Soul',
    host: 'Funky Master',
    schedule: {
      days: 'Dimanche',
      time: '20h-22h',
      dayOfWeek: [0],
      startTime: '20:00',
      endTime: '22:00'
    },
    duration: 120,
    isActive: true
  },
  {
    _id: '6',
    id: 'roots-classics',
    slug: 'roots-classics',
    title: 'Roots Classics',
    description: 'Les grands classiques qui ont marqué l\'histoire de la musique. Voyage dans le temps musical.',
    image: '/images/programs/roots-classics.png',
    category: 'Classiques',
    host: 'Classic DJ',
    schedule: {
      days: 'Dimanche',
      time: '10h-12h',
      dayOfWeek: [0],
      startTime: '10:00',
      endTime: '12:00'
    },
    duration: 120,
    isActive: true
  },
  {
    _id: '7',
    id: 'top-20-africa',
    slug: 'top-20-africa',
    title: 'TOP 20 AFRICA',
    description: 'Le classement des 20 plus gros hits africains du moment. La musique qui fait danser l\'Afrique !',
    image: '/images/programs/top-20-africa.jpg',
    category: 'Musique Africaine',
    host: 'Africa Sound',
    schedule: {
      days: 'Samedi/Dimanche',
      time: '12h-13h',
      dayOfWeek: [6, 0],
      startTime: '12:00',
      endTime: '13:00'
    },
    duration: 60,
    isActive: true
  },
  {
    _id: '8',
    id: 'mix-party-eric',
    slug: 'mix-party-by-eric-5etoiles',
    title: 'MIX PARTY BY ERIC 5ETOILES',
    description: 'Soirée mix party avec Eric 5étoiles ! Les meilleurs sons pour faire la fête jusqu\'au bout de la nuit.',
    image: '/images/programs/mix-party-eric.jpg',
    category: 'Mix/Party',
    host: 'Eric 5Etoiles',
    schedule: {
      days: 'Tous les Samedi',
      time: '20h-22h',
      dayOfWeek: [6],
      startTime: '20:00',
      endTime: '22:00'
    },
    duration: 120,
    isActive: true
  }
];

// Fonction utilitaire pour obtenir le programme actuel
export const getCurrentProgram = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0=Dimanche, 1=Lundi, etc.
  const currentTime = now.toTimeString().slice(0, 5); // Format HH:MM
  
  return radioPrograms.find(program => {
    if (!program.isActive) return false;
    
    const { dayOfWeek, startTime, endTime } = program.schedule;
    
    // Vérifier si c'est le bon jour
    if (!dayOfWeek.includes(currentDay)) return false;
    
    // Vérifier si c'est la bonne heure
    return currentTime >= startTime && currentTime < endTime;
  });
};

// Fonction pour obtenir le prochain programme
export const getNextProgram = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toTimeString().slice(0, 5);
  
  // Trier les programmes par jour et heure
  const sortedPrograms = [...radioPrograms]
    .filter(p => p.isActive)
    .sort((a, b) => {
      // Comparer par jour puis par heure
      const aDayNext = a.schedule.dayOfWeek.find(day => 
        day > currentDay || (day === currentDay && a.schedule.startTime > currentTime)
      ) || a.schedule.dayOfWeek[0] + 7; // Semaine suivante
      
      const bDayNext = b.schedule.dayOfWeek.find(day => 
        day > currentDay || (day === currentDay && b.schedule.startTime > currentTime)
      ) || b.schedule.dayOfWeek[0] + 7;
      
      if (aDayNext !== bDayNext) return aDayNext - bDayNext;
      return a.schedule.startTime.localeCompare(b.schedule.startTime);
    });
  
  return sortedPrograms[0];
};

// Fonction pour obtenir les programmes d'une journée
export const getProgramsByDay = (dayOfWeek) => {
  return radioPrograms
    .filter(program => 
      program.isActive && 
      program.schedule.dayOfWeek.includes(dayOfWeek)
    )
    .sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));
};

// Fonction pour formater les jours de diffusion
export const formatScheduleDays = (dayOfWeek) => {
  const dayNames = {
    0: 'Dimanche',
    1: 'Lundi', 
    2: 'Mardi',
    3: 'Mercredi',
    4: 'Jeudi',
    5: 'Vendredi',
    6: 'Samedi'
  };
  
  if (dayOfWeek.length === 7) return 'Tous les jours';
  if (dayOfWeek.length === 2 && dayOfWeek.includes(6) && dayOfWeek.includes(0)) {
    return 'Weekend';
  }
  if (dayOfWeek.length === 5 && !dayOfWeek.includes(6) && !dayOfWeek.includes(0)) {
    return 'En semaine';
  }
  
  return dayOfWeek.map(day => dayNames[day]).join(', ');
};

export default radioPrograms;