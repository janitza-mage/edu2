--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Author; Type: TABLE DATA; Schema: edu2; Owner: -
--

INSERT INTO edu2."Author" OVERRIDING SYSTEM VALUE VALUES (1, 'Martin');


--
-- Data for Name: Course; Type: TABLE DATA; Schema: edu2; Owner: -
--

INSERT INTO edu2."Course" OVERRIDING SYSTEM VALUE VALUES (2, 1, 'Linear Algebra 2 ($\mathbb{R}^n$ vector space)', 'This course develops the $\mathbb{R}^n$ vector space purely as a numerical object, dropping the
notion of arrows with a direction and length. It serves as a step towards abstract vector
spaces.

If you have not completed Linear Algebra 1 yet, caution is advised: You may find the
content of this course to be too abstract to understand.
', '
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
INSERT INTO edu2."Course" OVERRIDING SYSTEM VALUE VALUES (3, 1, 'Linear Algebra 3 (abstract vector spaces)', 'This course continues the way towards abstraction taken in Linear Algebra 2 and drops even
the notion of a vector as a tuple of numbers, keeping only the rules for handling them.
This abstraction allows us to treat other things as vectors, such as functions.', '');
INSERT INTO edu2."Course" OVERRIDING SYSTEM VALUE VALUES (1, 1, 'Linear Algebra 1 (vectors as arrows)', 'This course is an introduction into linear algebra. It defines vectors as mathematical
objects that represent real-world things such as displacement, velocity and forces.

[This intro video from Khan Academy should help those who have never heard of vectors
before](https://www.youtube.com/watch?v=br7tS1t2SFE)
', 'repetitionFailedToken = {};

repeat = (n, factory) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    for (let attempt = 0; attempt < 1000; attempt++) {
      const element = factory(i);
      if (element !== repetitionFailedToken) {
        result.push(element);
        break;
      }
      if (attempt === 999) {
        throw new Error("repetition did not succeed");
      }
    }
  }
  return result;
}

repeatAsync = async (n, factory) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    for (let attempt = 0; attempt < 1000; attempt++) {
      const element = await factory(i);
      if (element !== repetitionFailedToken) {
        result.push(element);
        break;
      }
      if (attempt === 999) {
        throw new Error("repetition did not succeed");
      }
    }
  }
  return result;
}

repeatMultiple = (n, factory) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    for (let attempt = 0; attempt < 1000; attempt++) {
      const elements = factory(i);
      if (elements !== repetitionFailedToken) {
        result = [...result, ...elements];
        break;
      }
      if (attempt === 999) {
        throw new Error("repetition did not succeed");
      }
    }
  }
  return result;
}

repeatMultipleAsync = async (n, factory) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    for (let attempt = 0; attempt < 1000; attempt++) {
      const element = await factory(i);
      if (elements !== repetitionFailedToken) {
        result = [...result, ...elements];
        break;
      }
      if (attempt === 999) {
        throw new Error("repetition did not succeed");
      }
    }
  }
  return result;
}

randomInt = (limit) => Math.floor(Math.random() * limit);
randomElement = (elements) => elements[randomInt(elements.length)];

shuffleInPlace = (elements) => {
  for (let i = elements.length; i > 0; i--) {
    const sourceIndex = randomInt(i);
    const previousLast = elements[i - 1];
    elements[i - 1] = elements[sourceIndex];
    elements[sourceIndex] = previousLast;
  }
}

getShuffled = (elements) => {
  elements = [...elements];
  shuffleInPlace(elements);
  return elements;
}

createPassiveCanvas = ({ onRender, onInputPosition, onClick }) => {

  const $canvas = $("<canvas width=''500'' height=''500'' style=''max-width: 100%''></canvas>");
  const canvas = $canvas[0];
  const context = canvas.getContext("2d");

  const $root = $("<div>");
  const root = $root[0];
  $root.append($canvas);

  let dirty = true;
  const state = {
    $canvas,
    canvas,
    context,
    $root,
    root,
    inputPosition: { x: 0, y: 0 },
    redraw: () => { dirty = true; },
    redrawImmediately: () => { onRender(state); dirty = false; },
    toDataUrl: () => canvas.toDataURL(),
  }

  const updateInputPosition = (event) => {
    var offset = $canvas.offset();
    var x = (event.pageX - offset.left) / $canvas.width() * 500;
    var y = (event.pageY - offset.top) / $canvas.height() * 500;
    state.inputPosition = { x, y };
  };
  
  canvas.addEventListener("mousemove", (event) => {
    updateInputPosition(event);
    if (onInputPosition) {
      dirty = dirty || onInputPosition(state);
    }
  });
  
  canvas.addEventListener("click", (event) => {
    updateInputPosition(event);
    if (onInputPosition) {
      dirty = dirty || onInputPosition(state);
    }
    if (onClick) {
      dirty = dirty || onClick(state);
    }
  });
  
  setInterval(() => {
    if (dirty) {
      dirty = false;
      onRender(state);
    }
  }, 50);

  return state;
};

setupCoordinateGridCanvas = (context, minX, maxX, minY, maxY, options) => {

    // parameter normalization and computing derived values
    minX = Math.round(minX);
    maxX = Math.round(maxX);
    minY = Math.round(minY);
    maxY = Math.round(maxY);
    let startX = minX - 0.5;
    const endX = maxX + 0.5;
    let startY = minY - 0.5;
    const endY = maxY + 0.5;

    // colors, incl. grey-out support
    const darkColor = options?.greyedOut ? "#ccc" : "black";
    const lightColor = options?.greyedOut ? "#eee" : "lightgrey";

    // transformation
    context.scale(1 / (maxX - minX + 1) * context.canvas.width, -1 / (maxY - minY + 1) * context.canvas.height);
    context.translate(-startX, -endY);

    // optionally clip negative part
    if (options?.clipNegative) {
        minX = Math.max(0, minX);
        minY = Math.max(0, minY);
        startX = Math.max(0, startX);
        startY = Math.max(0, startY);
    }

    // grid
    if (options?.drawGrid ?? true) {
        context.strokeStyle = lightColor;
        context.lineWidth = 0.1;
        context.beginPath();
        for (let x = minX; x <= maxX; x++) {
            context.moveTo(x, startY);
            context.lineTo(x, endY);
        }
        for (let y = minY; y <= maxY; y++) {
            context.moveTo(startX, y);
            context.lineTo(endX, y);
        }
        context.stroke();
    }

    // main axes
    context.strokeStyle = darkColor;
    context.lineWidth = 0.1;
    context.beginPath();
    context.moveTo(startX, 0);
    context.lineTo(endX, 0);
    context.moveTo(0, startY);
    context.lineTo(0, endY);
    context.stroke();

    // arrows
    context.beginPath();
    context.moveTo(endX - 0.05, 0);
    context.lineTo(endX - 0.2, -0.2);
    context.moveTo(endX - 0.05, 0);
    context.lineTo(endX - 0.2, +0.2);
    context.moveTo(0, endY - 0.05);
    context.lineTo(-0.2, endY - 0.2);
    context.moveTo(0, endY - 0.05);
    context.lineTo(+0.2, endY - 0.2);
    context.stroke();

    // ticks
    if (options?.drawTicks ?? true) {
        context.strokeStyle = darkColor;
        context.lineWidth = 0.1;
        context.beginPath();
        for (let x = minX; x <= maxX; x++) {
            context.moveTo(x, -0.15);
            context.lineTo(x, 0.15);
        }
        for (let y = minY; y <= maxY; y++) {
            context.moveTo(-0.15, y);
            context.lineTo(0.15, y);
        }
        context.stroke();
    }
    if (options?.drawTickNumbers ?? options?.drawTicks ?? true) {
        context.font = "0.5px sans-serif";
        context.fillStyle = darkColor;
        context.lineWidth = 0.1;
        for (let x = minX; x <= maxX; x++) {
            if (x !== 0 || options?.clipNegative) {
                context.save();
                context.translate(x - 0.18, -0.65);
                context.scale(1, -1);
                context.fillText(x.toString(), 0, 0);
                context.restore();
            }
        }
        for (let y = minY; y <= maxY; y++) {
            if (y !== 0 || options?.clipNegative) {
                context.save();
                context.translate(-0.65, y - 0.18);
                context.scale(1, -1);
                context.fillText(y.toString(), 0, 0);
                context.restore();
            }
        }
    }

    // sane and stable defaults
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.lineWidth = 0.1;
    context.setLineDash([]);

}

