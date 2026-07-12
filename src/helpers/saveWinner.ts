import { ApiError, createWinner, getWinner, updateWinner } from "@/api";
import { HTTP_NOT_FOUND } from "@/constants/app";

export default async function saveWinner(winnerId : number, time : number) {
     try {
          const existing = await getWinner(winnerId);
          const newWins = existing.wins + 1;
          const newTime = Math.min(existing.time, time);
          await updateWinner(winnerId, { wins: newWins, time: newTime });
        } catch (err) {
          if (err instanceof ApiError && err.status === HTTP_NOT_FOUND) {
            await createWinner({ id: winnerId, wins: 1, time });
          }
        }
}