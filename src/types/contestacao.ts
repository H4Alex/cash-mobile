export type ContestacaoStatus = "pendente" | "aprovada" | "rejeitada";

export type ContestacaoTipo =
  | "cashback_nao_gerado"
  | "valor_incorreto"
  | "expiracao_indevida"
  | "venda_cancelada";

export interface Contestacao {
  id: number;
  empresa_id: number;
  transacao_id: number;
  cliente_id: number | null;
  tipo: ContestacaoTipo;
  descricao: string;
  status: ContestacaoStatus;
  resposta: string | null;
  respondido_por: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContestacaoListResponse {
  status: true;
  data: Contestacao[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
  error: null;
  message: string;
}

export interface CreateContestacaoRequest {
  transacao_id: number;
  tipo: ContestacaoTipo;
  descricao: string;
}
