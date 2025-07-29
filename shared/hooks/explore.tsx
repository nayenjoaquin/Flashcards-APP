import { useState } from "react";
import { APIgetDecks } from "shared/api/decks";
import { Deck } from "types";
import { useStoreWithEqualityFn } from "zustand/traditional";

export const useExplore = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [keepFetching, setKeepFetching] = useState<boolean>(true);

  const loadDecks = async () => {
    if(!keepFetching) return null;
    setLoading(true);

    const fetchedDecks = await APIgetDecks(page);
    if(fetchedDecks==null) return null;
    if(fetchedDecks?.length<0){
      setKeepFetching(false);
    }else{
      setPage(prev=>prev+1);
      setDecks(prev=>[...prev, ...fetchedDecks]);
    }
    setLoading(false);

    return fetchedDecks;
  }

  return {decks, loading, loadDecks};
};

