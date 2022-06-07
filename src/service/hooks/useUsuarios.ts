import { useQuery } from "react-query";
import { api } from "../index";

interface Role {
  name: string;
}

interface Usuario {
  id: number;
  username: string;
  email: string;
  status: boolean;
  role: Role;
}

interface getUsuarioResponse {
  data: Usuario[];
}

// requisição á api (fetch)
async function getUsuarios(page?: number): Promise<getUsuarioResponse> {
  const { data } = await api.get(`/user/list`);

  console.log(data);

  return {
    data,
  };
}

// conectando o fetch a api com o react query
export function useUsuarios(page?: number) {
  return useQuery("usuarios", () => getUsuarios());
}
