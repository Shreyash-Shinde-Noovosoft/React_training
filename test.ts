function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!

  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

