import axios from "axios";
const apiKey = "RGAPI-6d2262b3-6ee8-4d0b-ab1a-6c3ec6d1abbd";
import { VercelRequest, VercelResponse} from "@vercel/node"

const riotEurope = axios.create({
  baseURL: "https://europe.api.riotgames.com",
  headers: {
    "X-Riot-Token": apiKey,
  }
})

const riotEuw1 = axios.create({
  baseURL: "https://euw1.api.riotgames.com/",
  headers: {
    "X-Riot-Token": apiKey,
  }
})

export async function getSummonerByName(name: string) {
  const response = await riotEuw1.get(
    `/lol/summoner/v4/summoners/by-name/${name}`
  );
  return response.data;
}

export async function getHistoryByPuuid(puuid: string) {
  const response = await riotEurope.get(
    `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`
  );
  return response.data;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.query as { name: string };
  const response = await getSummonerByName(name);
  const matchids = await getHistoryByPuuid(response.puuid);
  console.log({ response });
  console.log(matchids);
   
  res.send({ puuid: response.puuid, matchids })
} 

export default handler;