const { TestScheduler } = require('jest');

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

describe('Team', () => {
    let team;
    let character1, character2, character3;

    beforeEach(() => {
        team = new Team();
        character1 = { name: 'Character 1' };
        character2 = { name: 'Character 2' };
        character3 = { name: 'Character 3' };
    });

    test('adding a character', () => {
        team.add(character1);
        expect(team.toArray()).toEqual([character1]);
    });

    test('adding multiple characters without duplicates', () => {
        team.addAll(character1, character2, character3);
        expect(team.toArray()).toEqual([character1, character2, character3]);
    });

    test('adding multiple characters with duplicates', () => {
        team.add(character1);
        team.addAll(character2, character1, character3);
        expect(team.toArray()).toEqual([character1, character2, character3]);
    });

    test('toArray method returns an array', () => {
        expect(Array.isArray(team.toArray())).toBe(true);
    });

    test('toArray method returns all team members', () => {
        team.addAll(character1, character2, character3);
        const members = team.toArray();
        expect(members).toContain(character1);
        expect(members).toContain(character2);
        expect(members).toContain(character3);
    });

    test('adding a duplicate character throws an error', () => {
        team.add(character1);
        expect(() => {
            team.add(character1);
        }).toThrow('Character already exists in the team.');
    });

    test('adding duplicate characters does not throw an error', () => {
        team.add(character1);
        team.addAll(character2, character1, character3);
        expect(team.toArray()).toEqual([character1, character2, character3]);
    });
});
