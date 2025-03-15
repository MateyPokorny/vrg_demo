//pomocné funkce

//zaokrouhlení na dvě desetinná místa
const roundDistance = (distance: number): number => {
    return Math.round(distance * 100) / 100;
};

export { roundDistance };
