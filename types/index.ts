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
    created_at: Date;
}

export type NewDeck = {
    name: string;
    description: string;
    visibility: string;
}

export type ProgressItem = {
    n: number;
    i: number;
    ef: number;
    due_date: Date;
    reviewed_at: Date;
}
export type Progress = Record<string, ProgressItem>

export type Session = {
    deckId: string;
    wrong: number;
    good: number;
    perfect: number;
    reviewedOn: number;
}

export type DeckProgress = {
    progress: Progress
    lastReviewed?: Date;
}
export type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    password: string;
}