export type Clues = {
    message?: string,
    file?: string,
    code?: string
};

export type TreasureHunt = {
    name: string,
    id: string,
};

export type TreasureHuntInstance = {
    id: string,
    treasureHunt: {
        name: string,
        id: string,
        clues: Clues[]
    }
} | undefined

export type Participant = {
    icon: string,
    teamName: string,
    id: string,
}
