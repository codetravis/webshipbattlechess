class SaveState {
    constructor() {

    }

    getState(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    saveState(name, state) {
        localStorage.setItem(name, JSON.stringify(state));
    }

    validateGameState(state) {
        if (state) {
            return true;
        }
        
        return false;
    }
}