showText = (context, x, y, text) => {
    context.save();
    context.translate(x, y);
    context.scale(1, -1);
    context.fillText(text, 0, 0);
    context.restore();
};

point = (context, x, y, label = undefined, options = {}) => {
    context.beginPath();
    context.arc(x, y, options.size ?? 0.15, 0, 2 * Math.PI);
    context.fill();
    if (label !== undefined) {
        context.save();
        context.font = options.font ?? "0.6px sans-serif";
        context.translate(x, y);
        context.scale(1, -1);
        context.fillText(label, options.labelX ?? 0.2, options.labelY ?? 0.6);
        // context.fillText(label, options.labelX ?? 0.3, options.labelY ?? 1.0);
        context.restore();
    }
};

arrow = (context, x1, y1, x2, y2, options) => {
    options = {
      tipSize: 0.2,
      color: "black",
      dash: [],
      headDash: null,
      bodyDash: null,
      ...(options ?? {}),
    };

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ndx = dx / length;
    const ndy = dy / length;

    context.save();
    context.fillStyle = context.strokeStyle = options.color;
    context.setLineDash(options.bodyDash ?? options.dash ?? []);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.restore();

    // disable the dash pattern for the head
    context.save();
    context.fillStyle = context.strokeStyle = options.color;
    context.setLineDash(options.headDash ?? options.dash ?? []);
    context.beginPath();
    context.moveTo(x2 - options.tipSize * ndx - options.tipSize * ndy, y2 - options.tipSize * ndy + options.tipSize * ndx);
    context.lineTo(x2, y2);
    context.lineTo(x2 - options.tipSize * ndx + options.tipSize * ndy, y2 - options.tipSize * ndy - options.tipSize * ndx);
    context.stroke();
    context.restore();
};

// The extensionFactor should normally be enough, but in case it is not, it can be increased by the caller. Don''t pass
// a super-large number by default -- this could cause rounding problems.
infiniteLine = (context, x1, y1, x2, y2, extensionFactor = 1000) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    context.beginPath();
    context.moveTo(x1 - extensionFactor * dx, y1 - extensionFactor * dy);
    context.lineTo(x2 + extensionFactor * dx, y2 + extensionFactor * dy);
    context.stroke();
};

