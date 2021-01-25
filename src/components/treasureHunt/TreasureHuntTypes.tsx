export type Clues = {
    message?: string,
    file?: File,
    code?: string
};

export type TreasureHunt = {
    name: string,
    id: string
};

export type TreasureHuntInstance = {
    id: string,
    treasureHunt: {
        name: string,
        id: string,
        clues: Clues[]
    }
} | undefined