// ─────────────────────────────────────────────────────────────────────────────
//  FILMS: the films on the "My Films" page (Off duty → Films).
//  Add a film by copying one line block. `group` decides its filter and cover colours.
//  `mature` adds a small note for intense violence, strong language or adult scenes.
//  `pick: true` pins one film at the top as "My top pick" (only one should have it).
//  `poster` is the official TMDB poster file name (themoviedb.org); leave it out to show a designed cover.
// ─────────────────────────────────────────────────────────────────────────────

export type FilmGroup = 'mind' | 'classic' | 'build' | 'sky' | 'faith' | 'thriller' | 'heart';
export type Film = {
  title: string; year: number; group: FilmGroup; genre: string; lang?: string;
  about: string; mature?: string; pick?: boolean; poster?: string;
};

export const groups: Record<FilmGroup, { name: string; bg: string; ink: string; accent: string }> = {
  mind:     { name: 'Mind-bending',          bg: '#1B1E3D', ink: '#EDE9FF', accent: '#A99BFF' },
  classic:  { name: 'All-time classics',     bg: '#3A1518', ink: '#F6EBDD', accent: '#E3B36A' },
  build:    { name: 'Builders & money',      bg: '#0F2A22', ink: '#E8F5EE', accent: '#7FD1A8' },
  sky:      { name: 'Sky & space',           bg: '#0D2238', ink: '#E6F1FB', accent: '#8EC5F2' },
  faith:    { name: 'Faith & history',       bg: '#0E3B2E', ink: '#F4EBD3', accent: '#E3C373' },
  thriller: { name: 'Thrillers',             bg: '#151515', ink: '#F2F2F2', accent: '#E0563E' },
  heart:    { name: 'Feel-good & heart',     bg: '#3B2412', ink: '#FFF1DE', accent: '#F5A623' },
};

