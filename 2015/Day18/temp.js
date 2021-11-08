

const newLightValue = (state, yPos, xPos) => {
    const currentValue = state[yPos][xPos];
    const surroundingLightsOn = 0;

    for (let i = yPos - 1; i <= yPos + 1; i++) {
        for (let j = xPos - 1; j <= xPos + 1; j++) {
            if (i === yPos || j === xPos) {
                // Here   |
            }
        }
    }
}





const animate = (state) => {
    const newState = [];
    let newYState = '';

    for (let y = 0; y < state.length; y++) {
        for (let x = 0; x < state[y].length; x++) {
            let newXState = newLightValue(state[y][x], y, x)
            newYState += newXState;
        }
        newState.push(newYState);
        newYState = '';
    }
    return newState;
}