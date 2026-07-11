import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const fetchMessages = async ({ pageParam = 1 }) => {
  const { data } = await api.get(`/messages?page=${pageParam}&limit=50`);
  return data;
};

export const useChat = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    staleTime: Infinity, // Rely on socket for new messages
  });
};
