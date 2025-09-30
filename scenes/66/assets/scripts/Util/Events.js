class Events {
    constructor() {
        this.callbacks = [];
        this.nextId = 0;
    }

    emit(eventName, value) {
        this.callbacks.forEach(stored => {
            if(stored.eventName === eventName) {
                stored.callback(value);
            }
        });
    }

    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback,
        });

        return this.nextId;
    }

    removeId(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    removeCaller(caller) {
        this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller);
    }
}

const events = new Events();