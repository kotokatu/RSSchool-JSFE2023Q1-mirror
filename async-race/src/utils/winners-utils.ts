import {
    CarRaceData,
    getWinner,
    updateWinner,
    createWinner,
    GetWinnerApiResponse,
} from './api-utils';

export default async (carRaceData: CarRaceData): Promise<void> => {
    const winner = await getWinner(carRaceData.id);
    if (!winner.id) {
        const winnerData = { id: carRaceData.id, wins: 1, time: carRaceData.time };
        await createWinner(winnerData);
    } else {
        const winnerData = {
            id: carRaceData.id,
            wins: winner.wins + 1,
            time: winner.time > carRaceData.time ? carRaceData.time : winner.time,
        };
        await updateWinner(winnerData);
    }
};
