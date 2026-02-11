import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getAllNotes = async () => {
  const response = await httpClient.get("/note");
  return response.data;
};

export const createNote = async (title: string, content: string) => {
  const response = await httpClient.post("/note", {
    title,
    content,
    userId: "00000000-0000-0000-0000-000000000001",
  });
  return response.data;
};
