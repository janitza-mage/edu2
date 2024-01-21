INSERT INTO edu2."Course" ("authorId",title,description,"scriptLibrary") VALUES
	 (1,'Linear Algebra 3 (abstract vector spaces)','This course continues the way towards abstraction taken in Linear Algebra 2 and drops even
the notion of a vector as a tuple of numbers, keeping only the rules for handling them.
This abstraction allows us to treat other things as vectors, such as functions.',''),
	 (1,'Linear Algebra 1 (vectors as arrows)','This course is an introduction into linear algebra. It defines vectors as mathematical
objects that represent real-world things such as displacement, velocity and forces.

[This intro video from Khan Academy should help those who have never heard of vectors
before](https://www.youtube.com/watch?v=br7tS1t2SFE)
',''),
	 (1,'Linear Algebra 2 ($\mathbb{R}^n$ vector space)','This course develops the $\mathbb{R}^n$ vector space purely as a numerical object, dropping the
notion of arrows with a direction and length. It serves as a step towards abstract vector
spaces.

If you have not completed Linear Algebra 1 yet, caution is advised: You may find the
content of this course to be too abstract to understand.
','
// --------------------------------------------------------------------------------------------------------------------
// generic
// --------------------------------------------------------------------------------------------------------------------

function repeat(n, factory) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(factory());
  }
  return result;
}

function removeNullish(array) {
  return array.filter((x) => x !== null && x !== undefined);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// --------------------------------------------------------------------------------------------------------------------
// Katex formatting
// --------------------------------------------------------------------------------------------------------------------

function arrow(what) {
  return "\\vec{" + what + "}";
}

function col(a, b, c, d) {
  if (b === undefined) {
    return `\\begin{pmatrix}${a}\\end{pmatrix}`;
  }
  if (c === undefined) {
    return `\\begin{pmatrix}${a}\\\\${b}\\end{pmatrix}`;
  }
  if (d === undefined) {
    return `\\begin{pmatrix}${a}\\\\${b}\\\\${c}\\end{pmatrix}`;
  }
  return `\\begin{pmatrix}${a}\\\\${b}\\\\${c}\\\\${d}\\end{pmatrix}`;
}


// --------------------------------------------------------------------------------------------------------------------
// Vector math
// --------------------------------------------------------------------------------------------------------------------

function randomComponent(maxAbs) {
  return randomInt(maxAbs * 2 + 1) - maxAbs;
}

function randomVector(dimension, maxAbs) {
  if (dimension < 1 || dimension > 4) {
    throw new Error("dimension must be between 1 and 4");
  }
  return col(
      randomComponent(maxAbs),
      dimension >= 2 ? randomComponent(maxAbs) : undefined,
      dimension >= 3 ? randomComponent(maxAbs) : undefined,
      dimension >= 4 ? randomComponent(maxAbs) : undefined,
  );
}

function simpleR3Exercise(description, v1, v2, v3, moreWrongAnswers) {
  return {
    description,
    type: "ChooseOne",
    rightAnswer: "$" + col(v1, v2, v3) + "$",
    wrongAnswers: [
      "$" + col(v1 + 1, v2 - 1, v3 + 1) + "$",
      "$" + col(v1 - 1, v2, v3) + "$",
      "$" + col(v1, v2, v3 + 1) + "$",
      ...(moreWrongAnswers ?? []),
    ],
  };
}

// --------------------------------------------------------------------------------------------------------------------
// export
// --------------------------------------------------------------------------------------------------------------------

// noinspection JSAnnotator
return {
  repeat,
  removeNullish,
  randomInt,
  arrow,
  col,
  randomComponent,
  randomVector,
  simpleR3Exercise,
};
');
