const maxPeople = 4;

class Race {
    // Compiles under 2.0.8, Doesn't compile under 2.1.1-rc
    multiPersonRace(): boolean {
        return maxPeople > 1;
    }
}