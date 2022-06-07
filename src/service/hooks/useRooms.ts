import { useQuery } from "react-query";
import { api } from "../index";

interface Room {
  id: number;
  name: string;
}

interface getRoomResponse {
  data: Room[];
}

// requisição á api (fetch)
async function getRooms(page?: number): Promise<getRoomResponse> {
  const { data } = await api.get(`/room/list`);

  return {
    data,
  };
}

// conectando o fetch a api com o react query
export function useRooms(page?: number) {
  return useQuery("rooms", () => getRooms());
}

async function getRoomsWithSelect(): Promise<Room[]> {
  const { data } = await api.get("/room/list");

  const rooms = data.map((room: Room) => {
    return {
      value: room.id,
      label: room.name,
    };
  });

  return rooms;
}

export function useRoomsWithSelect() {
  return useQuery("rooms", getRoomsWithSelect);
}
