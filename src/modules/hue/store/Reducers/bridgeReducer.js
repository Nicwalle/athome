function bridges(state, action) {
    let nextState;
    switch (action.type) {
        case 'ADD_BRIDGE':
            let bridges = {...state.bridges};
            bridges[action.bridgeID] = action.bridge;

            nextState = {
                ...state,
                bridges: bridges
            };
            return nextState || state;
        default:
            return state
    }
}

export default bridges;
