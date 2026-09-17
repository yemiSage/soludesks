import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Collections } from '../lib/types';

const empty: Collections = { wishlist: [], cart: [], cartTotalNgn: 0 };

export const useCollections = () => {
  const queryClient = useQueryClient();
  const { data = empty } = useQuery({ queryKey: ['collections'], queryFn: api.collections });

  const toggleIn = (key: 'wishlist' | 'cart') => (courseId: string) => {
    queryClient.setQueryData<Collections>(['collections'], (current = empty) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(courseId) ? list.filter((id) => id !== courseId) : [...list, courseId],
      };
    });
  };

  const wishlist = useMutation({
    mutationFn: api.toggleWishlist,
    onMutate: (courseId: string) => toggleIn('wishlist')(courseId),
    onSuccess: (next) => queryClient.setQueryData(['collections'], next),
    onError: () => queryClient.invalidateQueries({ queryKey: ['collections'] }),
  });

  const cart = useMutation({
    mutationFn: api.toggleCart,
    onMutate: (courseId: string) => toggleIn('cart')(courseId),
    onSuccess: (next) => queryClient.setQueryData(['collections'], next),
    onError: () => queryClient.invalidateQueries({ queryKey: ['collections'] }),
  });

  return {
    collections: data,
    isSaved: (courseId: string) => data.wishlist.includes(courseId),
    toggleWishlist: wishlist.mutate,
    toggleCart: cart.mutate,
  };
};
