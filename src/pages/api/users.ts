import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Murillo" },
    { id: 2, name: "Beatriz" },
    { id: 3, name: "Mauricio" },
    { id: 4, name: "Dalva" },
    { id: 5, name: "Rafael" },
  ];

  return response.json(users);
}