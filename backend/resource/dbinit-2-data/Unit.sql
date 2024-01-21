INSERT INTO edu2."Unit" ("courseId","index",title,description,"exerciseUrl","exerciseDefinition","exerciseScript") VALUES
	 (1,1,'Notation for Vector Variables','We use a letter with an arrow on top to denote a variable for an unknown or arbitrary vector, like $\vec{a}$.
Letters without an arrow denote numbers. This way we can easily distinguish between them.',NULL,'{"type": "script"}','context.showExerciseSheet(courseLibrary.repeat(2, () => {
  const r = courseLibrary.randomInt(3);
  const right = "$" + courseLibrary.arrow(r === 0 ? "a" : r === 1 ? "b" : "c") + "$";
  const wrong1 = "$" + (r === 0 ? "b" : r === 1 ? "c" : "a") + "$";
  const wrong2 = "$" + (r === 0 ? "c" : r === 1 ? "a" : "b") + "$";
  return {
    description: "Which of these variables is used for a vector?",
    type: "ChooseOne",
    rightAnswer: right,
    wrongAnswers: [wrong1, wrong2],
  };
}));
'),
	 (1,4,'Zero Vector','One thing that was of little importance with arrows was the _zero vector_ -- a vector
that, when added to any other vector, does not change it:

> $\vec{v} + \vec{0} = \vec{v}$

> $\vec{0} + \vec{v} = \vec{v}$

Unlike for arrows, the zero vector will be very important here.',NULL,'{"type": "explicit", "exercises": [{"type": "ChooseOne", "description": "We have not yet said what the zero vector looks like in numbers. But we know that it must leave the other vector alone when added. From that, there is only one possible way the zero vector can look like. What is the zero vector for the $\\mathbb{R}^3$ vector space?\n\nHint: remember the formula for addition.", "rightAnswer": "$\\begin{pmatrix}0\\\\0\\\\0\\end{pmatrix}$", "wrongAnswers": ["$\\begin{pmatrix}0\\\\0\\end{pmatrix}$", "$\\begin{pmatrix}1\\\\0\\\\0\\end{pmatrix}$"]}]}',''),
	 (1,7,'Multiplying a Vector by a Scalar','With numbers, we started with multiplication as a shorthand for repeated addition:

> $3\cdot x = x + x + x$

and the same can be done with vectors:

> $3\cdot \vec{v} = \vec{v} + \vec{v} + \vec{v}$

But we generalized this for numbers and we can now write something like
$\sqrt{2}\cdot\sqrt{3}$ for which there is no equivalent in repeated addition.
To do the same with vectors, we''ll have to define _multiplication of a number
and a vector_ in such a way that it can be done for any number, and

> $3\cdot \vec{v} = \vec{v} + \vec{v} + \vec{v}$

is still true. No problem at all:

> $x\cdot\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} = \begin{pmatrix}x\cdot a_1\\x\cdot a_2\\x\cdot a_3\end{pmatrix}$

For reasons that we will explain later, numbers are also called _scalars_ in the context
of vectors and vector spaces. For now, just think "number" when you read "scalar".
',NULL,'{"type": "script"}','context.showExerciseSheet(courseLibrary.repeat(3, () => {
  const s = courseLibrary.randomComponent(2);
  const a1 = courseLibrary.randomComponent(5);
  const a2 = courseLibrary.randomComponent(5);
  const a3 = courseLibrary.randomComponent(5);
  return courseLibrary.simpleR3Exercise(
    `What is $${s}\\cdot${courseLibrary.col(a1, a2, a3)}$?`,
    s*a1, s*a2, s*a3,
  );
}));
'),
	 (1,8,'Multiplication Rules','Let''s find out more about the rules of multiplication. Again, remember the formula and
think about its consequences.',NULL,'{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$0\\cdot\\vec{v} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all scalars $s$?\n\n$s\\cdot\\vec{0} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$1\\cdot\\vec{v} = \\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$-1\\cdot\\vec{v} = -\\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$, $\\vec{b}$ and scalars $x$, $y$?\n\n$(x + y)\\cdot(\\vec{a} + \\vec{b}) = x\\cdot\\vec{a} + y\\cdot\\vec{b}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$, $\\vec{b}$ and scalars $x$, $y$?\n\n$(x + y)\\cdot(\\vec{a} + \\vec{b}) = x\\cdot\\vec{a} + x\\cdot\\vec{b} + y\\cdot\\vec{a} + y\\cdot\\vec{b}$", "rightAnswer": true}]}',''),
	 (1,2,'Vector Addition','We can add two vectors by adding their components:

$\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} + \begin{pmatrix}b_1\\b_2\\b_3\end{pmatrix} = \begin{pmatrix}a_1 + b_1\\a_2 + b_2\\a_3 + b_3\end{pmatrix}$

For example,

$\begin{pmatrix}1\\2\\0\end{pmatrix} + \begin{pmatrix}3\\-5\\1\end{pmatrix} = \begin{pmatrix}4\\-3\\1\end{pmatrix}$

In Linear Algebra 1, we showed that this has the same result as placing the start of the second 
arrow at the end of the first arrow. We now drop the idea of arrows and go with the above
formula alone. ',NULL,'{"type": "script"}','context.showExerciseSheet(courseLibrary.repeat(3, () => {
  const a1 = courseLibrary.randomComponent(5);
  const a2 = courseLibrary.randomComponent(5);
  const a3 = courseLibrary.randomComponent(5);
  const b1 = courseLibrary.randomComponent(5);
  const b2 = courseLibrary.randomComponent(5);
  const b3 = courseLibrary.randomComponent(5);
  return courseLibrary.simpleR3Exercise(
    `What is $${courseLibrary.col(a1, a2, a3)} + ${courseLibrary.col(b1, b2, b3)}$?`,
    a1 + b1, a2 + b2, a3 + b3,
    ["$" + courseLibrary.col(a1 + a2 + a3, b1 + b2 + b3) + "$"],
  );
}));
'),
	 (1,3,'Vector Subtraction','We can subtract vectors in a similar way. With arrows, subtraction was useful in
several ways: It could place the _end_ of the second arrow at the end of the first
arrow, like addition but backwards. It could also find what arrow one would have
to add to a given starting arrow to reach a given result arrow, or find the arrow
from one point to another.

All these different cases did the same thing to the numbers, though:

$\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} - \begin{pmatrix}b_1\\b_2\\b_3\end{pmatrix} = \begin{pmatrix}a_1 - b_1\\a_2 - b_2\\a_3 - b_3\end{pmatrix}$

So again, we will redefine subtraction by focusing only on the formula.',NULL,'{"type": "script"}','context.showExerciseSheet(courseLibrary.repeat(3, () => {
  const a1 = courseLibrary.randomComponent(5);
  const a2 = courseLibrary.randomComponent(5);
  const a3 = courseLibrary.randomComponent(5);
  const b1 = courseLibrary.randomComponent(5);
  const b2 = courseLibrary.randomComponent(5);
  const b3 = courseLibrary.randomComponent(5);
  return courseLibrary.simpleR3Exercise(
    `What is $${courseLibrary.col(a1, a2, a3)} - ${courseLibrary.col(b1, b2, b3)}$?`,
    a1 - b1, a2 - b2, a3 - b3,
    ["$" + courseLibrary.col(a1 - a2 - a3, b1 - b2 - b3) + "$"],
  );
}));
'),
	 (1,0,'Vectors from $\mathbb{R}^n$','In this course, we want to focus on the rules for doing calculations with vectors, and
ignore the notion of a vector as an arrow with a direction and length. To do so, we must
first pin down how we want to think of a vector during this course.

From Linear Algebra 1, we know that a vector can be represented as a tuple of numbers:
Two numbers for two-dimensional vectors, three numbers for three-dimensional vectors, and
so on. These numbers may be negative such as -2, they may be fractions such as $\frac{1}{3}$,
and may be irrational such as $\sqrt{2}$ or $\pi$.

A vector with two numbers is said to belong to $\mathbb{R}^2$. We call $\mathbb{R}^2$ the
_vector space_ to which that vector belongs.

If it has three numbers, it belongs to $\mathbb{R}^3$, and so on. In general, if a vector
has $n$ numbers, it belongs to $\mathbb{R}^n$. 

We write a vector as a column vector. For example, this is a vector from $\mathbb{R}^3$:
$\begin{pmatrix}4\\-0.5\\1\end{pmatrix}$
',NULL,'{"type": "script"}','context.showExerciseSheet([
  ...courseLibrary.repeat(2,
    () => ({
      description: "Which of these is a vector from $\\mathbb{R}^3$?",
      type: "ChooseOne",
      rightAnswer: "$" + courseLibrary.randomVector(3, 5) + "$",
      wrongAnswers: [
        "$" + courseLibrary.randomVector(1, 5) + "$",
        "$" + courseLibrary.randomVector(2, 5) + "$",
        "$" + courseLibrary.randomVector(4, 5) + "$",
      ],
    })
  ),
  ...courseLibrary.repeat(2,
    () => {
      const dimension = courseLibrary.randomInt(3) + 2;
      return {
        description: `To which vector space does $${courseLibrary.randomVector(dimension, 5)}$ belong?`,
        type: "ChooseOne",
        rightAnswer: `$\\mathbb{R}^${dimension}$`,
        wrongAnswers: courseLibrary.removeNullish([
          dimension === 2 ? null : "$\\mathbb{R}^2$",
          dimension === 3 ? null : "$\\mathbb{R}^3$",
          dimension === 4 ? null : "$\\mathbb{R}^4$",
        ]),
      };
    }
  ),
]);
'),
	 (1,5,'Subtracting the Zero Vector','The zero vector has a similar effect in subtraction, but it''s a bit more complex.
Remember the formula for subtraction and work it out yourself!',NULL,'{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{v} - \\vec{0} = \\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{0} - \\vec{v} = \\vec{v}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{v} - \\vec{v} = \\vec{0}$", "rightAnswer": true}]}',''),
	 (1,6,'Inverse Vector','The last exercise has shown that when we subtract a vector from itself, we get the zero vector.
Can we also find a vector to _add_ to get the zero vector? Yes, and it is called the _inverse_ vector.
The inverse to $\vec{a}$ is written as $-\vec{a}$ and is obtained by negating all the numbers in $\vec{a}$:

> $-\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} = \begin{pmatrix}-a_1\\-a_2\\-a_3\end{pmatrix}$

because then,

> $\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} + (-\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix}) = \begin{pmatrix}a_1 + (-a_1)\\a_2 + (-a_2)\\a_3 + (-a_3)\end{pmatrix} = \begin{pmatrix}0\\0\\0\end{pmatrix} = \vec{0}$
',NULL,'{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$(-\\vec{v}) + \\vec{v} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$(-\\vec{v}) = \\vec{v}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct?\n\n$-\\vec{0} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$ and $\\vec{b}$?\n\n$\\vec{a} + (-\\vec{b}) = \\vec{a} - \\vec{b}$", "rightAnswer": true}]}',''),
	 (1,10,'Dividing a Vector by a Vector','Can we divide a vector by a vector?

By logically extending what we did in the previous unit,

> $\vec{v} = \frac{\vec{a}}{\vec{b}}$

such that

> $\vec{v}\cdot\vec{b} = \vec{a}$

The first obvious problem with this is that we have not defined any kind of
multiplication for two vectors yet. The second problem is that we don''t really
know what the meaning of such a kind of division operation would be.

In fact, the reason why we have not defined the multiplication of two vectors
yet is just that: We have to give it a _meaning_.

Now it is rather obvious that we _could_ define multiplication and division
for two vectors just like we did for addition and subtraction, as
_component-wise_ multiplication and division. But with addition and subtraction,
we did that because it reflects the way we can append arrows. This is
not the case for multiplication or division: There is no arrow equivalent for it.

This last paragraph is important enough to be elaborated: We cannot multiply
or divide two vectors because we _choose_ not to, and we do that because it is
not useful. In a way, we are building a "toolbox" to operate on vectors, and
instead of a hammer and screwdrivers, it contains addition, subtraction, inverse,
the zero vector and scalar multiplication. Now the component-wise multiplication
of two vectors is simply something that we _could_ put into that toolbox, but has
no actual use, like putting a salt shaker into a real-world toolbox. So we don''t
do that, by choice.

We will later learn about a different way of multiplying two vectors that is
actually useful. But for now, we''ll turn to different things.',NULL,'{"type": "explicit", "exercises": []}','');
INSERT INTO edu2."Unit" ("courseId","index",title,description,"exerciseUrl","exerciseDefinition","exerciseScript") VALUES
	 (1,9,'Dividing a Vector by a Scalar','Can we divide a vector by a scalar? What would be the meaning of that?

If we divide a number by 3, we expect to get a number that, when added three
times, adds up to the original number. In general, if we divide $a$ by $s$, we
expect to get a result $b$ that when multiplied by $s$ again, returns to $a$:

> $b = \frac{a}{s}$

> $s\cdot b = a$

If $a$ is a vector, and is divided by a scalar $s$, then $b$ must be a vector too,
otherwise multiplying with $a$ cannot ever return to $a$:

> $\vec{b} = \frac{\vec{a}}{s}$

> $s\cdot\vec{b} = \vec{a}$

The formula for division is, unsurprisingly,

> $\frac{\vec{a}}{s} = \begin{pmatrix}a_1/s\\a_2/s\\a_3/s\end{pmatrix} = \frac{1}{s}\cdot\vec{a}$

',NULL,'{"type": "explicit", "exercises": []}','');