export const films: Film[] = [
  { title: 'Inception', poster: 'xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg', year: 2010, group: 'mind', genre: 'Sci-fi · Heist',
    about: 'A thief who steals secrets from people’s dreams is offered one last job: planting an idea instead. A puzzle built in layers, and every layer runs on its own clock.' },
  { title: 'Interstellar', poster: 'yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg', year: 2014, group: 'mind', genre: 'Sci-fi · Drama',
    about: 'With Earth dying, a former pilot leaves his children to search for a new home through a wormhole. Big science, but at its heart a story about a father and a daughter.' },
  { title: 'The Prestige', poster: 'Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg', year: 2006, group: 'mind', genre: 'Mystery · Drama',
    about: 'Two rival magicians in Victorian London try to outdo each other, and the obsession costs them everything. Watch closely: the film is a magic trick too.' },
  { title: 'Arrival', poster: 'pEzNVQfdzYDzVK0XqxERIw2x2se.jpg', year: 2016, group: 'mind', genre: 'Sci-fi · Drama',
    about: 'When alien ships land around the world, a linguist is asked to find out what they want. A quiet, thoughtful film about language, time and choice.' },

  { title: 'The Shawshank Redemption', poster: '9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg', year: 1994, group: 'classic', genre: 'Drama',
    about: 'A banker sentenced to life in prison holds on to hope and an unlikely friendship over two decades. Patient, warm and deeply satisfying.' },
  { title: 'The Godfather', poster: '3bhkrj58Vtu7enYsRolD1fZdja1.jpg', year: 1972, group: 'classic', genre: 'Crime · Drama',
    about: 'The ageing head of a crime family and the son who never wanted the business. A study of power, loyalty and how people change.',
    mature: 'Violence' },
  { title: '12 Angry Men', poster: 'zhG3vKWyDRaZYoaww1UVAi29T9h.jpg', year: 1957, group: 'classic', genre: 'Drama',
    about: 'Twelve jurors, one room, one murder trial. One man has a reasonable doubt, and he has to convince the other eleven.' },
  { title: 'Forrest Gump', poster: 'saHP97rTPS5eLmrLQEcANmKrsFl.jpg', year: 1994, group: 'classic', genre: 'Drama · Comedy',
    about: 'A kind, simple man wanders through decades of American history, always doing the right thing. Funny, moving and full of heart.' },
  { title: 'The Green Mile', poster: '8VG8fDNiy50H4FedGwdSVUPoaJe.jpg', year: 1999, group: 'classic', genre: 'Drama · Fantasy',
    about: 'A prison guard on death row meets a gentle giant with a gift he cannot explain. A long, emotional story about justice and mercy.' },
  { title: 'Gladiator', poster: 'aDb548BOkFfI4nFm0kx8A3Ezh7H.jpg', year: 2000, group: 'classic', genre: 'Historical · Action',
    about: 'A Roman general is betrayed, enslaved and forced to fight in the arena, where he finds his way back to Rome. Epic in every sense.',
    mature: 'Battle violence' },

  { title: 'The Social Network', poster: 'n0ybibhJtQ5icDqTp8eRytcIHJx.jpg', year: 2010, group: 'build', genre: 'Drama · Biography',
    about: 'How a university project became Facebook, and the friendships and lawsuits left behind. Sharp, fast dialogue about ambition.' },
  { title: 'The Pursuit of Happyness', poster: 'lBYOKAMcxIvuk9s9hMuecB9dPBV.jpg', year: 2006, group: 'build', genre: 'Drama · Biography',
    about: 'A struggling father, homeless with his young son, competes for an unpaid internship at a stockbroking firm. Based on a true story of persistence.' },
  { title: 'Moneyball', poster: '4yIQq1e6iOcaZ5rLDG3lZBP3j7a.jpg', year: 2011, group: 'build', genre: 'Drama · Sport',
    about: 'A baseball manager with no money uses data and statistics to compete with the richest teams. A smart film about thinking differently.' },
  { title: 'The Big Short', poster: 'scVEaJEwP8zUix8vgmMoJJ9Nq0w.jpg', year: 2015, group: 'build', genre: 'Drama · Finance',
    about: 'A handful of outsiders see the 2008 financial crash coming and bet against the banks. Explains complex finance in a clear, entertaining way.',
    mature: 'Strong language' },
  { title: 'Steve Jobs', poster: 'ljiRO29Y9khEERRqMluptUYunJ9.jpg', year: 2015, group: 'build', genre: 'Drama · Biography',
    about: 'Three product launches, three backstage conversations, and the difficult genius at the centre of them. Fast, theatrical and full of tension.' },

  { title: 'Sully', poster: '4vs83YcJ8TsabADDtaeCJ6ZTjYY.jpg', year: 2016, group: 'sky', genre: 'Drama · Aviation',
    about: 'A captain lands a stricken airliner on the Hudson River and saves everyone on board, then faces an investigation into his decision.' },
  { title: 'Apollo 13', poster: 'tVeKscCm2fY1xDXZk8PgnZ87h9S.jpg', year: 1995, group: 'sky', genre: 'Drama · Space',
    about: 'An explosion turns a Moon mission into a fight to get three astronauts home alive. A classic about calm teamwork under pressure.' },
  { title: 'Top Gun: Maverick', poster: 'n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg', year: 2022, group: 'sky', genre: 'Action · Aviation',
    about: 'Decades later, a legendary navy pilot returns to train young aviators for a near-impossible mission. Real flying, stunning cockpit footage.' },
  { title: 'The Martian', poster: '5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg', year: 2015, group: 'sky', genre: 'Sci-fi · Survival',
    about: 'An astronaut left behind on Mars has to survive with science, humour and whatever he can build. Solving one problem at a time.' },
  { title: 'Hidden Figures', poster: '9lfz2W2uGjyow3am00rsPJ8iOyq.jpg', year: 2016, group: 'sky', genre: 'Drama · History',
    about: 'Three Black women mathematicians at NASA help launch America into space while fighting the barriers in their own workplace. Based on a true story.' },

  { title: 'The Message', poster: 'qVCBMg4ZuLPnWhIWJHD9IP4nIuY.jpg', year: 1976, group: 'faith', genre: 'Historical · Epic',
    about: 'The story of the early days of Islam in Mecca and Medina, told through the people around the Prophet ﷺ, who is respectfully never shown on screen.' },
  { title: 'Lion of the Desert', poster: 'xm7CKN5mo09RNAcL1IP1xmJ5avT.jpg', year: 1981, group: 'faith', genre: 'Historical · War',
    about: 'Omar Mukhtar, a teacher of the Qur’an, leads Libya’s resistance against Italian occupation for twenty years. A powerful true story of dignity.',
    mature: 'War violence' },
  { title: 'Hacksaw Ridge', poster: 'fnOMP6mjmOmZwmlC1n0K7ivrzt1.jpg', year: 2016, group: 'faith', genre: 'War · Biography',
    about: 'A combat medic refuses to carry a weapon because of his faith, then saves dozens of men on one of the war’s bloodiest battlefields. A true story.',
    mature: 'Intense war violence' },
  { title: 'The Imitation Game', poster: 'zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg', year: 2014, group: 'faith', genre: 'Drama · History',
    about: 'Mathematician Alan Turing races to break Nazi Germany’s Enigma code, building a machine that helped shape modern computing.' },

  { title: 'The Dark Knight', poster: 'qJ2tW6WMUDux911r6m7haRef0WH.jpg', year: 2008, group: 'thriller', genre: 'Crime · Action',
    about: 'Batman faces the Joker, a criminal who wants to prove that anyone can be pushed into chaos. More crime drama than superhero film.',
    mature: 'Intense violence' },
  { title: 'Prisoners', poster: 'uhviyknTT5cEQXbn6vWIqfM4vGm.jpg', year: 2013, group: 'thriller', genre: 'Crime · Mystery',
    about: 'When two young girls go missing, one father takes matters into his own hands while a detective follows the clues. Dark and gripping.',
    mature: 'Intense, disturbing scenes' },
  { title: 'Parasite', poster: '7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', year: 2019, group: 'thriller', genre: 'Thriller · Drama', lang: 'Korean',
    about: 'A poor family gradually finds work inside a wealthy household, one member at a time. Funny, then tense, then shocking.',
    mature: 'Violence' },
  { title: 'Oppenheimer', poster: '8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', year: 2023, group: 'thriller', genre: 'Drama · History',
    about: 'The physicist who led the creation of the atomic bomb, and the weight of what he built. Long, intense and brilliantly made.',
    mature: 'Adult scenes' },

  { title: '3 Idiots', poster: '66A9MqXOyVFCssoloscw79z8Tew.jpg', year: 2009, group: 'heart', genre: 'Comedy · Drama', lang: 'Hindi',
    about: 'Two friends search for a former classmate who taught them to learn for passion rather than marks. Hilarious and full of heart.' },
  { title: 'The Intouchables', poster: '1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg', year: 2011, group: 'heart', genre: 'Comedy · Drama', lang: 'French',
    about: 'A wealthy man paralysed in an accident hires a carer from the suburbs, and they become unlikely friends. Based on a true story.' },
  { title: 'Good Will Hunting', poster: 'z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg', year: 1997, group: 'heart', genre: 'Drama',
    about: 'A brilliant young janitor at a top university hides his genius, until a therapist finally gets through to him.' },
  { title: 'Children of Heaven', poster: 'jWqh1CJWAEcxckMRrf6ARhIEh0R.jpg', year: 1997, group: 'heart', genre: 'Family · Drama', lang: 'Persian',
    about: 'A boy loses his little sister’s only shoes, and the two secretly share one pair to get to school. Simple, gentle and unforgettable.' },
  { title: 'Coco', poster: '6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg', year: 2017, group: 'heart', genre: 'Animation · Family',
    about: 'A boy who dreams of music finds himself in the Land of the Dead, searching for his family’s story. Colourful and moving.' },
  { title: 'Spirited Away', poster: '39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', year: 2001, group: 'heart', genre: 'Animation · Fantasy', lang: 'Japanese',
    about: 'A young girl is trapped in a world of spirits and must work in a bathhouse to save her parents. A hand-drawn masterpiece.' },
  { title: 'Up', poster: 'mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg', year: 2009, group: 'heart', genre: 'Animation · Adventure',
    about: 'An old man ties thousands of balloons to his house and flies off to keep a promise. The first ten minutes alone are worth it.' },
];