showXAxisAngle = (context, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const intersectionX = x1 - y1 * dx / dy;

    context.beginPath();
    context.arc(intersectionX, 0, 0.2, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(intersectionX, 0, 0.6, 0, 0.5 * Math.PI); // TODO
    context.stroke();
};

showResultOverlay = (context, success) => {
  context.resetTransform();
  context.strokeStyle = "#888";
  context.lineWidth = 20;
  context.beginPath();
  if (success) {
    context.moveTo(80, 250);
    context.lineTo(180, 380);
    context.lineTo(400, 80);
  } else {
    context.moveTo(40, 40);
    context.lineTo(460, 460);
    context.moveTo(40, 460);
    context.lineTo(460, 40);
  }
  context.stroke();
};

//
// Embedded canvas, e.g. in unit descriptions
//

class DrawCanvas extends HTMLElement {
  constructor() {
    super();
      const shadow = this.attachShadow({ mode: ''open'' });
      shadow.appendChild($("<canvas width=''500'' height=''500'' style=''max-width: 100%''></canvas>")[0]);
      shadow.appendChild($("<slot style=''display: none''></slot>")[0]);
  }

  connectedCallback() {
    const canvas = $(this.shadowRoot).children("canvas")[0];
    const scriptBodySlot = $(this.shadowRoot).children("slot")[0];
    const scriptBody = $(scriptBodySlot.assignedNodes()).text();

    console.log(scriptBodySlot.assignedNodes());
    
    const scriptFunction = new Function("context", scriptBody);
    scriptFunction(canvas.getContext("2d"));
  }

}
customElements.define(''draw-canvas'', DrawCanvas);
');


--
-- Data for Name: Image; Type: TABLE DATA; Schema: edu2; Owner: -
--



--
-- Data for Name: Unit; Type: TABLE DATA; Schema: edu2; Owner: -
--

INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (6, 1, 5, '(Titel unklar) TODO', 'Relevante Eigenschaften der kürzesten Verbindung:
- wieviel Einheiten nach rechts/links (Zahl mit Vorzeichen)
- wieviel Einheiten nach oben/unten (Zahl mit Vorzeichen)
- Länge der Verbindung (nicht-negative Zahl)
- Richtung der Verbindung in dem Sinne: Wenn man die Verbindung in beide Richtungen verlängert -- welchen Winkel
    bildet sie dann mit den Koordinatenachsen?

Wenn wir möglichst kurz und knapp die Eigenschaften angeben wollen, dann sind nicht alle diese Angaben nötig,
denn sie enthalten dieselben Informationen doppelt:
* Ein Vektor mit einer vorgegebenen Länge und Richtung hat immer die gleiche Anzahl an Einheiten nach recht/links
  und oben/unten.
* Ein Vektor mit einer vorgegebenen Anzahl an Einheiten nach rechts/links und oben/unten hat immer die gleiche
  Länge und Richtung.
"""
Zur letzten Regel gibt es eine einzige Ausnahme: bei der Länge 0 ist die Richtung undefiniert. Deshalb legen wir
fest, dass zwei Vektoren der Länge 0 immer gleich sind, unabhängig von der angegebenen Richtung.
Übung: Wir haben jetzt festgelegt, welche Eigenschaften von Vektoren für uns relevant sind. Welche Auswahl an
    Eigenschaften reicht als Angabe aus, so dass man die restlichen Eigenschaften daraus ermitteln kann?
    - schritte nach rechts/links und oben/unten - ja
    - Länge und Richtung - ja
    - Länge und Schritte Rechts/Links - nein: Wenn der Vektor nur nach oben/unten geht, kennt man zwar seine
        Länge, weiß aber nicht, ob nach oben oder nach unten
    - Länge und Schritte Oben/Unten - nein: Wenn der Vektor nur nach rechts geht, kennt man zwar seine Länge, weiß
        aber nicht, ob nach rchts oder nach links
    - Richtung und Schritte Rechts/Links - nein: Wenn der Vektor nur nach oben oder unten geht, kennt man
        seine Länge nicht
    - Richtung und Schritte Oben/Unten - nein: Wenn der Vektor nur nach rechts oder links geht, kennt man
        seine Länge nicht
    -> epilog: Deshalb gibt es zwei gültige Darstellungen für Vektoren in unserem Sinne:
        1. Länge und Richtung
        2. Schritte nach rechts/links und nach oben/unten
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (1, 1, 0, 'Punkt', 'Um in die Lineare Algebra einzusteigen, müssen wir erst ein paar geometrische Grundbegriffe
definieren. Der erste Begriff ist der Punkt:

* Ein Punkt ist das, was eine Position, aber keine Größe bzw. räumliche Ausdehnung und auch
  keine sonstigen Eigenschaften (Form, Farbe etc.) hat.

Ein Punkt hat also nur eine Position und sonst nichts. Wenn wir einen Punkt in einer Zeichnung darstellen
wollen, ist das etwas unpraktisch, denn einen echten Punkt ohne Ausdehnung könnte man nicht gut sehen, und
jede Darstellung mit Ausdehnung macht es schwierig, zu erkennen, wo genau der Punkt sich befindet.

Als Lösung wird ein Punkt üblicherweise als ein kleines Kreuzchen oder ein kleiner ausgefüllter Kreis dargestellt.
Bei einem Kreuzchen ist dann gemeint, dass sich der eigentliche Punkt an der Stelle befindet, an der sich die beiden
Linien des Kreuzchens schneiden. Die Linien selbst und z.B. deren Länge haben dabei keine Bedeutung, sondern machen
den Punkt nur in der Zeichnung besser sichtbar. Bei der Darstellung als kleiner, ausgefüllter Kreis befindet sich
der eigentliche Punkt in der Mitte des Kreises und die Größe des Kreises hat wieder keine mathematische Bedeutung.
', NULL, '{"type": "script"}', 'context.showExerciseSheet([
  {
    description: "Wähle unter diesen Objekten den Punkt aus:",
    type: "Script",
    script: (context) => {
      const objects = getShuffled(["punkt", "kreis", "quadrat", "linie"]);
      let selectedIndex = null;
      const canvasState = createPassiveCanvas({
        onRender: (state) => {

          // clear canvas so the background with green/red indicator for the answer is visible
          const g = state.context;
          g.resetTransform();
          g.fillStyle = "white";
          g.clearRect(0, 0, state.canvas.width, state.canvas.height);

          // objects
          function drawObject(x, y, type) {
            g.resetTransform();
            g.translate(x, y);
            g.lineWidth = 3;
            g.fillStyle = g.strokeStyle = (selectedIndex === null) ? "#008" : "#aaa";
            switch (type) {
              case "punkt":
                g.beginPath();
                g.arc(125, 125, 5, 0, 2 * Math.PI);
                g.fill();
                break;
              case "kreis":
                g.beginPath();
                g.arc(125, 125, 30, 0, 2 * Math.PI);
                g.stroke();
                break;
              case "linie":
                g.beginPath();
                g.moveTo(30, 220);
                g.lineTo(220, 30);
                g.stroke();
                break;
              case "quadrat":
                g.beginPath();
                g.rect(30, 30, 160, 160);
                g.fill();
                break;
            }
            if (selectedIndex !== null) {
              g.strokeStyle = "#888";
              g.lineWidth = 20;
              g.beginPath();
              if (type === "punkt") {
                g.moveTo(40, 125);
                g.lineTo(90, 190);
                g.lineTo(200, 40);
              } else {
                g.moveTo(20, 20);
                g.lineTo(230, 230);
                g.moveTo(20, 230);
                g.lineTo(230, 20);
              }
              g.stroke();
            }
          }
          drawObject(0, 0, objects[0]);
          drawObject(250, 0, objects[1]);
          drawObject(0, 250, objects[2]);
          drawObject(250, 250, objects[3]);
        },
        onClick: (state) => {
          selectedIndex = (state.inputPosition.x > 250 ? 1 : 0) + (state.inputPosition.y > 250 ? 2 : 0);
          context.reportResult(objects[selectedIndex] === "punkt");
          return true;
        },
      });
      // $button.on("click", () => context.reportResult(true));
      $(context.element).append(canvasState.root);
    },
  },
]);
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (3, 1, 2, 'Negative Koordinaten', 'Man kann bei weitem nicht alle Punkte erreichen, indem man vom Ursprung aus nach rechts und oben geht. Viele
Punkte liegen links oder unten vom Ursprung. Dazu könnte man zwei weitere Zahlen anngeben, die angeben, wie viele
Einheiten man nach links und unten gehen muss. Das wäre aber umständlich: Wenn man für einen Punkt nach links
gehen muss, muss man nicht nach rechts gehen, und wenn man nach unten gehen muss, muss man nicht nach oben gehen --
immerhin muss man für die Angabe von Koordinaten ja keinen Hinternissen ausweichen. Es wären also immer mindestens
zwei der Koordinaten gleich null.

Stattdessen werden negative Zahlen benutzt. Eine Angabe von "-1 nach rechts" ist das gleiche wie "1 nach links",
und "-3 nach oben" ist das gleiche wie "3 nach unten". Dadurch werden die unnötigen vielen Zahlen vermieden.
Wir werden später außerdem sehen, dass man durch die negativen Zahlen alle Punkte in Berechnungen einheitlich
behandeln kann, egal auf welcher Seite der Koordinatenachsen sie liegen.', NULL, '{"type": "script"}', 'function myCreateCanvas(showLabels) {
  let matrix = new DOMMatrix();
  const canvasState = createPassiveCanvas({
    onRender: (state) => {
      const g = state.context;
      g.resetTransform();
      g.clearRect(0, 0, state.canvas.width, state.canvas.height);
      setupCoordinateGridCanvas(g, -4, 4, -4, 4, { greyedOut: state?.greyedOut ?? state?.freeze });
      matrix = g.getTransform();
      g.fillStyle = g.strokeStyle = "blue";
      point(g, canvasState.currentX, canvasState.currentY, canvasState.showLabels ? `(${canvasState.currentX}|${canvasState.currentY})` : undefined);
      if (state.result !== undefined) {
        showResultOverlay(g, state.result);
      }
    },
    onClick: (state) => {
      if (state.freeze) {
        return false;
      }
      const screenSpacePoint = new DOMPoint(state.inputPosition.x, state.inputPosition.y, 0, 1);
      const transformedPoint = matrix.inverse().transformPoint(screenSpacePoint);
      canvasState.currentX = Math.round(transformedPoint.x);
      canvasState.currentY = Math.round(transformedPoint.y);
      return true;
    },
  });
  canvasState.showLabels = showLabels;
  canvasState.currentX = -100;
  canvasState.currentY = -100;
  return canvasState;
}

(async () => {
  context.showExerciseSheet([
    {
      description: "Setze den Punkt an verschiedene Stellen und beobache, welche Koordinaten er jeweils hat.",
      type: "Script",
      script: (context) => {
        const canvasState = myCreateCanvas(true);
        const $button = $("<button>weiter</button>");
        $button.on("click", () => {
          canvasState.freeze = true;
          canvasState.redraw();
          context.reportResult(true);
        });
        $(context.element).append(canvasState.root).append($button);
      },
    },
    ...repeat(2, () => {
      const targetX = randomInt(7) - 3;
      const targetY = randomInt(7) - 3;
      if (targetX >= 0 && targetY >= 0) {
        return repetitionFailedToken;
      }
      return {
        description: `Setze den Punkt an die Position (${targetX}|${targetY}).`,
        type: "Script",
        script: (context) => {
          const canvasState = myCreateCanvas(false);
          const $button = $("<button>fertig</button>");
          $button.on("click", () => {
            canvasState.showLabels = true;
            canvasState.freeze = true;
            canvasState.redraw();
            canvasState.result = canvasState.currentX === targetX && canvasState.currentY === targetY;
            context.reportResult(canvasState.result);
          });
          $(context.element).append(canvasState.root).append($button);
        },
      };
    }),
    ...await repeatAsync(2, async () => {
      const targetX = randomInt(7) - 3;
      const targetY = randomInt(7) - 3;
      if (targetX >= 0 && targetY >= 0) {
        return repetitionFailedToken;
      }
      const canvasState = myCreateCanvas(false);
      canvasState.currentX = targetX;
      canvasState.currentY = targetY;
      canvasState.freeze = true;
      canvasState.greyedOut = false;
      canvasState.redrawImmediately();
      return {
        description: `Welche Koordinaten hat der Punkt?\n\n![image](${canvasState.toDataUrl()})`,
        type: "FillInTheBlanks",
        stencil: "( ((:x)) | ((:y)) )",
        variables: [
          {
            "name": "x",
            "type": "text",
            "expected": "" + canvasState.currentX,
          },
          {
            "name": "y",
            "type": "text",
            "expected": "" + canvasState.currentY,
          },
        ],
      };
    }),
  ]);
})();
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (7, 1, 6, 'Vektoren verketten TODO', '- zwei Vektoren hintereinander geben einen Weg, der i.A. nicht mehr der kürzeste Weg zum Zielpunkt ist.
-   (bild)
- Wir wollen erst mal aber nur mit kürzesten Wegen arbeiten. Das lösen wir so, dass wir zwar zwei Vektoren verketten
    können, dann aber die Kette durch den kürzesten Weg zum Ende der Kette ersetzen. Dieses Verketten-und-Ersetzen
    nennen wir die _Summe_ der beiden Vektoren.
-   (bild)
Übungen
- welche Aussage ist richtig:
    - wenn man zwei Vektoren addiert, bleibt die Gesamtlänge gleich.
        Anders formuliert: Die Länge der Summe zweier Vektoren ist gleich der Summe der Längen der beiden Vektoren.
    - wenn man zwei Vektoren addiert, kann die Gesamtlänge gleich bleiben oder kleiner werden
        Anders formuliert: Die Länge der Summe zweier Vektoren ist kleiner oder gleich der Summe der Längen der beiden Vektoren.
    - wenn man zwei Vektoren addiert, kann die Gesamtlänge gleich bleiben oder größer werden
        Anders formuliert: Die Länge der Summe zweier Vektoren ist größer oder gleich der Summe der Längen der beiden Vektoren.
    - wenn man zwei Vektoren addiert, kann die Gesamtlänge gleich bleiben, kleiner werden oder größer werden
        Anders formuliert: Die Länge der Summe zweier Vektoren ist gleich, kleiner oder größer der Summe der Längen der beiden Vektoren.
- wann bleibt die Gesamtlänge gleich? Also wann ist die Summe der Längen der beiden Vektoren gleich der Länge der Summe?
    - wenn die beiden Vektoren in die gleiche Richtung zeigen
    - wenn die beiden Vektoren in die entgegengesetzte Richtung zeigen
    - wenn die beiden Vektoren senkrecht aufeinander stehen
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (9, 1, 8, 'Koordinatenvektor TODO', 'Koordinaten eines Punkts: Vektor vom Ursprung zum Punkt; man kann Koordinaten als Vektor angeben', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (10, 1, 9, 'Nullvektor TODO', 'Nullvektor: Koordinaten des Ursprungs; neutrales Element der Addition; Länge 0; einziger Vektor ohne definierte Richtung, in Zahlen: 0, 0, 0', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (11, 1, 10, 'Subtraktion TODO', '- Subtraktion, verschiedene Interpretationen: Spitze anlegen und Rückwärts gehen; Vektor von Punkt A zu Punkt B;
    Vektor finden, so dass die Summe einen bestimmten Vektor ergibt
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (12, 1, 11, 'Vektor Umkehren TODO', 'auch: Vektor negieren, inverser Vektor
a+(-b) = a-b
a+(-a) = 0
Nullvektor ist sein eigener inverser Vektor
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (13, 1, 12, 'Vektoren vervielfachen TODO', '... TODO definition über Addition, dann als Zahl*Vektor schreiben
... Auswirkung auf die Zahlen: verdoppeln und verdreifachen
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (14, 1, 13, 'Skalare Multiplikation TODO', '- Verallgemeinerung: Skalare Multiplikation (Vektor mit Zahl multiplizieren)
    ... TODO erst in Zahlen, dann in Auswirkungen
    ... evtl in mehreren units
    - ganze Zahl == Vektor wiederholen
    - Vektor um den Faktor verlängern
    - Vektor um den Faktor verkürzen
    - Vektor umkehren
    - Kombination daraus
    - Multiplikation mit 0 ergibt immer den Nullvektor
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (15, 1, 14, 'Skalare Division TODO', '- Vektor durch Zahl Teilen
    gleiche Bedeutung wie Multiplikation mit Kehrwert
    Übung: Rechenaufgaben
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (16, 1, 15, 'Linearkombination TODO', '- Linearkombinationen, ohne das Wort zu benutzen
- Associativgesetz und Kommutativgesetz
- Distributivgesetze
', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (17, 1, 16, 'Vektoren im Raum TODO', '3 Komponenten', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (18, 1, 17, '(Wiederholung von früheren Dingen, vor allem Übungen, mit 3d-Vektoren)', '', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (19, 2, 0, 'Vectors from $\mathbb{R}^n$', 'In this course, we want to focus on the rules for doing calculations with vectors, and
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
', NULL, '{"type": "script"}', 'context.showExerciseSheet([
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
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (20, 2, 1, 'Notation for Vector Variables', 'We use a letter with an arrow on top to denote a variable for an unknown or arbitrary vector, like $\vec{a}$.
Letters without an arrow denote numbers. This way we can easily distinguish between them.', NULL, '{"type": "script"}', 'context.showExerciseSheet(courseLibrary.repeat(2, () => {
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
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (21, 2, 2, 'Vector Addition', 'We can add two vectors by adding their components:

$\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} + \begin{pmatrix}b_1\\b_2\\b_3\end{pmatrix} = \begin{pmatrix}a_1 + b_1\\a_2 + b_2\\a_3 + b_3\end{pmatrix}$

For example,

$\begin{pmatrix}1\\2\\0\end{pmatrix} + \begin{pmatrix}3\\-5\\1\end{pmatrix} = \begin{pmatrix}4\\-3\\1\end{pmatrix}$

In Linear Algebra 1, we showed that this has the same result as placing the start of the second 
arrow at the end of the first arrow. We now drop the idea of arrows and go with the above
formula alone. ', NULL, '{"type": "script"}', 'context.showExerciseSheet(courseLibrary.repeat(3, () => {
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
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (22, 2, 3, 'Vector Subtraction', 'We can subtract vectors in a similar way. With arrows, subtraction was useful in
several ways: It could place the _end_ of the second arrow at the end of the first
arrow, like addition but backwards. It could also find what arrow one would have
to add to a given starting arrow to reach a given result arrow, or find the arrow
from one point to another.

All these different cases did the same thing to the numbers, though:

$\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} - \begin{pmatrix}b_1\\b_2\\b_3\end{pmatrix} = \begin{pmatrix}a_1 - b_1\\a_2 - b_2\\a_3 - b_3\end{pmatrix}$

So again, we will redefine subtraction by focusing only on the formula.', NULL, '{"type": "script"}', 'context.showExerciseSheet(courseLibrary.repeat(3, () => {
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
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (23, 2, 4, 'Zero Vector', 'One thing that was of little importance with arrows was the _zero vector_ -- a vector
that, when added to any other vector, does not change it:

> $\vec{v} + \vec{0} = \vec{v}$

> $\vec{0} + \vec{v} = \vec{v}$

Unlike for arrows, the zero vector will be very important here.', NULL, '{"type": "explicit", "exercises": [{"type": "ChooseOne", "description": "We have not yet said what the zero vector looks like in numbers. But we know that it must leave the other vector alone when added. From that, there is only one possible way the zero vector can look like. What is the zero vector for the $\\mathbb{R}^3$ vector space?\n\nHint: remember the formula for addition.", "rightAnswer": "$\\begin{pmatrix}0\\\\0\\\\0\\end{pmatrix}$", "wrongAnswers": ["$\\begin{pmatrix}0\\\\0\\end{pmatrix}$", "$\\begin{pmatrix}1\\\\0\\\\0\\end{pmatrix}$"]}]}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (24, 2, 5, 'Subtracting the Zero Vector', 'The zero vector has a similar effect in subtraction, but it''s a bit more complex.
Remember the formula for subtraction and work it out yourself!', NULL, '{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{v} - \\vec{0} = \\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{0} - \\vec{v} = \\vec{v}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$\\vec{v} - \\vec{v} = \\vec{0}$", "rightAnswer": true}]}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (25, 2, 6, 'Inverse Vector', 'The last exercise has shown that when we subtract a vector from itself, we get the zero vector.
Can we also find a vector to _add_ to get the zero vector? Yes, and it is called the _inverse_ vector.
The inverse to $\vec{a}$ is written as $-\vec{a}$ and is obtained by negating all the numbers in $\vec{a}$:

> $-\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} = \begin{pmatrix}-a_1\\-a_2\\-a_3\end{pmatrix}$

because then,

> $\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix} + (-\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix}) = \begin{pmatrix}a_1 + (-a_1)\\a_2 + (-a_2)\\a_3 + (-a_3)\end{pmatrix} = \begin{pmatrix}0\\0\\0\end{pmatrix} = \vec{0}$
', NULL, '{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$(-\\vec{v}) + \\vec{v} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$(-\\vec{v}) = \\vec{v}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct?\n\n$-\\vec{0} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$ and $\\vec{b}$?\n\n$\\vec{a} + (-\\vec{b}) = \\vec{a} - \\vec{b}$", "rightAnswer": true}]}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (26, 2, 7, 'Multiplying a Vector by a Scalar', 'With numbers, we started with multiplication as a shorthand for repeated addition:

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
', NULL, '{"type": "script"}', 'context.showExerciseSheet(courseLibrary.repeat(3, () => {
  const s = courseLibrary.randomComponent(2);
  const a1 = courseLibrary.randomComponent(5);
  const a2 = courseLibrary.randomComponent(5);
  const a3 = courseLibrary.randomComponent(5);
  return courseLibrary.simpleR3Exercise(
    `What is $${s}\\cdot${courseLibrary.col(a1, a2, a3)}$?`,
    s*a1, s*a2, s*a3,
  );
}));
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (27, 2, 8, 'Multiplication Rules', 'Let''s find out more about the rules of multiplication. Again, remember the formula and
think about its consequences.', NULL, '{"type": "explicit", "exercises": [{"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$0\\cdot\\vec{v} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all scalars $s$?\n\n$s\\cdot\\vec{0} = \\vec{0}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$1\\cdot\\vec{v} = \\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{v}$?\n\n$-1\\cdot\\vec{v} = -\\vec{v}$", "rightAnswer": true}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$, $\\vec{b}$ and scalars $x$, $y$?\n\n$(x + y)\\cdot(\\vec{a} + \\vec{b}) = x\\cdot\\vec{a} + y\\cdot\\vec{b}$", "rightAnswer": false}, {"type": "ChooseYesNo", "description": "Is the following correct for all vectors $\\vec{a}$, $\\vec{b}$ and scalars $x$, $y$?\n\n$(x + y)\\cdot(\\vec{a} + \\vec{b}) = x\\cdot\\vec{a} + x\\cdot\\vec{b} + y\\cdot\\vec{a} + y\\cdot\\vec{b}$", "rightAnswer": true}]}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (28, 2, 9, 'Dividing a Vector by a Scalar', 'Can we divide a vector by a scalar? What would be the meaning of that?

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

', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (29, 2, 10, 'Dividing a Vector by a Vector', 'Can we divide a vector by a vector?

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
actually useful. But for now, we''ll turn to different things.', NULL, '{"type": "explicit", "exercises": []}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (30, 2, 11, 'Parallel Vectors', 'With arrows, we could tell whether they are _parallel_, that is, point into the same direction.
We can do the same with purely numeric vectors, even though "direction" isn''t really a concept
we are dealing with. The key is that we can make a vector longer or shorter (without changing
its direction) by multiplying it with a scalar, so parallel vectors are those where we can make
one vector equal to the other by multiplying it with a scalar.
', NULL, '{"type": "script"}', 'context.showExerciseSheet(courseLibrary.repeat(2, () => {
  const s = courseLibrary.randomInt(2) + 2;
  const a1 = courseLibrary.randomComponent(5);
  const a2 = courseLibrary.randomComponent(5);
  const a3 = courseLibrary.randomComponent(5);
  return courseLibrary.simpleR3Exercise(
    `Which vector is parallel to $${courseLibrary.col(a1, a2, a3)}$?`,
    s*a1, s*a2, s*a3,
  );
}));
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (31, 2, 12, 'Vectors in Opposite Direction', 'With arrows, we had some freedom in whether we would call two vectors \"parallel\" if they point into opposite directions.', NULL, '{"type": "explicit", "exercises": [{"type": "ChooseOne", "epilogue": "Flipping the direction of an arrow is the same as inverting the vector, which is again the same as multiplying by -1:\n\n> $-\\vec{v} = (-1)\\cdot\\vec{v}$\n\nSo the decision whether we want to consider two vectors parallel if they point into opposite directions is the same decision whether we want to allow negative scalars to make one vector equal to the other. ", "description": "Here are two vectors whose arrows point into opposite directions:\n\n> $\\begin{pmatrix}1\\\\2\\\\0\\end{pmatrix}$ and $\\begin{pmatrix}-2\\\\-4\\\\0\\end{pmatrix}$\n\nWhat scalar must the first vector be multiplied with to get the second vector?", "rightAnswer": "-2", "wrongAnswers": ["2", "1", "-1"]}]}', '');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (4, 1, 3, 'Abstand zwischen zwei Punkten', 'Bei zwei Punkten ist es oft interessant, wie weit sie voneinander entfernt sind. Dabei sprechen wir beim _Abstand_
von der Länge der _kürzesten_ Verbindung zwischen den beiden Punkten, also ohne Umweg -- bei einer Karte wäre das
die "Luftlinie". Für jede andere Verbindung müsste man den genauen Weg kennen, um von dessen Länge zu sprechen,
aber der Abstand ergibt sich alleine aus den beiden Punkten.

In manchen Fällen kann man den Abstand direkt an den Koordinatenachsen ablesen:

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  context.fillStyle = "black";
  const pointOptions = { font: "0.5px sans-serif", labelX: 0.2, labelY: 0.5 };
  point(context, 1, 2, "(1|2)", pointOptions);
  point(context, 5, 2, "(5|2)", pointOptions);
  
  context.strokeStyle = "black";
  context.lineWidth = 0.07;
  context.setLineDash([0.1, 0.1]);
  context.beginPath();
  context.moveTo(1, 2);
  context.lineTo(5, 2);
  context.stroke();
  
  context.font = "0.4px sans-serif";
  showText(context, 2, 2.1, "Abstand: 4");

</draw-canvas>

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  context.fillStyle = "black";
  const pointOptions = { font: "0.5px sans-serif", labelX: 0.2, labelY: 0.5 };
  point(context, 1, 2, "(1|2)", pointOptions);
  point(context, 1, 4, "(1|4)", pointOptions);
  
  context.strokeStyle = "black";
  context.lineWidth = 0.07;
  context.setLineDash([0.1, 0.1]);
  context.beginPath();
  context.moveTo(1, 4);
  context.lineTo(1, 2);
  context.stroke();
  
  context.font = "0.4px sans-serif";
  showText(context, 1.1, 2.8, "Abstand: 2");
  
</draw-canvas>

Im allgemeinen Fall muss man den Abstand entweder messen oder aus den Koordinaten der Punkte berechnen. Letzteres
geht gerade deshalb, weil der Abstand ja nur von den beiden Punkten bzw. dessen Koordinaten abhängt und
sonst von nichts. Die genaue Formel zum Berechnen wird später erläutert.
', NULL, '{"type": "script"}', '(async () => {
  context.showExerciseSheet([
    {
      description: "Setze den zweiten Punkt an verschiedene Stellen und beobache, welchen Abstand er jeweils vom ersten Punkt hat.",
      type: "Script",
      script: (context) => {
        let x0 = 2, y0 = 1, x1 = 4, y1 = 2;
        let matrix = new DOMMatrix();
        const canvasState = createPassiveCanvas({
          onRender: (state) => {
            const g = state.context;
            g.resetTransform();
            g.clearRect(0, 0, state.canvas.width, state.canvas.height);
            setupCoordinateGridCanvas(g, -4, 4, -4, 4, { greyedOut: state?.greyedOut ?? state?.freeze });
            matrix = g.getTransform();
            g.fillStyle = g.strokeStyle = "#0c0";
            point(g, x0, y0);
            g.fillStyle = g.strokeStyle = "blue";
            point(g, x1, y1);
            g.moveTo(x0, y0);
            g.lineTo(x1, y1);
            g.stroke();

            const dx = x1 - x0, dy = y1 - y0;
            const distanceExact = Math.sqrt(dx * dx + dy * dy);
            const distance = Math.round(distanceExact * 100) / 100;
            
            g.save();
            g.fillStyle = g.strokeStyle = "red";
            g.font = "0.6px sans-serif";
            g.translate((x0 + x1) / 2, (y0 + y1) / 2);
            g.scale(0.5, -0.5);
            g.fillText(distance, 0.2, 0.6);
            g.restore();
            
            if (state.result !== undefined) {
              showResultOverlay(g, state.result);
            }
          },
          onClick: (state) => {
            if (state.freeze) {
              return false;
            }
            const screenSpacePoint = new DOMPoint(state.inputPosition.x, state.inputPosition.y, 0, 1);
            const transformedPoint = matrix.inverse().transformPoint(screenSpacePoint);
            x1 = Math.round(transformedPoint.x);
            y1 = Math.round(transformedPoint.y);
            return true;
          },
        });
        const $button = $("<button>weiter</button>");
        $button.on("click", () => {
          canvasState.freeze = true;
          canvasState.redraw();
          context.reportResult(true);
        });
        $(context.element).append(canvasState.root).append($button);
      },
    },
    ...repeat(2, (iteration) => {
      const x1 = 1, y1 = -1;
      const x2 = iteration == 0 ? 2 : 1;
      const y2 = iteration == 0 ? -1 : 2;
      const distance = iteration == 0 ? 1 : 3;

      const canvasState = createPassiveCanvas({
        onRender: (state) => {
          const g = state.context;
          g.resetTransform();
          g.clearRect(0, 0, state.canvas.width, state.canvas.height);
          setupCoordinateGridCanvas(g, -4, 4, -4, 4);
          g.fillStyle = g.strokeStyle = "blue";
          point(g, x1, y1);
          point(g, x2, y2);
        },
      });
      canvasState.redrawImmediately();
      return {
        description: `Welchen Abstand haben die beiden Punkte?\n\n![image](${canvasState.toDataUrl()})`,
        type: "FillInTheBlanks",
        stencil: "((:distance))",
        variables: [
          {
            "name": "distance",
            "type": "text",
            "expected": "" + distance,
          },
        ],
      };
    }),
  ]);
})();
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (5, 1, 4, 'Eigenschaften der Kürzesten Verbindung', 'Der Abstand zwischen zwei Punkten ist davon abhängig, wie die beiden Punkte _zueinander_ liegen, aber nicht, wo sie als Paar insgesamt liegen.
Zwei andere Punkte, die ganz woanders liegen, können den gleichen, einen größeren oder einen kleineren Abstand haben. Abstände werden so
_vegleichbar_.

Eine weitere Eigenschaft, die unabhängig vom Ort vergleichbar ist, ist die _Richtung_ der kürzesten Verbindung. Wie schon beim Abstand können
zwei andere Punkte, die ganz woanders liegen, eine kürzeste Verbindung mit der selben Richtung haben:

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  
  context.fillStyle = context.strokeStyle = "red";
  point(context, 1, 1);
  point(context, 2, 3);
  context.setLineDash([]);
  context.beginPath();
  context.moveTo(1, 1);
  context.lineTo(2, 3);
  context.stroke();
  
  context.fillStyle = context.strokeStyle = "blue";
  point(context, 4, 2);
  point(context, 6, 6);
  context.setLineDash([0.1]);
  context.beginPath();
  context.moveTo(4, 2);
  context.lineTo(6, 6);
  context.stroke();

</draw-canvas>

Die Richtung ist auch unabhängig vom Abstand. Zum Beispiel ist die Richtung der Verbindung vom grünen Punkt zum roten Punkt die gleiche wie
zum blauen Punkt, aber der Abstand ist ein anderer. Die Verbindung vom grünen Punkt zum gelben Punkt dagegen hat den gleichen Abstand, aber
eine andere Richtung:

<draw-canvas>
  
  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  
  context.fillStyle = context.strokeStyle = "red";
  context.setLineDash([]);
  context.beginPath();
  context.moveTo(1, 1);
  context.lineTo(2, 3);
  context.stroke();
  
  context.fillStyle = context.strokeStyle = "blue";
  context.setLineDash([0.1]);
  context.beginPath();
  context.moveTo(1, 1);
  context.lineTo(3, 5);
  context.stroke();
  
  context.fillStyle = context.strokeStyle = "#cc0";
  context.setLineDash([]);
  context.beginPath();
  context.moveTo(1, 1);
  context.lineTo(3, 2);
  context.stroke();
  
  // draw the points last so they aren''t covered by the lines
  context.fillStyle = context.strokeStyle = "green";
  point(context, 1, 1);
  context.fillStyle = context.strokeStyle = "red";
  point(context, 2, 3);
  context.fillStyle = context.strokeStyle = "blue";
  point(context, 3, 5);
  context.fillStyle = context.strokeStyle = "#cc0";
  point(context, 3, 2);

</draw-canvas>

Der Begriff _Vektor_ fasst diese beiden Eigenschaften der kürzesten Verbindung -- Länge und Richtung -- zusammen. Ein Vektor ignoriert damit,
wo die beiden Punkte als Paar insgesamt liegen. Zwei Vektoren werden als _gleich_ angesehen, wenn sie die gleiche Länge und die gleiche
Richtung haben, auch wen sie an unterschiedlichen Orten liegen. 
', NULL, '{"type": "script"}', 'const x1 = 1, y1 = 1, x2 = 2, y2 = 3;
const disambiguationDelta = 0.1;
const epsilon = 0.01;

function buildExercise(x3, y3, x4, y4, extraOptions1, extraOptions2) {
  const canvasState = createPassiveCanvas({
    onRender: (state) => {
      const g = state.context;
      g.resetTransform();
      g.clearRect(0, 0, state.canvas.width, state.canvas.height);
      setupCoordinateGridCanvas(g, -4, 6, -4, 6);

      let _y1 = y1, _y2 = y2, _y3 = y3, _y4 = y4;      
      const m12 = (y2 - y1) / (x2 - x1);
      const m34 = (y4 - y3) / (x4 - x3);
      if (Math.abs(m12 - m34) < epsilon && Math.abs((y1 - x1 * m12) - (y3 - x3 * m34)) < epsilon) {
        if (Math.min(x3, x4) + epsilon < Math.max(x1, x2) && Math.max(x3, x4) > Math.min(x1, x2) + epsilon) {
          _y1 += disambiguationDelta;
          _y2 += disambiguationDelta;
          _y3 -= disambiguationDelta;
          _y4 -= disambiguationDelta;
        }
      }
      arrow(g, x1, _y1, x2, _y2, {color: "#0c0", ...(extraOptions1 ?? {})});
      arrow(g, x3, _y3, x4, _y4, {color: "blue", bodyDash: [], ...(extraOptions2 ?? {})});
    },
  });
  canvasState.redrawImmediately();
  return {
    description: `Sind die beiden Vektoren gleich?\n\n![image](${canvasState.toDataUrl()})`,
    type: "ChooseYesNo",
    rightAnswer: (x2 - x1) == (x4 - x3) && (y2 - y1) == (y4 - y3),
  };  
}

context.showExerciseSheet([
  buildExercise(2, 0, 3, 2),
  buildExercise(2, 0, 4, 1),
  ...getShuffled(repeatMultiple(3, () => [
    buildExercise(1, 1, 3, 2),
    buildExercise(2, 1, 2, 3),
    buildExercise(1, 1, 2, 3, {}, {headDash: []}),
    buildExercise(2, 0, 3, 2),
    buildExercise(1, 1, 0, -1),
    buildExercise(2, 3, 1, 1, {}, {headDash: []}),
    buildExercise(3, 5, 2, 3, {}, {headDash: []}),
    buildExercise(4, 4, 2, 3, {}, {headDash: []}),
    buildExercise(1, 1, 3, 5),
    buildExercise(0, -1, 2, 3),
  ]))
]);
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (2, 1, 1, 'Koordinaten', 'Ein Punkt in einer Zeichnung ist gut sichtbar. Allerdings müsste man immer noch jeden Punkt von Interesse
einzeichnen. Sobald man zwei oder mehr Punkte hat, wird es unübersichtlich: Welcher Punkt ist jetzt z.B. in
einem Text gemeint? Man müsste mit dem Finger auf den Punkt zeigen, Pfeile malen, oder aber die Punkte benennen.

Die bessere Lösung bieten _Koordinaten_. Damit können wir die Position eines Punkts durch Zahlen angeben. Dazu
werden zunächst _Koordinatenachsen_ festgelegt. Eine Achse zeigt nach rechts, die andere nach oben.

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });

</draw-canvas>

Der Kreuzungspunkt der beiden Achsen ist der _Ursprung_. Man kann die Position eines Punkts dann durch zwei
Zahlen angeben: Die erste Zahl gibt an, wie viele Einheiten man vom Ursprung aus nach rechts gehen muss, die andere
Zahl, wie viele Einheiten man nach oben gehen muss. Die Achsen legen dabei fest, was "nach rechts" und "nach oben"
genau bedeutet. Folgender Punkt hat zum Beispiel die Koordinaten "1 nach rechts, 3 nach oben":

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  context.fillStyle = "black";
  point(context, 1, 3);

</draw-canvas>

Dafür gibt es verschiedene Kurzschreibweisen, z.B. (1 | 3) und (1, 3) und (1; 3). Alle drei Schreibweisen sagen
das gleiche aus. Gerade die Schreibweise mit Komma hat allerdings die Gefahr der Verwechslung mit dem Dezimalkomma:
Ist der Punkt (1,5,5) jetzt "1,5 nach rechts, 5 nach oben" oder "1 nach rechts, 5,5 nach oben"? In der
Handschrift lässt sich die Schreibweise mit Trennstrich ebenso leicht schreiben, deshalb benutzen wir sie hier:

<draw-canvas>

  setupCoordinateGridCanvas(context, -0.6, 6, -0.6, 6, { clipNegative: true });
  
  context.strokeStyle = "#0f0";
  context.lineWidth = 0.1;
  context.beginPath();
  context.moveTo(1, 0);
  context.lineTo(1, 6.5);
  context.moveTo(0, 3);
  context.lineTo(6.5, 3);
  context.stroke();
  
  context.fillStyle = "black";
  point(context, 1, 3, "(1|3)");

</draw-canvas>
', NULL, '{"type": "script"}', 'function myCreateCanvas(showLabels, showCoordinateGuides) {
  let matrix = new DOMMatrix();
  const canvasState = createPassiveCanvas({
    onRender: (state) => {
      const g = state.context;
      g.resetTransform();
      g.clearRect(0, 0, state.canvas.width, state.canvas.height);
      setupCoordinateGridCanvas(g, -0.6, 6, -0.6, 6, { clipNegative: true, greyedOut: state?.greyedOut ?? state?.freeze });
      matrix = g.getTransform();
      g.fillStyle = g.strokeStyle = "blue";
      
      g.strokeStyle = "#0f0";
      g.lineWidth = 0.1;
      g.beginPath();
      g.moveTo(canvasState.currentX, 0);
      g.lineTo(canvasState.currentX, 6.5);
      g.moveTo(0, canvasState.currentY);
      g.lineTo(6.5, canvasState.currentY);
      g.stroke();
      
      point(g, canvasState.currentX, canvasState.currentY, canvasState.showLabels ? `(${canvasState.currentX}|${canvasState.currentY})` : undefined);
      if (state.result !== undefined) {
        showResultOverlay(g, state.result);
      }
    },
    onClick: (state) => {
      if (state.freeze) {
        return false;
      }
      const screenSpacePoint = new DOMPoint(state.inputPosition.x, state.inputPosition.y, 0, 1);
      const transformedPoint = matrix.inverse().transformPoint(screenSpacePoint);
      transformedPoint.x = Math.round(transformedPoint.x);
      transformedPoint.y = Math.round(transformedPoint.y);
      if (transformedPoint.x >= 0 && transformedPoint.y >= 0) {
        canvasState.currentX = transformedPoint.x;
        canvasState.currentY = transformedPoint.y;
      }
      return true;
    },
  });
  canvasState.showLabels = showLabels;
  canvasState.currentX = -10;
  canvasState.currentY = -10;
  return canvasState;
}

(async () => {
  context.showExerciseSheet([
    {
      description: "Setze den Punkt an verschiedene Stellen und beobache, welche Koordinaten er jeweils hat.",
      type: "Script",
      script: (context) => {
        const canvasState = myCreateCanvas(true, true);
        const $button = $("<button>weiter</button>");
        $button.on("click", () => {
          canvasState.freeze = true;
          canvasState.redraw();
          context.reportResult(true);
        });
        $(context.element).append(canvasState.root).append($button);
      },
    },
    ...repeat(2, () => {
      const targetX = randomInt(3) + 1;
      const targetY = randomInt(3) + 1;
      return {
        description: `Setze den Punkt an die Position (${targetX}|${targetY}).`,
        type: "Script",
        script: (context) => {
          const canvasState = myCreateCanvas(false);
          const $button = $("<button>fertig</button>");
          $button.on("click", () => {
            canvasState.showLabels = true;
            canvasState.freeze = true;
            canvasState.redraw();
            canvasState.result = canvasState.currentX === targetX && canvasState.currentY === targetY;
            context.reportResult(canvasState.result);
          });
          $(context.element).append(canvasState.root).append($button);
        },
      };
    }),
    ...await repeatAsync(2, async () => {
      const canvasState = myCreateCanvas(false);
      canvasState.currentX = randomInt(3) + 1;
      canvasState.currentY = randomInt(3) + 1;
      canvasState.freeze = true;
      canvasState.greyedOut = false;
      canvasState.redrawImmediately();
      return {
        description: `Welche Koordinaten hat der Punkt?\n\n![image](${canvasState.toDataUrl()})`,
        type: "FillInTheBlanks",
        stencil: "( ((:x)) | ((:y)) )",
        variables: [
          {
            "name": "x",
            "type": "text",
            "expected": "" + canvasState.currentX,
          },
          {
            "name": "y",
            "type": "text",
            "expected": "" + canvasState.currentY,
          },
        ],
      };
    }),
  ]);
})();
');
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (8, 1, 7, 'Vektoraddition in Zahlen TODO', '... (wie begründen?) TODO
Übung
- rechenübungen
', NULL, '{"type": "script"}', '');


--
-- Name: Author_id_seq; Type: SEQUENCE SET; Schema: edu2; Owner: -
--

SELECT pg_catalog.setval('edu2."Author_id_seq"', 1, true);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: edu2; Owner: -
--

SELECT pg_catalog.setval('edu2."Course_id_seq"', 3, true);


--
-- Name: Image_id_seq; Type: SEQUENCE SET; Schema: edu2; Owner: -
--

SELECT pg_catalog.setval('edu2."Image_id_seq"', 7, true);


--
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: edu2; Owner: -
--

SELECT pg_catalog.setval('edu2."Unit_id_seq"', 31, true);


--
-- PostgreSQL database dump complete
--

