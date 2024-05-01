class Team {
    constructor() {
        this.members = new Set();
    }

    add(character) {
        if (this.members.has(character)) {
            throw new Error('Character already exists in the team.');
        }
        this.members.add(character);
    }

    addAll(...characters) {
        characters.forEach(character => {
            if (this.members.has(character)) {
                console.warn('Skipping duplicate character:', character);
            } else {
                this.members.add(character);
            }
        });
    }

    toArray() {
        return [...this.members];
    }
}