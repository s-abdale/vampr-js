class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb up the tree toward root
    while (currentVampire.creator) {
      // while there is a boss, replace currentVampire with boss
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    // return true if this vamp is vampire's boss OR if this vamp is their bosses boss
    if ((this === vampire.creator) || (this.offspring.includes(vampire.creator))) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // check if current vampire has the name ...
    if (this.name === name) {
      return this;
    }

    // ... if not, check offspring
    for (let child of this.offspring) {
      let currentVamp = child.vampireWithName(name); // plug in function for each offspring

      if (currentVamp) {
        return currentVamp;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;
    // depth first traversal calculate total employees
    for (let descendant of this.offspring) {
      totalDescendents += descendant.totalDescendents + 1;
    }
    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted >= 1980) {
      millenials.push(this);
    }

    for (const child of this.offspring) {
      // const millenialOffspring = child.allMillennialVampires();
      millenials = millenials.concat(child.allMillennialVampires);
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {

  // }
}

module.exports = Vampire;

