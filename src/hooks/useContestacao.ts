import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mobileContestacaoService } from "@/src/services/mobile.contestacao.service";
import type { CreateContestacaoRequest } from "@/src/types/contestacao";

const KEYS = {
  contestacoes: ["contestacoes"] as const,
};

export function useContestacoes() {
  return useInfiniteQuery({
    queryKey: KEYS.contestacoes,
    queryFn: ({ pageParam }) =>
      mobileContestacaoService.list({
        page: pageParam,
        per_page: 20,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.last_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
}

export function useContestacaoCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContestacaoRequest) => mobileContestacaoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.contestacoes });
    },
  });
}
