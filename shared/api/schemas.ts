import { Card, Deck, Progress } from "types";

export const json2Progress = (json: any): Progress => {
  return {
    ef: json.ef,
    i: json.i,
    n: json.n,
    due_date: json.due_date ? new Date(json.due_date) : new Date(),
    reviewed_at: json.reviewed_at ? new Date(json.reviewed_at) : new Date(),
  };
}

export const json2Card = (json: any): Card => {
  return{
    id: json.id,
    front: json.front,
    back: json.back,
  }
}

export const json2ProgressMap = (json: any): Record<string, Progress> => {
  const progressMap: Record<string, Progress> = {};
  for (const key in json) {
    progressMap[key] = json2Progress(json[key]);
  }
  return progressMap;
}

export const json2Deck = (json: any): Deck => {
  return {
    id: json.id,
    name: json.name,
    description: json.description,
    saved: json.saved || 0,
    cards: json.cards?.map((card: any) => json2Card(card)),
    owner: json.owner,
    user_id: json.user_id,
    visibility: json.visibility || 'public',
    progress: json.progress ? json2ProgressMap(json.progress) : null,
    created_at: new Date(json.created_at),
    last_reviewed_at: json.last_reviewed_at ? new Date(json.last_reviewed_at) : null,
  };
}