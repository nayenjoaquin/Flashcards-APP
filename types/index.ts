export type Card = {
    id: string;
    front: string;
    back: string;
}

export type NewCard = Omit<Card, 'id'>

export type Deck={
    id: string;
    name: string;
    description: string;
    saved: number;
    visibility: string;
    owner: string;
    user_id: string;
    created_at: Date;
}

export type NewDeck = {
    name: string;
    description: string;
    visibility: string;
}

export type Progress = {
    n: number;
    i: number;
    ef: number;
    due_date: Date;
    reviewed_at: Date;
}
export type ProgressMap = Record<string, Progress>

export type Session = {
    deck_id: string;
    wrong: number;
    good: number;
    perfect: number;
    created_at: number;
    duration: number;
}


export type DeckProgress = {
    progress: ProgressMap
    lastReviewed?: Date;
}
export type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    password: string;
    token: string;
}