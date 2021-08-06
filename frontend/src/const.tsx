export const baseApiUrl = '/api';

// Routes
export const HOME_PAGE_ROUTE = '/home';
export const LOGIN_PAGE_ROUTE = '/login';
export const REGISTER_PAGE_ROUTE = '/register';
export const TREASURE_HUNT_ROUTE = '/treasurehunt';
export const TREASURE_HUNT_CREATION_ROUTE = `${TREASURE_HUNT_ROUTE}/creation`;
export const TREASURE_HUNT_SELECTION_ROUTE = `${TREASURE_HUNT_ROUTE}/selection`;
export const TREASURE_HUNT_LAUNCH_ROUTE = `${TREASURE_HUNT_ROUTE}/launch`;
export const TREASURE_HUNT_SUPERVISION_ROUTE = `${TREASURE_HUNT_ROUTE}/supervision`;
export const TREASURE_HUNT_PLAY = `${TREASURE_HUNT_ROUTE}/play`;
export const TREASURE_HUNT_PLAY_ROUTE = `${TREASURE_HUNT_ROUTE}/play/:id`;
export const TREASURE_HUNT_JOIN_ROUTE = `${TREASURE_HUNT_ROUTE}/join/:id`;
export const TREASURE_HUNT_FINISH_ROUTE = `${TREASURE_HUNT_ROUTE}/finish`;

export const MESSAGE_PARTICIPANTS = 'participants';
export const LAUNCH = 'launch';
