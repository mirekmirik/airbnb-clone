import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;
        if (isFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success(`Success`);
      } catch (err) {
        toast.error(`Something went wrong`);
      }
    },
    [currentUser, isFavorite, listingId, loginModal, router]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
