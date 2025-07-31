import { useState } from "react";
import { APIgetDecks, APIsearchDecks } from "shared/api/decks";
import { AuthStore } from "shared/stores/auth";
import { getLocal } from "shared/utils/common";
import { Deck } from "types";
import { useStoreWithEqualityFn } from "zustand/traditional";

export const useExplore = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [keepFetching, setKeepFetching] = useState<boolean>(true);
  const {user} = AuthStore();

  const loadDecks = async (): Promise<Deck[]|null> => {
    if(!keepFetching) return null;
    setLoading(true);

    const fetchedDecks = await APIgetDecks(page, user?.token??await getLocal('JWT'));
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

  const searchDecks = async (text: string): Promise<Deck[]|null> => {
    setLoading(true);
    const searchedDecks = await APIsearchDecks(text, user?.token ?? await getLocal('JWT'))
    setLoading(false);
    if(!searchedDecks){
      setDecks([]);
      return null;
    };
    setDecks(searchedDecks);
    return searchedDecks;
  }

  return {decks, loading, loadDecks, searchDecks};
};

