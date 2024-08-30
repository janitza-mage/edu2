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

point = (context, x, y, label = undefined, options = {}) => {
    context.beginPath();
    context.arc(x, y, options.size ?? 0.15, 0, 2 * Math.PI);
    context.fill();
    if (label !== undefined) {
        context.font = options.font ?? "0.6px sans-serif";
        context.translate(x, y);
        context.scale(1, -1);
        context.fillText(label, 0.2, 0.6);
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

');


--
-- Data for Name: Image; Type: TABLE DATA; Schema: edu2; Owner: -
--

INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (1, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda79300000b2549444154789ceddd7b90966519c7f1efee2287950445e4902daba299041109e6646aa58e66167f141eb2a03f2ccb66c206a3c64ee31f76d24c27b5742427a71c3b98e3795213b383a7c07153c7034a68ad4a080a2ca82cf447d7da3bdb72b3e073bdfb2e7e3f33efeceeb3cf3ed70bbbbfbdefe779efe75a682c43c78e1dbb01d8126f876614e9e8e858dcd1d1b1a5a3a36371c6f1adb1f3d468ce7a423ba01db87be5ca95c301e2edddb15d1a108d1290d9c0126056afedb362fbec017a5e7a931be8800c01be0b5c0bec0e307af4e85701c68c19f30ab025b6ff0ef869d6944bda9a810ec830e004a0097819983371e2c42e8071e3c66d8891e3c5d8f7306097817dba7ab319e880ac07e6008b817701bfeef5f9eb81f7c4e7e7c4fe52dd0c19e827003c0c7ca0f0f9e5dbf8bc9466a04710a9a16507640a702bd005ac06ae48ae27552a33206f05ee02ee8fa04c03ae4eac27552ef31c647e84e31b35db9e49ac2755ae29f1d877c409f6bec074e031e02bc01ffbd8773af02380d6d6d6f77575750d193972e496b6b6b69700162e5cb86cc68c19eb2a7c6ed38151c04bc083151ed71a3b598dcc803c0ab401c703f7006700df04de0e3cd76bdf23813bb776a0458b163173e6ccc4a72af52d738ab52a92dab338ec7c60017004704daf7dd7c4f94a9f23484b4bcb32c011c41a8d5e63bb5cdec7497967bce0b755071d74d06a604bbc4dd1c8ab47add1583532af625d1acb48de1f4b44be144b4bee4aac29552a738ab504f802f0336022b034ce479e4fac29552a7ba9c9cfe3210d4a2e35910a0c88546040a4020322151810a9c080480506442a3020528101910a0c88546040a4020322151810a9c080480506442ac80cc8e9d19dbdf6313fb19e54b9ec1ba66e078e4eae21a5718a251564f6c53a1df80eb036faf2de049cbb95f63d368eb34643d6c80cc874604fe0696032f043e021e0e43ef6b5719c1a52e639486d4a97458793dba2f5cf2bbdf6b5719c3576861a6fc8a1c026604469271bc759a3916a648e2073624af51cb01f7021700bb021b1a654a9ccab58b3a2c3fbf3f1576c1f00e625d6932a9739822c88873468f93a88546040a4020322151810a9c080480506442a3020528101910a0c88546040a4020322151810a9c080480506442a30205241bd02f2ab681c77709dea4995a847403e0aec55873a52e5b203b21b701e7046721d2945665f2c804b8067a327d6066066dc9bde9b8de3acd190353203f25ee0b238ef68de46406c1ca78694d5b461187005f039e05560f836f6b7719c3576861afd3619e8065e8cc7eab88af512b0b0f485368eb34623d5c81a419e8abebc3d86019dc06ce09ea49a52e5b202b239468d1e3d53acb57656d46092fd07747a6cacc31533a9722e35910a0c88546040a4020322151810a9c080480506442a3020528101910a0c88546040a4020322151810a9c080480506442ac80cc8894007b03e6ebbbd01d82fb19e54b9cc807400a7026dc0b468fff38bc47a52e532ef287ca4e6fd6660053027b19e54b9ecdb600f067e1f4d1b8601670117f4b19f8de3acd19035b20332249e543b3017b80ef8431ffbd9384e0d29bb69c3266055cde321606fe0e55efbd938ce1a3b438d37649f681eb77f69271bc759a3916a645ec53a039801ec014c8946d64f02cb126b4a95ca9c624d04ae0526c4f4ea6ee0d8682a270d0a9901393b1ed2a0e55213a9c080480506442a3020528101910a0c88546040a4020322151810a9c080480506442a3020528101910a0c88546040a482cc809c06dc178de33a81cbe39e6069d0c80cc8dec039710ffa71c02ce0c2c47a52e532ef28fc56cdfbff022e061624d6932a97dd17abd655400b704a1f9fb3719c351ab246bd02f2c908c0bba3476f6f368e5343ca6e1c47f4e3fd2170cc56c2818de3acb193d4d86e27032f447fac7eb1719c351aa946e60872127011f0616049621d294de665deb3813de3b5902df1589b584faa5ce6083235f1d8525db8d4442a3020528101910a0c88546040a4020322151810a9c080480506442a3020528101910a0c88546040a4020322151810a92033208702b703abe366a9e189b5a4149901d918ad7e3e9f58434a957947e1d2784c4fac21a5aa475face911941131aa6c6d1f1bc759a3e16a344a406c1ca786548fc671fd61e3386bec0c3576c8f4edb98a65e3386b34520d5f07910a320372708c1c4be3e30df1f1c8c49a52a532cf411ea8f39f57902ae7144b2a3020528101910a0c88546040a4020322151810a9c080480506442a3020528101910a0c88546040a4020322fdcfaec0d0da0d0644faaf0381bf02dfabdd987d4ffa99c002600fe00ee034a0b3f4051b376e6ca97d9b61c9922523bbbbbb69696949bb79cb1a83aec6a5c054e09dd11fe1baace7d2e3a8b841feb008c86f801bb7f545adadadaf015be26d8a7adcf76e8d4157a30df877dcf5ba1ad887e429d667a3b3e29f801781af02c7016f4bac29eda815c0bc08c868e01a6068e62db10f4533b84535dbd6001f8f9ebdb55e6f1cd7dcdc7cf8e6cd9b9b9a9a9a183162c42680f1e3c76f183e7c7877554f6cc58a15a3d6ad5bd754db5aa86ad6189c353a3b3b47ac5ebd7a18c0d8b163b7d6c7ad12cf029fe8b56d3970721ffb1e19c9f5e1a3a11e9927e9ab80dd7a6ddb1d78a18f7d5f6f1cd7d3e0abb9b9794bcfa851f508b27cf9f2915d5d5d435a5b5b37b5b7b757d990ce1a83bc463d47906b808b6a3ede17e8eec739c8e2486f5a13316b58632b3e026c8efdee0386669ea45f067c0a3824469273819b8167126b4a3baa0db8325a55ad014e045ecd2e3a3fce453600d703e3fbf135d3e39c24f3cf2658c31abddd1923c7666076e2f39006a503e3caeb0503fd44a446f57f6bb11aad35684b0c819b808e18eeaa36129806bc06dc9f707c80897131a2335e80ca30099810f3e5c793feaf7a4c03c694fe86cb0e9a0a8cebb5ed5e606dc57500c60293e3eaeae309c74fd7063c063c11af972c05f6aab8c6797125ede5589856b59678deeb8087e31b7d73fc66aad2ad716ef737e079e0ef407bc5357a4c8a2543193fb45703ff8c3ece3d8f032aaed10c9c1fe7c18fc42fadf32aae51175702bf8d51ad05b80db8b0e21afbc7bab0f9490169064e0176898fc7024f0167575ca7b5e6fd26e097bd562c54e97ae0278901f97ac2716b9d093c192f33f4d8bdbf5fdc28cbdd9be3b2dac57125a11bb8247ed8aaf444ac0bcbb2397e587b165aae8cebe97b575ca72bd60b1d007c089892f4bd3c35567c67ae6c1d1a539f1149c7ff22704e8c82538161b11871509910c1a87d11714a6ccb58029d3582f43631e6bcc7261cfb7460594c1dee4a58043a06783a56b51e9b3882ac8bd7c636c5e2d6d67e7c5d7f0d8f5fb637c448be24a6a41facb0465d4c8e30d49e73ec1bdb7a9fc455a11e01790bf017e0c7c97546c5a87574c5c7bd0af872bc9f1590b69a916f9f3807fd7e85c71f173f4337d6dcfbf4b538ef6994d953bfec1aff9077d46c3b245ec9ccf88764076437e0cfc01575fa46cc011eadf07847c4e87440fca29a07ac8ff7b3a642c4f7e5810a8fd712d3ddb935dbdae3676d527f0ed0287fe5767d5cf539bce61b7d44fc67655ebecc302aae323d1a7750d6e3f9b7d75c18a842cfa87d4bbc6d8de9ca6d715e786f85b56ab5c794b42add710e38a1665bcf743ef35c34c5bc58e97b52247e4dc24bfe93e24ec74be292df51c0ac0a8f3f34be210f02c7c4f18faa7809c5aec04d11bed9c0b7631ebfb0c21abd654cb186c695cb4fc7bfe307316338bee23a27c49d8273e3d84bb7e78a5fa38c20c47fd6a608c866e03309574f66c59d8ec43c7461bc68745f45c71f11574b00ceaad97e4f857f9bfb95b8bfffe898ca75c6ffd94d151dbf2fab125e24ec8e69dcc76284fa47dc9e5dd5f7a2c70df1cb776e4cb916c5fde7922449922449922449922449922449922449922449922449caf21fa373ddf53f627e150000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (2, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda79300000c1f49444154789ceddd7b705c6519c7f1ef266d6e445a5296a611b7010a22b5180b291791624b19b0a2fd430b45b0f50f1485198b53ac4ebd0d7fe08d8b305c14a69111a58317748000237428a2582ea6c84a192e851ad014629342d3a4a5b9f807cfe2ba266fd3f67d764fc2ef33b3b3c9c9c9794e2ebfbcef397bce1348968a743add070cd9738547916c36bb2e9bcd0e65b3d9751edb578df153a3cc6b87f64123f04867676715803d3f62cb454a2229015904b401730a96cfb1e58b4ab45ff22e57ea804c00be0fdc091c043079f2e4b700a64c99b20b18b2e5bf037eea35e5121949a90352099c0da4803781c50d0d0dbd0053a74eedb391a3cbd63d059858dadd95779b52076407b01858077c08f875c1c7ef028eb38f2fb6f5458a6642a977007806f858e0e39bf7f0711137a51e414412cd3b203381fb815ea01b58ed5c4f242acf80bc17781878c282722cb0c6b19e48749ec720cb2d1cdfca5bf68a633d91e8528edb5e6b07d887034dc073c0d7803f0eb36e13f063809a9a9a8ff4f6f64ea8adad1dca64326f00ac5cb972d3ecd9b37b22ee5b1330097803782ae27655639cd5f00cc8b340065808ac072e06be0dbc1fd852b0ee69c043236da8a5a585e6e666c75d15199ee7146bab25357771d855c00a602e7047c1badbec7865d811a4bcbc7c13a0114435925e63afdc32cc417987bde037a2638e39a61b18b2671749be7a54359255c3f32cd64d7619c947ed1291afd8a5250f3bd61489ca738ad5067c19f819d0006cb0e391d71c6b8a44e57da9c9cfed213226e95213910005442440011109504044021410910005442440011109504044021410910005442440011109504044021410910005442440011109f00cc845d69d3dffb1dcb19e4874de374c3d082c70ae21e246532c9100cfbe581701df03b65b5fde56e08a11daf7a8719c6a24b28667409a808381978119c0d5c0d3c09261d655e3384924cf6390fc946eb20e270f58eb9f5d05ebaa719c6a8c871afbe524a01fa80eada4c671aa91a41a9e23c8629b526d018e00ae05ee03fa1c6b8a44e579166b8e75787fcdfe8bed93c032c77a22d1798e202bec213266e975109100054424400111095040440214109100054424400111095040440214109100054424400111095040440214109100054424400111092856407e658de38e2f523d91288a11904f028714a18e4874de013910b812b8d8b98e880bcfbe58003702af5a4fac3ea0d9ee4d2fa4c671aa91c81a9e013911b8d98e3bcaf61010358e9344f26ada5009ac06be08bc0554ed617d358e538df15063d466000340973dbaed2cd61bc0cad027aa719c6a24a986d708f292f5e5cda9043a8045c07aa79a22d1790564d0468d9cdc146bbb3a2bca58e2fd0f74727616e18c994874bad4442440011109504044021410910005442440011109504044021410910005442440011109504044021410910005442440011109504044023c03720e900576d86db777034738d61bb5cecece89d96c96cecece89a5de174936cf1ba6b2c0f9d6f6a71a5805fcd2ba9d944a1d70fdfcf9f34f1e1a1a22954a9d0cdc0e5c622116f91f9e01d998f77619d00e2c76ac371abf00ce1a1a1a02c09e9758b78b8525de374920efdb608f07fe604d1b2a81cb806b8659cfbd715c7b7b7be5c2850b471cbd5a5b5bd76732995dfb53a3c0786965f3aeaee17d4ffa53c0914023b014f8db08eb4d06e602f4f6f602d0d3d393dab871e36480818181e3f67747babac233a8aeaeae133399ccfe9619cea4dcd7e648359c6a7807a41fd89af7781a381478b3603df7c67175757595a1e39fbababaf5804610d52899c3ac79dc91a1959c1bc7dd6bfb50f8688d5d28c9cdd05463f43c4ff35e0cccb6334733ad91f58bc026c79a7b723eb026957afbd0cb9ed7001794709f24c13ca7580dc09dc0349b5e3d029c694de54aa50b386feddab5d3b76cd972727d7dfda3f3e6cd3baf84fb2309e7199055f6489c743abd3b9d4e03ec2ef5be48b2e95213910005442440011109504044021410910005442440011109504044021410910005442440011109504044021410910005442440011109f00cc885c0e3d638ae03b8c5ee091619333c03722870b9dd837e163007b8d6b19e48749e77147e27efed7f0137002b1ceb8944e7dd382edf6d403930dc3de0ee8de386a9371edacca886738d6205e4b316800f5bafde42a7010f8df4c92d2d2d343737fbeea1c830bc1bc761fd78af06ce18211c14a3715c81c4fec5528d315d63af2d015eb7fe58a3e2dc380e12dea84c359255c373043917b80ef838d0e65847c48de769de55c0c1f65a48aec5e776c77a22d1798e20b31cb72d5214bad4442440011109504044021410910005442440011109504044021410910005442440011109504044021410910005442440011109504044023c037212f020d06d374b5539d61271e119909dd6eae74b8e35445c79de51b8c11e4d8e35445c15a32f569305a5da469591d651e338d5485c8da404448de324918ad1386e34d4384e35c6438d7dd2b43767b1d4384e35925443af8388047806e4781b3936d8fb7df67ead634d91a83c8f419e2cf2bf5710894e532c91000544244001110950404402141091000544244001110950404402141091000544244001110950404402141091000544e4bf0e002af2172820226f3b1af80bf083fc85def7a45f0aac00ea80b5c0854047e81376eedc599effeca1adadad76606080f2f272b79bb75463ccd5b80998057cd0fa23fcde6b5f724eb71be44fb180fc06b8674f9f545353b31b18b26717c5b8ef5d35c65c8d0cf06fbbebb51b380ce729d617acb3e29f802ee0ebc059c0fb1c6b8aecab766099056432700750e1794becd3d60cae256fd936e0d3d6b337df3b8de3cacaca4e1d1c1c4ca55229aaababfb01eaebebfbaaaaaa0662ed587b7bfba49e9e9e547e6ba1d854636cd6e8e8e8a8eeeeeeae0448a7d323f5718be255e03305cb36034b8659f7344bae1e7a24eae17990be1538b060d941c0ebc3acfb4ee3b85c83afb2b2b2a1dca8117b04d9bc79736d6f6fef849a9a9afec6c6c6980de954638cd728e6087207705ddefb870303a338065967e9756b22a61aaa31824f0083b6dee34085e741facdc005c00936925c01dc0bbce25853645f65805bad55d536e01ce02defa2cbed58a40fb80ba81fc5e734d93189e7bf4d500dd528f4908d1c83c022c7fd1019938eb633afd7947a474492eaffaec54a5a6bd0721b02fb81ac0d77b1d502c702bb81271cb60fd06027233aec05280fd38169365f7edee97b95732c3025f43f5cf6d12c606ac1b2c780ed91eb00a481197676f57987edbbcb00cf012fd8eb251b804322d7b8d2cea4bd6917a6c5566efbdd033c633fe87bed2f534cf7dbb1dd5f81d780bf038d916be44cb74b863c7e69d700ffb43eceb9c751916b940157d971f046fba37565e41a45712bf05b1bd5ca8107806b23d738d2ae0b5bee149032e03c60a2bd9f065e025645ae5393f7760ab8bde08a8598ee027ee218906f3a6c37dfa5c08bf63243ce41a3fde4a45cee5e66a7d56eb0330903c08df6cb16d30b765d989741fb65cd5d68d969e7d30f8d5ca7d7ae173a0a980fcc74fa599e6f577c7b5ed95a61539f6aa7ed5f025c6ea3e02ca0d22e461c53a65930f25f449c69cb3c2e81f61a410a35d89cf74c876d5f046cb2a9c3c30e17814e015eb6ab5acf741c417aecb5b17ebbb8b566149f375a55f6c7f66e1bc9db6c4a3a2f628da2986161c83fe638dc96151ec4c5508c80bc077814b8deb9ce241bb51644deee6dc057ed6daf8064f246bec3ec18f48711b73fd57e87eec9bbf7e91b76dc9394d9d3a81c605fc807f2969d60af647a7c21de013910f833b0ba483f88c5c0b311b737d746a7a3ec0fd5326087bded3515c27e2e4f46dc5eb94d7797e62d6bb4dfb5e9a3d94052fecbed0e3beb736ade0f7aae7db33c4f5f7a986467999eb53b288bb1ff8d79270662c88ddaf7d9738d4d571eb0e3c2c722d6cad76853d25806ec18705adeb2dc74def358d4c532bbd2f75c4bfc368797fca7db9d8e37da29bfd3813911b75f613f90a780336cfba747be84e200a0d5c2b708f8aecde35746ac51c8638a5561672e3f675fc78f6cc6b030729db3ed4ec1a5b6ed0d7b73c62f292308f6cdeab7800c029f77387b32c7ee74c4e6a12bed45a3c7236dbfdace96005c96b77c7dc4ffcdbdcbeeef5f6053b90efb9eb546dafe70b63abc483860d3b84fd908f50fbb3d3bd6cf22e76efbe3bbd4a65c2d76ffb9888888888888888888888888888888888888888888888888888888888888888878f90fd0171565a1fcada20000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (3, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda793000010a349444154789ceddd7d7454f59dc7f1f73c9084211202441e0d91ca4363793031b15d50b72e7671dd520ee7982aa505cf5217d61e4b5d2bbbebeed96ecf51db6acbdab3b54f0716a8d563bbebf668b59e4a77b5223e0041c88a073010b134b522311827896432fb87df718761f2cb40ee6f3281cfeb9c3993dc7be77e7f79f8ceef77effdddef406129aaa8a8e80492f65ce4234875bcba8d24c9ea78759b8ffd033435353dddd4d4946c6a6a7a5a31866e8cb0af069d812ae0d9b7de7aab04c09e9fb5e52283a250126431d008d4672cafb7e58b07a95d728e1bec048902df001e01ca01468d1af53ec0983163ba81a42dff2fe087be865c227d19ec0429063e0d8480e340c3c48913e300e3c68debb49ee3986d3b1f1836b8cd9573cd6027c87b4003f0343007f879c6fa47815a5bdf60db8be44d74b01b00bc027cd2b1bea59ff522de0c760f2252d07c27c8c5c093401c6803d67b8e2712289f0932097806d86e89321b78c8633c91c0f93c065963c9f14f69cbdef0184f2470218ffbfe8d1d604f05e602fb80db81df66d9762ef0af00b1586c5e3c1e8f969696262b2b2bdb01d6ae5ddb5c5353d31154c3964f5d3eaf31d618ad89d7f46c3ab8e9b9a0f69b612e5006b4032f2bc6d08ce1b30799087c1cb8167801b819780c9801fc2163db51c09500f1781c808e8e8ed0debd7b4701241289da201b164e8653cfd1545c8fca1463e8c6f099206f5ba6a626877d1bb8cd1af770c6b6efd8f14ad61e241289340381f520bda1de7940b437d4db03a807518c41f1e32c07e5ad76c1af4fd5d5d56d40d29ebdd06c5ec5c895cfb358dfb7692497db14912fdbd492673cc6140994cf215623f037c0bfdbf1c82e3b1e79d3634c9140f99e6ab2d91e224392a69a88382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2e03341565975f6f4c71a8ff14402e7fb86a92dc0d59e638878a321968883cfc271ab80bb8177ad2eefe3c05d7d94ef51e138c528c8183e87582f00d70187808b80ef0017023764d95685e314a32063f84c90f42c6db60a274f59e99fee8c6d55384e31ce861803f209a00718eeda4885e314a39062f8ec411a803d5687f723c07dc0af804e8f314502e5f32c56bd55787fd33ec57607b0c2633c91c0f9ec416eb387c890a5eb20220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004117150828838e42b417e6685e32ecd533c9140e423411601e7e7218e48e07c27c848e05ee066cf7144bcf059380ee07ee0775613ab13a8b37bd333a9709c6214640c9ff7a47f1c986fc71dfdf5542a1ca7180519c357821403eb81bf06de074afad95e85e314e36c8891b38b800470cc1e6d7616ab1d58eb7aa10ac7294621c5f0d5831c04c6a67d5f0cb4028bad66afc890e02b417aadd748490db1de556545194a7c7f804e4a571ece9889044e534d441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171f099209f059a80f7ecb6dbc7808f788c97b39ea33d215eb26711079f09d2042c032a81d956fee7a71ee3e56234f0e0fe29fbcbb80cf64fd95f063c68cb454ee1f38ec2bd695f8781c34083c778b97800b886a47df7c1f30d56ede2da416d991424df438c4b815f5bd18662e0abc0ba2cdb9d5c38ae211e8dfc5584e258710fc0f829e33b4b6225898134e4c41b27c207661c18d9d7fa69fba61d1f76c1b0de81c44857922c290d27c3d1de506f4f57a82bb092458a91df18beef497f1998065401cb81dd7d6c7772e1b82a48cc4f10271e0538c8c1f306dc92a3eed5078e1e18c9f40147c9266a3f9f4f8ae12986ef04e901de4e7bec012603c733b63bb9705c4b3c1ad91a700f32f644f8008e1e64ecb4e3c33ad58328c6e0b9d046fdd35c1b792e1cf784b521f3f178d0810ab9189a62e4cee759ac9b811a3b4374b115b27e0d68f618b33fcb80873e3cf2fae0f921e0f383d82629603e136422f08855547cca86550bada8dc6039062c9dfefaf4765e84e9af4f6f0796da729153f83c06b9c31e05273a369ae40288764693396c2ee7304d351171508288382841441c9420220e4a90dc5d0edc9ec3a765e5620d70dd4077b27ffffee11b366ca0a5a52588364916f9faf883a16e84cdfadd0e7c2bcbfa29c0257611340cfc773ffbfb17602bf0f38ce561e0a33637ed7cbb5273c43ef8f494eb4793274fee7ee08107d8b66d5b41dc4670365282e4e67660925dc7491706fe088cc958feb76718e759e04ffa58f7207093dd5f031f4ccbe95db9722577df7df758ebe19e3dc3b8d2070db1fa371cf892fdf3bd9265fd41e047c06a9b4e3f10cf00b7017f0eccb19ee40bc0ab7641f39499d08b162da2a8a8a8d75e2701530fd2bfeb6dbacce62ceb7a81fab4ef270c30d63f6459b61bf82dd0627769de94beb2b4b494fafafaa35bb76ebdd66e4e3b3cc036481af520fd5b62cfbf1ec43674daa4caee6c2be7cd9b770c88009fc97fd3ce6e4a10b7888ded8f006fe4316e29506ef7f0ff05f00b3b60df946de3dadada77edcb4fe6b18de7040db1dcaaec76dcc63cc77d04b83aedfb2336afed9bd9369e366d5aa70df7e6e4af89e70625885b853de77bb6efc396942576fa788e1d5fc4eca3b44f128d4693f6b1dbe3f2dcceb39e12c46db83d671dfb7bb43ee3fb2576cda4da6e4dce360bb9cb6e250df5b15ece808e41dc5277b2970f723b1eb10b8b975b218c6c465b7b951c01f299205f045eb20b5badc08f6d3c3f941cb17fb8f183dd90b4fbf82767ae686b6b8b5a6fa753bc01f399209381afdbf48b6bec7ac17d1ee3f970cc2e0e7e2c6db8e58bab045395f51e00fb3257eedcb93355f54557d203e6f318e49fd3befe3df0bd217ab5778b25487daaf24a860969c9931a8a8d6e6e6e2e292e2e261a8d16e518e70ae02eab3eb90ff883edef32e0cbd6fb3e9a51900f801d3b76a4aab56c39b31f51fa92cfdab43fb1eb0a4bb3ac3bb9705c3c1e2d2d2d4d565656b603ac5dbbb6b9a6a626b0522dcba72e9fd7186b8cd6c46b7a361ddcf49c6bdba6a6a6114b972ebd74e1c285bfbfe79e7b0e64ae5fb66cd9ecddbb77f7798cb260c18213ebd6addb96beacbebe7efecc9933db376fdedc945ab67dfbf6f356af5e3da7bbbb3b92b98f70389cbceaaaabdebcf3ce3b0fc462b1f47bfae702658b162dea3d7efcf8892d5bb6bc6867b48234d792b3ddea9cf950b031f27516eb7336d1ef923ed69f5c380ee8e8e808edddbb7714402291a80db231e16438f51c4dc5edcbac59b3a8ababe3f9e79f9fd8dddd3db1b8b8f8a4f54b962ca1b6b6efe6cd98316358668c4824426969e9e8f4e57575756cdbb68dddbb7773f8f061dadbdb0985424c9a3489bababa507979f9f86cc7424d4d4d1c3a74287ccb2db71447a3d12b4eeb17717acafafb5d9d8d31f291200dc077804f5901eb6c4e2e1c97d1834422916620b01ea437d43b0f88f6867a7b00670f02b072e5ca91ab56adba64c3860dafad5ebdfa48faba254b96f4f5b23edfb11289c4fc8e8e8e762bf0fda1a2a222eaeaeaa8ababcbf54799bb7efdfab2f2f2f2644343c373c0808aebf515a350dfdd0b30c669bbc1a683d7e4fa02cf85e33e8811af6e2349b23a7e5a317e6a67e362b96cdc4fa1b2f6208ad56ddcb8714728144ade7aebada71cb807a5908bbae52386cfb358d703dfb5aae9f99eaae1c3e7ec803c3ed80d49a9adadedd8b3670f37de7863eb60b7e56ce53341ee00c6dab5905489cf53a6498814329fc720b33cee7ba81b6a174ccf599a6a22e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a10110725888883cf04f98495a169b39ba5f4397a32e4f84c902e2bf5b3da630c11af7cde51b8cb1e733dc610f12a1f85e3e65aa20cb75ea5af6d0ab270dc009c2da56ccee91885f2f107055b382e0005570c4d310aab705c2e0aba70dc192ad87745c5289cc27158c3723e8b55c085e34e4b211743538cdce93a888883cf04b9d47a8e5df67deaa38c4b3dc6140994cf63901d79fe780591c0698825e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a1091ff3702284a5fa00411f9c04ce079e09be90b7ddf93fe15e0366034f01be08b40abeb055d5d5d91f4671fbae25d1186dbb3278d8d8da58944824824e2ed0631c50834c6f78159c0c7ac3ec22f7cb5256581dd203fdf12e43f805ff6f7a2582c760248dab317b19db1132449c676fa8b91977beb1523c81895c051bbebb50db810cf43ac9bacb2e256e018f077c035c0051e638a9ca9c3c00a4b9051c0c34091cf21d64ce0c9b4ef5f03de0566006f646cfb61e1b8d4d0aab3b3339aea45c68f1fdf5952529208aa61fbe2fba200ddf1eea8af77adc3870f97a59e1563e8c4686d6d7dbfadadad18a8aba8a868f7d19694df01d7652c6b016ec8b2ed9f5ae6e6e7b182245fb3e77cc6d563c83d7cf6206f0323339695037fccb2ed8785e35205bec2e17032d56b04dd83b4fcaca5341e8f4763b1584f5575556005e94e8ad19216a34a31864a8cd6d6d6e1d683505151d157a9dc403c0c7c37edfba94022876390a72d7bbd1511530cc5e8c35f02bdb6dd4b4091cf83f41f019f072eb39ee42ee0892cc71f2285a012d868a5aade013e0bbcef3be81a3b16e9041e05c6e7f09ab9764ce2f3631314433132fd8ff51cbdc0628fed10199266027b807583dd10914275ca5cac422b0d1ab12eb00768b2ee2e68a5c06ce004b0ddc3fe0126dac98856bb00e5c31460828d97f77bfa5da5cc06c6d8302448b3807119cb5eb4eb6541ab002eb2b3abfb3decdfbb4a601f70c0ae97ec02ce0f38c6bd7626edb84d4c0b5ac4dadd01bc627fe827ec9d29484fdab1dd4ee04de07f81aa8063a44cb129433efe691f028e581de7d4637ac031c2c0b7ed3878afbd69dd1b708cbcd808fca7f56a11e029e0be80634cb379616b3c254818580a0cb3ef2b8083c01d01c789a57d1d021e0436041c23e551e0071e13e41f3dec37dd576c16c7d4b465e5b9beb850a6bb87edb4daf7ec4c4202b8dffed98274c0e685f9d26bffaca949906fd9f9f4c901c789db7ca1e9c09f01177bfa5b2eb319df3e67b616d9d067b8a7fd7f09f8baf582b380629b8c38a44cb0c448bf8878b12df33105da570f9269a28d79177ad8f72aa0d9860ecf7898043a063864b35a177aec413aecda588f4d6e8de5f0ba5c95d89bed63d69337da90f4aa0063e4c545960ce9c71c536d59e6415c10f29120e701db807ff31ca7cc7aadab03deef4f805bed6b5f095299d6f35d68c7a0df0a70ffe3ec7fe89769f73efdbd1df714cae8292723ec07f968dab2cbec4aa68f1fc477828cb40f075d9fa73f4403f06a80fbbbd27aa7e9f646b50278cfbef63514c2fe2e3b02dc5fc486bbcbd39655d9ffda945c7650289f72fb9e9df5b922ed0f7da5fdb27c9ebef4a1ccce32bd6a7750e6a3fd556927068290eab57f65cf311bae3c65c7852f06182b5d950d498392b063c00969cb52c3799fc7a25eacb099bed75bc6bfe3e192ff14bbd3f17e3be5b700a80f70ff45f6077919f894ed7f41c0532846008f5bf22d06be66e3f8b501c6c8e463885564672ebf603fc73d3662b836e0389fb63b0597dbbe779dce19bf42e941b05f568f25482f70a387b327f576a723360e5d6b178d5e0a68ffc3ed6c09c057d396bf10e0677377dbfdfd57db50aed57e678f07b4ff6cdef670913061c3b8cf580ff5badd9e1dd4df22e5317bf35d6e43ae0d76ffb98888888888888888888888888888888888888888888888888888888888888888f8f27f78866ea9ab1f865f0000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (4, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda7930000113d49444154789ceddd7f7454e59dc7f1771220240403a10164354641055930a0d068552c28470fd2e2b20db555a27b4eba8aec59bac74277cbeee9768f965a6b176ba5a52bb5b68563774b7b90989eb5452860a3b141180414508a760123413024fcc88ffdc3efb077879927c3709fc924f9bcceb927993b77ee779267bef33cf7dee7792e64967ec5c5c52d4087fdece723482412591f89443a2291c87a1ffb578c9e1323dbd71b4a4129b0b1a1a1a13f80fddc68eb45ba44a624c82ca01e981cb37eb2ad9fd545ef4b7ab9ae4e903ec0126035301860d0a041a700860c197212e8b0f5bf027ee8abc92592485727482e3013c8028e011523468c680618366c588bd51c8db6ed0d40dfae7dbbd2db7475821c072a80f5c0d5c07fc63cbf06b8c69eafb0ed45d2a64f57bf01e00de0d38ee7f775f2bc88375d5d83886434df093216f80dd00c1c019ef61c4f24543e13e42f800d409d25ca786095c77822a1f3790cb2c092e39f03ebdef5184f2474591ef7fd3b3bc0be0c2803de041602bf8fb36d19f0ef00f9f9f99f6a6e6eee535050d0515252721460d1a2457b274e9cd814e27b2b030a81a3c0eb21ee57317a580c9f09b21328016600b5c083c0bf0057020763b6bd197829d18e56ac58c1a449933cbe5591f87c36b10e5ba6463b877d07780898023c17b3ed8776bc12b706c9c9c9d90ba806518c4c8f714e7e14e7a0fc805df04be8aaabae3a0274d84f2f32b9f7a86264560c9f67b1965937921bad8bc8df5bd7920d1e638a84ca6713ab1e9807fc1818016cb1e391431e638a84ca775793676d11e996d4d544c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a1011079f0972bfcdce1e5c16788c27123adf03a67e0bdcea398688376a628938f89c17eb7ee09bc047362f6f35f04882e97b34719c6264640c9f0952067c02780718053c0e6c03ee8ab3ad268e938ce4f3182498a57b6d8693176dea9f9331db6ae238c5e80931cecb75402b90e7da4813c7294626c5f05983545893ea203012580ad4002d1e638a84cae759acc936c3fb21bb8bed6bc0bd1ee38984ce670df2902d22dd96ae8388382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e290ae04f9854d1c776d9ae28984221d09f21960681ae28884ce77825c003c063ce8398e88173ee7c502780a78cfe6c46a0126d9d8f4589a384e31323286cf04290796db7147762709a289e32423f99ab42117781af85be014d0bf93ed35719c62f48418491b05b4018db61cb1b358478145ae176ae238c5c8a418be6a90b76d5edea85ce000300ba8f514532474be12a4dd6a8da86813eb23cdac28dd89ef1be8449d48c3193391d0a9ab8988831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e3e13640e10018edbb0dbe781911ee38984ce67824480bb811260bc4dfff3738ff14442e77344e18ec0efd9c07ea0c2633c91d0f91e067b2df0df3669432ef015e0bb71b6d3c4718a9191317c27481f7b53a54025f06b605d9ced34719c6424df9336b4028703cb36e022e058cc769a384e317a428cf372a94d1e77b96b234d1ca7189914c3e759ac078189401130d626b2de03ecf5185324543e9b582380d5c085d6bcda08dc6693ca89740b3e13e46bb688745bea6a22e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004499fd7819fc5acfb830d0548c6c5c067437c3f33ed3ef69d6a6f6f67f6ecd913a23dae7b1325487a8cb1b1379f06f253dcc7a5c017427e5f4959bd7a3543870e3dd115b1bb5aba6ee2d9dbdd053c0b5c0ddc01fc22f0dcbdc0744b9cfb802df6f809e0b48da9b91ef8271bd3f0a2d54475b367cf9e909d9dcde9d3a727dae8cdd76cf0d9621be25c6abda7ab2cd62ce0511b8ff3bbc07be867cb59636e0e1d3ad4b7a6a686cacacaffd9b46993ffff54865182a4c71ce05660a77d588309d2df12e046e03f806b808596545b8081c029e0111b4230c75e57b072e5caadb9b9b937eedcb973574545c5e3c04df6dc684b86261bc1596689f23de0069b40632df0ae6d3f0bf862bc26dcc30f3f3c72fefcf934373777f8ff37651e258867757575038106fb463f00fc081864a3280156dacf8d403150006c027e60b5ce6abbbf7cacbe0b172ebcbcb1b191b6b6b65156d344bd12a80d76594d926733cdfcc9d6afb264c18e2dde8c13634a565656c7840913d8bc797348ff91ee4509e2d99a356b86da87333a50ac00b813f8b1e3655f077e65dfec2f03b7c4d96651494949cbd2a54b696d6d8d4c9830a12cf0dca9c0ef6d81720e26d1e9c0ef876c8975fdd6ad5b07df7efbed3435358db5b13c6b80cf74fe97f70c3e0fd2ab80576de2b8e83767a1c778496b6868e81b8944686868e8eb334e7b7b3b1b376e2cb6638f91b6dc69cda7a8e881f74dc0fbf6cd3f0ad80afc2b50075c69eb87065e37b8b4b4b40560eddab54392f8b28b58d36ba03d9e1e78ee62e053715ef3cdf5ebd7d7d6d4d4b064c99237ac3c434f8e7495472a7cd6201701df00eaad607f022cb583d2ae52043c396ddab4eb3b3a3ac8cacabade9a38f36df6c750d5d7d73364c89093870f1ffe7360f5ef2de6307b7c0aa8b56991fec6d67dd58e4b72acb9f45b1bcfdf016c079e049e58b56ad59cbaba3af2f3f3072631a945934dbb540dec8ba965ae4b740ce2595acb23d37d0978abb38d3c4fdaf042e083165caac30e94c9131164508c8c2f0fdff36205fdd4be11e39dcbf73e71dcfefdfb7367cc98519ee8f9eaeaeada0f3ef8a0eff6eddb0b00e6ce9d7b908f6b818214d795eddab5ab70c78e1d2d4d4d4dfb43d85f8f8ab179f3e641cb972f4f3857737575756d4949c9c9f328f258294dfb93ae83f42fda840d13123c3f089802d0dcdc0c40535353d68e1d3b0601b4b5b55d73be6fa0b1d15d6337363696d7d6d6b26cd932f8b830af04389f75ebd6ad63d9b26579c09561ecaf27c558bedc7d11bfb1b1b1bca4a4a493524d4961f4b3968c74244805f0b81d14be97601bef13c7151515e502096b90a2a2a2daf2f2f2be05050505b6ea2040797979418aebcaa64e9d5a387cf8f096a6a6a6fd21ecaf47c5686b6b73d620454545b54097d720bedd6567662626fb021d83f4aa18195f1e3e4ff37edeba4bccb0335999e06e605556d6c7875ef67315704fcc76fdec6c51b2f733b9d8be0892f557364f716fd7abcb2312e79b21de15e1ff271d538fae5bb76ef3ca952b3bd6ad5b97e8f2f0df01cf041e8f066aec9fde61d72982620b64caf8f1e31b0b0b0b3bf2f2f24edb6b47079ecf02deb053b929eb013508a4561e77c4f96c7d3bf07c68e5e1f318649cc77d9f97e2e2e2d3c5c5c5c45c4d0e9a674b542bf04be031bb26d199d2e9d3a7bf3f6ddab4c1adadad7f9c3973e6516b368c0a14e8b316e3e570feaaee2b85f2c0bad08c493244cae5a1ae2667bbc2fa2e05bfcdf6d8f28924f7f193cacacafbec0af809bb22be03186ebd0ab0deb48bac99abe958138b571ee72ae5f2d07890b34d00de8eb9d27cbe6eb09eb30703eb760283cf61c0546f95a83c4a8077ac69f4bd73f8f2e25cca4335c8d90ae3dcbf246591486400f02dbb1614ec327edc9a6e83c38ad543c52b8f3781cf01bb6d72f425d6eb794accfff82ce75a1e4a90b31d052e0863477bf6ec61debc79e3ad9b4d4dccd303ecffefed64440f11af3c76db12fdfd1e6b025f6cc30ae24aa53cd4c43adb16e0323bb598b26ddbb60da8aaaaa2aaaaea1deba8196b8c5d20dd773e717a8164ca237a709ff00b3fd5f250829ced2d1b5474dd79eca3ec81071eb87ac1820567fa1fc531d52e94e900dd2d5e79ccb421048381ab6c28c5163b268927e5f25082c4f7fd986ef9c3adbdda608f77dbe3d1095e5f75ecd8b1be8b172f66dcb8715302a712a33d0ab280b916473a175b1e636ce0d6411ba37fc8baea273afe48b93c740c12df0fedeaff481b0978f01c7b3e3f188944c6da41e38671e3c6dd1cf3fc9d9664bdfe1a489262cbe3515b929572792841e23b05fca5c7fdafb64592d365e5a12656388ed9b978c90ca1958712241c47817febea37216784561e4a101107258888831244c4410922e2e03341aeb3b11347eca24c7f8fb144bcf09920276caa9f073cc610f1cae785c22db69425b1ad48464ac7c4716596287956ab24dac6ebc47171e2f99e0246317a408c4c49909b819712ed60c58a154c9a34c9df3b14492053fa62799f382e46c67e632946b78e9192b273398b958e697f7aca74398ae13f86ae838838f84c906bade6d8628f5bec714127af13c9183e8f415e4bf3ed154442a7269688831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004117150828838284144fecf80d83b592941443e361af883dde0f30cdf63d2bf0c3c0414d97da8ab02f7a58eebc4891339c19f3ed4d7d717b4b5b5919393e36df0966274bb18cb8071761f920dc0af7dbd97a85b6c80fc0d9620ff05acedec45f9f9f9a7810efbe9453ac6bd2b46b78b51027c60a35e8f0097e2b989f5259b597113d0087c15b8dd6ed52b9269f6db7d103b8041c073403f9f4362b7d964702b02eb3e04fedae6ec0d3a33715c7676f64dededed59595959e4e5e5b5020c1f3ebca57ffffe6d61bdb1fdfbf7173635356505a7160a9b6274cf18070e1cc83b72e4482e40717171a279dc42f11ef0b99875fb80bbe26c7b73e0cea35ab464cce2f320fd307041ccbac1c0fb71b63d33715c7482afececec8e68ad11760db26fdfbe82e6e6e63ef9f9f9ada5a5a5614e48a718dd3c463a6b90e78027028f2f03da923806596fd9eb6d1231c5508c04ee00da6dbb57817e3e0fd29703f7009fb49ae411e005e05d8f31455255023c6353557d08ccb1db4f7bb5c08e455a8035c0f0245e5366c7243e6f9ba0188a11eb25ab39da81591edf8748b734dacebc7eb7abdf8848a63aab2f56a64d0d9a6355602b10b1ea2e6c05c078e03450e761ff0023ec64c401bb00e5c325c085d65e7ecbd3ff2a6a3c30c4750f97148d0386c5ac7b05f828e43800c5c0283bbbfa9687fd7b5702bc09ecb6eb255b80a121c778cccea41db38e6961cbb1f7dd04bc6105fd827d3385e937766cf747e010b01d280d3946d425d665c8c7877615f0679bc739ba5c11728c6ce03b761cbcc3beb41e0b39465a3c03fcd26ab51ce0456069c8312eb77e610b3c254836f005a0af3d2e06de06be16729cfcc0ef59c0ca981e0b615a03fcc063822cf6b0dfa02f037bec3243d4e0645f9c29ddddb3edb4daf7ed4c421bf0947dd8c2b4dbfa85f9d26e1fd66847cb063b9f7e51c8719aadbfd015c03460aca7b2bcdb7a7cfbecd9dacf9a3e799ef63f1ff886d582e3805ceb8cd8ad5c688911bc8838d6d6f9e802edab068935c2dabcb779d8f7fdc05e6b3a6cf0d0097408f08ef56abdcd630dd264d7c65aad736b7e12af4b567ffbb27dde6af27a6b924e0d31465a8cb264081e735c66eb620fe2c2908e041908bc0c3ce9394ea1d55ab786bcdf9f02ff60bffb4a909240cd77a91d833e1ae2fe87d967686d60ecd33fda714fa6b49e9232c0fe903181759fb42b993efe10df097201b019783a4d055101ec0c717f53ac76bac2bea8ee058edbefbe9a4258b9bc16e2fe72acb95b1958576a9fb54b92d941a6dce5f6b89df5b92950d053ec9fe5f3f4a50f85769669a78da04cc7fb2f0d9c180843b4d6aeb19ff9d65c79d18e0b5f09315650a93549c3d266c7801706d6459bf33e8f45bdb8d77afa7ede32fe430f97fc2fb1918e4fd929bf5b80c921eebf9f15c8ebc074dbff2d2177a11800545bf2cd02be6eedf84521c688e5a389d5cfce5cceb5bfe3dbd6629811729c993652b0d2f6bde55ccef8654a0d82fdb35a2d41da81fb3c9c3d996c231db176e822bb68f46a48fbcfb3b325005f09acaf0df1dedc276d7cffadd6943b60ffb3ea90f61fcf610f1709dbac19f759aba1fe64c3b3c32a8ba8e7edcbb7d29a5c2b6cfcb98888888888888888888888888888888888888888888888888888888888888888f8f2bf07c73f21bcd51c630000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (5, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda793000014f049444154789ceddd7b74147596c0f16f1e2410022181608810c23bc0048111088ac282206c961df40c8880418f808278965118660e0eaece39eeec8ccee08b800f7644079645f1c94399c84b11a326480382024670251009044278e4d1fb87b7d99aa653e924f54b0afa7ecee9d3e9ea4addcae376fd7e55bfdf2d7097a8c4c4c47380579ea34c04f1783c9b3d1e8fd7e3f16c36b17d8d71f5c40837b54375900a6c2b2a2a6a0a20cfdb64b9528dc22d09320ec80306fa2d1f28cbc735d27ea910d7d8091209fc015803c403b46ad5ea2240ebd6ad2f005e59fe26b0d454934ba9ea3476824403638130e03430213939b90ce09a6bae3927478e62597708d0a4717757859ac64e90b3c0046033701db0daeffd77809fcbfb13647da51a4c6463ef00b007f8279bf70b6a785f29631afb08a294ab994e90dec006a00c3809bc6c389e528e329920d7025b80cf2451fa002b0dc653ca7126fb207324397e675976c4603ca51c176670db39d2c1ee0cf405f603bf06b60658b72fb008202626e6c6b2b2b2c8d8d8586f4a4a4a09c0fcf9f30ff6efdfbfd4c17deb0bc40125c04e07b7ab31aeb2182613e42b2005c80476000f000b811e40a1dfbac3804dd56d68d9b2650c1830c0e0ae2a1598c926d609c954dfe0b0a780b9c0506095dfbaa7a4bf12f0081211117110d02388c6707b8c5a793140a7fca85cf0ab56af5ebd4e025e7936c2cda3473586bb62983c8b952dc3486e922122ff26434bb6188ca994a34c36b1f28059c07f01c940bef4478e198ca994a34c0f35592e0fa5ae483ad444291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c984c90fba53abbf531c7603ca51c677ac2d4df8191866328658c36b194b261b22ed6fdc07f0067a42eef5ae0896acaf768e1388de1ca182613a42fd006f816e80afc19d805dc19605d2d1ca75cc9641fc49aa507a5c2c94629fd73c16f5d2d1ca731ae8618f53218a8009ad9ada485e334869b62983c824c90265521d005781a580f9c3318532947993c8b35502abc1f93bbd87e0edc6d309e528e337904992b0fa5ae587a1d44291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c345482fc8f148ebbbe81e2d92a2a2a6ae2f178282a2a6ad2d8fba2dccd74e138807f05da36409c602400cf8d1831e206afd74b5858d80dc00a603650dcd83ba7dcc77482b4049e046e03761b8e158cd780315eaf170079be53aa5d6436f6ce29f73159170b6031f0bdd4c43a070c90b9e9fe8c178e3b7cf870746666664675efaf5dbb76474a4a8a7f39a2fab85a4ad984740c9347900c6088f43b6aeaebb402860294959501505a5a1ab677efde56009595953fafefce1417dbb7a08a8b8b33525252ea1b269038dfcf6690c63014c3548244032f03f7011781a635ac6fbc705c424242b4246d75efef0850d0ae3e5cfba9a8311abf705c57a0523abec5529bd72b3b37dfee1b0d178e5b17e0960c5ea91bec28371743d318c133759af790d4e5ed228f9eb27c1cf08ca198c19802ac0c0bfba9eb25cf2b81bbfcd68b92930a5d82dc6e07e0782df6e376e0ad5aacaf1a89a904a992a386ef714a969f69e4ca8ac5c0a49c9c9ced2b56ac202727673b3029c029defbe464c241799d2655218fcb11a76bb001972c5972ad7ccf4396c56f02dd801b9cf9b194290d75a1f0bc9c310b7406abc11d3972247adbb66d1c397224ba9a556601af585e57006f545399be5a858585bcf1c61bd702fbfddef202cb258e72b1901c6ab27bf7eed8ecec6c76efde1d1be0edee402af0b165d901e025e0cbdac479e28927983163c6b7d2f7f29723d75e226aff13a88612920952837ed287ba589f8dac5ab5aa6d797939e3c78f2faa6695afe4f476c7fac45166856482646565157a3c1eb2b2b20a03bc1d079cae6788d64b972eedb460c102bb75ce4ad32dbe9eb194412199203528912132f5f1546666e6d1f6eddbdbadd35cae4319bb0f8aaabf8618ace83a797979b13b76ec20232323501f241fe82ca77aebdacc1ab96ad5aab66bd6aca1b2b2f24659962e57707f21af7bcad9bd823ac6500d202413c4d7498f8d8d0d94205f03dfc91db1b6d43144af0d1b36ac8d8c8cbcb1a2a2e2d3a1438736937ba458af010d970b9755758ca11a8036b1027bdeef663f49726ad6d7e1fe465ea755f3fd25090909152d5bb6242121a142fa1ae7e43a1072ca3b4be228170bc904a9a1930eb054461efbaea417ca3fb5ff635f902107c988669fdb24c9b6d7f34751868564132b0817819f19dcfe1a7928970bc904a9a1935e17a781671dda967291904c901a3ae9755102fcdea16d291709c93e8852c10ac90409a293ae14846a822815ac90ec8318e8a4abab94c923c81d804706e51503efd662869e51350c7757ea129309e29129ae29401f29fff33783f19cd05ee6cc5b8b4c7402feb911f7692ad0c26e05a910390578582ac92887984c90bd32c1e804f0037058a699363a9b4efa3dc0a3c018cbb21ec0f85a6c3e07e8e5d0ae023c58d3e8e2471f7db4ab9457aa009600331c8c1fd24c178ebb1ef840ca004503f380bf0458cf78e1b800f12e2b013366cc98ebc78e1d7b74d7ae5d714b962cd90bb07efdfa840d1b3624de7efbed857bf6ec891d39726471b76eddce01ecdcb93376ebd6adad222323bdc3870f2f3e7ffe7cc4dcb9737b0d1e3cf844870e1dda4c9f3ebde9a14387ce6cdcb8f158555515b7de7aeb892e5dba9c472654f5efdfffccb66ddb5a454545554d9c38f1786464a417203737b7c5279f7cd2eaa69b6e3af9d8638f757feeb9e7f674e8d0215049a2be405c555555497878f84e80ad5bb7c63dfbecb39d56af5eed54699baba5248feb0ac7213bd24da6b04eb599b26abc709cd5be7dfbf8f0c30f193e7c785c5a5ada5080fdfbf7939090c0b469d3ba8e193386b367cf0e6ddebc392d5ab460dfbe7d7cf1c51749c9c9c93cf8e083bcfaeaab949797b370e142a64c9942444404050505f4efdf9ff8f878faf5ebd73e393919808f3efaa845bb76ed5a949797f3f0c30f777de9a59768d3a60defbfff3edbb76f67d2a4497cf0c1072c59b2246df6ecd9e4e7e7f3f8e38f336dda34d6ac59c3a953a7888e8ece0058be7c39a3478fa66ddb7f2c751c1e1e7ea9185a494909a9a9a91828c0e6baa26e0d11c37482544813cbf7d825ed7cff197bc60bc759edddbb7760767676b3a4a4a473696969b9fcf489de69f0e0c1e5515151dfa7a7a7f778fbedb74f4d9a34e9d899336712626262521f7ae8a13c808282828eafbdf65ad5a041834a222323bbdc7cf3cd7b9292922ecd1b898c8cbcae478f1edff4eeddbb3b103779f2e4924d9b367df7c30f3f44c7c7c7b759b76edd8f59595985656565d76565657d3768d0a0538989894de7cd9bd773f6ecd9f92fbef862cf7beeb9e7c771e3c6158d1a352a7cd8b061375cb870e133e0427e7e7e8f8c8c8cc36ddbb6f55586f9874fc5c2c2c2a8458b16f55bb468d16e3939e204d77ebabb3046bd749221e2b6fd10c385e30098376fde3ec02bcf4853f35b69fecd975a59efc97ba3a502bccf64cbb8ab5f4bd27f2cf347f0f5413c1ecfe62fbffcd2dbbd7bf712d9ee0ca98c324fd6db64192edf464e6a006c96c9553e1ee0da403f875f31b4e6c08e5af6976ae4e6a26e0d11c36427fd01a0bfdc72a0b714b23e60a935d5680274d207cb27aeeff54ef9c4692dafada7a7bb0247e4eb3fca19ba85be3e9454946c0270ecd831aaaaaa007e05bc00fc1844bfef7b4b424400ed6afa792e5ebc1826c9f7376075b0bf075533934dac6419d2dd4e9a57dbe4d3d88d33e826022f024f5b9675067e29b30baf01fe24d363a702374a3bf61699137213b047beef2030f3f5d75f4f1c3b762ca5a5a54d64bd4479aee903221bf883343b337dc9265603bff39f87b260c182aef23bbe2047aad3c07f3bf7eb095d268f200ba4731e2dc972871b8e1ec895f4c58b17939797e7bb50582077c1b2ca967ecf216916ad950f945b80a332777d8ff4a9b60033e5fb7e0b78f6eedd1b1b1515c5e2c58b3d7294b920a7913f95f556ca3f3532db70997cfdb11c713280b781472c33113fb17c7d495a5a5aa94cdfed2c0f2365ea4351480e350930dcfdcf0156db69e9cc7d2dcfd6f66b759fd2a780e7172e5c381e489153c281b6ff82e5ebb37ea7bf3fb754a1b456a30cb41deebdf7dea38b162dfa4da0f754fde86045a56c846482e8707715ac904c10a58215927d101deeae8215920962604ebaba4a69134b291b219920da4957c10ac904512a5821d907d14eba0a5648268876d255b0b489a5948d904c10eda4ab608564822815ac90ec8368275d05cbe411643a902b43b98fca84a43883f182969b9b1b979d9d4d6e6eae2bf647b997c904690f3c2e73d0c70003fd66ec35860460c5e2c58bbb02c8f30a59aed4654c36b11eb57cfd83dc8f6faec178c1780d18e3f57a0190e73be5c896d9c8fba65cc874e138ab57a508c1a400ef192f1c77f8f0e1e8cccccc8ceade5fbb76ed8e94949440c5d9eaea6a296513d2311aaa933e590a36f4abe67de385e38a8b8b6b7a3f2325c5c8546ed71543d318ee291c073041e6528f92923681182f1c979090102d8510aa7b7f871456708a6b3f1535867b0ac7dd091c97fa5841315c386e9d14aff37fac753a909b8ba1698ce0993c8b351178463abf7906e3d4c614606558d84f5d2f795e09dce5b75e14b0bb16f733e9201f04c1ba1d78ab16ebab4662ba2e561bb916e2fba4beaca653032b0626e5e4e46c5fb16205393939dbe5a4817f07e53e29b7e3abe39506ac9724f04a75453b43274f9edc67c890210c1c38f046f9de34cbfb6fcae9ef1b1cfef994c34cf641d28358a75124262696272626029457b3ca2c79f8544869cf2781bf07112275d4a851c7478c18115f5151f1c5d8b1634ba419d7d5f261b15c626c77e6a7522684e450931a74978a901f5b961d90479b20b7f1cad4a953ef919bef9c071e931b0a25c9a802a4c8f57c398abbb11cabd2c18a01f59372a3178358375843a4e0b575f4f05740bc24a372293d825c2e2ec0fd4beacce3f13407fe53ae05792d6f9d95a65bbc53b194f334412e5752d33d018375e0c00166cd9ad5472aaeaff77bbbb9fcfe8ddd0745d59f36b12e972f15d2a3eab3915dbb76359f3e7d3ad3a74fff167825c02a3de50269417de228b334412ef7b5dc13647010eb56a7efcc9933af9b33678eddacc5e172e1523be82ea60912d8f3c0dd96d749d27f2892d7dfc8ebb46abe7ffae9d3a79b3cf2c823a4a7a70fb59cdaf58d280803b2248e7231ed8304b654aefe77918b8585b51cf9fc80c7e3e92d83e2b6a4a7a70ff37bff364932bd06e2729a20815d047e6670fb6be4a15c4e9b58ce386db9f3adba8a688238a304f87d63ef84729e26885236344194b2a109a2940d4d10a56c984c90c13277e2a45c246b6a30965246984c90f352ea67a6c1184a1965f24261be3cfa1a8ca194510d5138aeaf244a3339aa54b78ed1c27101e25d0d65663486e1186e499061c0a6ea36b06cd932060c18606e0f95aa865bc662192f1ce7c7b59f581ae38a8e51277d6b7316cb70e1387079a1328de1ae187a1d44291b2613e47a3972e4cbeb73f25aefeaa4ae1826fb209f37f0ed1594729c36b194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204afdbfe6fe7716d30451ea2769c02772c3d54b4ccf49ff1530174890fb824fb7dc273ca0f3e7cf47589f4dc8cbcb8badacac242222c2d8e42d8d71c5c5c806d2e5be305b80b74ced8bcf2d32417e8824c8ebc07b357d534c4c4c39e09567231a62debbc6b8e262a4003fcaacd79340270c37b1664865c58f8062e037c018a083c1984ad5d561b92fa5176805ac02a24c4e89dd25c5e09659969d027e29357bad2e158e0b0f0fbfb9aaaa2a2c2c2c8c66cd9a55002425259d6bdab469a5533b76f8f0e1b8d2d2d2306b6921a7698c2b33c6d1a3479b9d3c79321a203131b1ba3a6e8ef81e18efb7ac00b833c0bac32c7782d5873e5cf330d9493f01b4f45b160f1c0fb0eea5c271be025fe1e1e15edf51c3e923484141416c595959644c4c4c456a6aaa9305e934c6151ea3218f20ab80672caf3b039541f441364bf61a2b22a631344635fe05a892f5728128939df41780bb80417224790258071c311853a9ba4a01fe2aa5aa4e0177c8edc08d9a237d9173c03b405210dfd357fa24266f9ba0313486bf4d72e4a802c619dc0fa5ae486972e6f52f8dbd234ab9d56563b1dc561a34420e811580470e774e8b05fa00e5c06706b60f902c27238eca0528133a02eda4bdfcb5a1df954f1fa0b5dd3d5cea281db8c66fd9a7c01987e30024025de5ecead706b66f5c0ab01ff846ae97e4036d1d8ef1a49c493b2d03d39c1621fb5d0aec913ff43af96472d206e9db7d011c037603a90ec7f0e92843864cfcd3ae04fe57ea38fb1edd1d8e110e3c25fde0bdf2a1f5a4c3311ac45f8137e4a816016c049e76384637191736c750828403938026f23a1138042c70384e8ce5eb306085df880527bd032c3198208f18d8aed5af80037299c1273ed86f76cb70f77039adf6bc9c49a80416cb3f9b93be917161a654c93fab6fa065919c4f6fef709c32192fd41d1801f436f4b79c2223be4d8e6c8d92a64f3343db9f0d3c2e47c174205a06235e51da4962582f22f696652686409b3a82f84b9636ef6803dbbe1f38284d872d060681b606be9551ada30d1e414ae5da58850c6e8d09e2fb82d5543e6cdf9523799e3449873b18a341749564b0f6393acb32ff4e9c131a22415a00db81e70cc78993a3d64887b7fb2af0907c6d2a41522c47be4ed207fda383dbbf46fe87deb3cc7dfaadf47bdcd27a0a4a73f9417a5a960d922b99267e10d309d212f81878b981fe101380af1cdcde50393a75970faabb81b3f2b5a9a610f277f9dcc1ed45487377aa6559aafcaf750c66036eb9cbed5939eb73b3e50f3d547e59264f5f9a10276799be9219940db1ffa99613034ef01db5d7cb738c3457364abff053076359a54a93d42995d2076c6759e66bce9bec8b1a71b78cf49d28197fcac025ff8e32d371b19cf2bb0518e8e0f6a3e40fb2131825dbbfc5e12114cd81b5927ce3807f9776fc7c0763f833d1c48a92339759f273fc495a0c990ec7192b3305a7cab6f36b73c6cf2d4710e4975521095205dc63e0ecc94099e988b443e7cb45a35c87b6df4cce9600ccb32cdfe1e0bdb92fc8fcfe91d2943b2abfb3b50e6d3f9013062e12564a33ee177284fa4ea6673bf5b7f079573e7ca74a936b99cc3f574a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a59452a6fc1f2ccb094c45c52af50000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (6, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda7930000135949444154789ced9d7f7454e599c73f772693901804068291620856a8bf68f117a5f10795d0164facf50f1784a2c4edeadac53dea1ebbe8717b565d4fed0fab9552d9ae2b6b91cab276bbad1a7f54d98add5244056a56aa501453d700a9036a088664f2ee1ff30c5cc6c96492dc77ee9db9cfe79c7b2673e7cefbbc3393e73eeff3fef8be102cca6b6a6a0e02461ecb6d18696d6d7dbeb5b5d5b4b6b63e6fa37cb5513a3622b62a3404ea81df7474748c0090c7dfc87945f185a038c8a5c0666046c6f91972fe529feaa5841cbf1da40cf836f073600cc0e8d1a30f018c1d3bb61b3072febf801fdb6a72294a7ff8ed2015c0970107f800983761c2842e80e38e3beea0448e845c7b1e10f3b7ba4ad8f0db410e00f380e781cf008f66bcfe187096bc3e4fae57948251e6770580d7800b73bcbe6b80d715c51a7e4710450934b61de434e069a00bd8073c68d99ea264a5a323166b6dada4a32336a83cd66613eb13c07a6005f075a017f894457b8a92051307963736d2600c380e0d601e01ae032731d0bb6d3ac80dc04bc0375de7fe64d19ea2646335709131a927f2b8001805340df466c762c5d649827d22301d7803f87be0852cd74e077e00505555756e575757597575b5a9abab7b1f60e9d2a53bcf3cf3cc4e0feb365dbea0f781ad1e96ab360264a3adada2a2a969caccfe5e6f69d9b1b1aeaebb3b57193623c80460a678e9466009f0b834b376675c3b1a9805d0d5d505406767a7b36ddbb6d100c964f22c4b751c95b66b11b5e1938d44223ad0eb33ebea729761d341de93bb417a72d8f7819be40b589b71ed7ec957b246906834ba13d008a23606453c9eac909b747faf6f047246109b3c00acc938d72e037efd72eaa9a7ee038c3c5a21c8b347d586d798275399c7c78e967cde6db39b77854c23395fa6885c2f534bd65bb4a928997c1d58e348b62d8f6b802bf279b3cd26d666e06f807f937c648be4237b2cda5414172606fc1a78f5873f6cdb1a8ff74cafadeddd307bf6c90bf32dc1f654935572288a1f5c054c0626efdc59be7dd6ac0f007a0653804e35514a99a78165c08e458b12993da779a10ea294304e1b38d703d3cacbfbcc504a5007514a101303f31d309352cf9d2177e5aa8328a548b3ccdad80ee6fce114a40ea29422d365b9f6bb328b63c80461c194a2788cb304cc4a602c3883eab5ca441d4429214c39700c38fbc079c58b12b589a594128b81b7c0dc0ea6ca8b02d5419412c1c4805b64d263b32cd01b36ea204a89e0f400d7002f02778273c88b523507514a08e739e039309eddf83582282580990f6609988ad473a7cfab92d5419422c7c444be76792a7a788b3a8852ec4c7625e49ecf1cd71c4429729ced604e9195aa99d2b5c3c66604b95686fbddc70d16ed29a1c34c4a25e44e2f388f0c77d43c1bb69b58cf89b450faf881657b4a6830311104d90a66ae2d2bdac4528a952b5dbb8f9d60cb884de1b86b81bb800f4597b705f8563ff23d2a1ca7360665a3b3331a7de0819a09ebd78fac79f4d19d5b62b10117440de973d87490e9c0b8d4dc184e02ee015e15d9c74c3e2f8bebb3b272e54ace39e71c8b555594ecd86c62b9bd74a7289c3c2bd23f992bbc54384e6de465a3a727e2dc78e3099f9a3f3fd17efef91fbe6fc3865f7c4efaab2b735da4c2716a2337e66a97f8db25766c1cc1660499274daaddc02781fb80a78083166d2aa5cf18d96f66affc3f59c56637ef0c5178df23bbd8be2cd39015651838df951bee421be31e99d88c2037c9a1281e6062a9ad349c37c0d99d6587002be85c2ca558684e6df86a7e0a666ca18caa8328458089004b812870ae8cad15041d49578a00a70fccc5b29ddf7f7bb55a301fd4419422c1791df86aa1ad6a134b09386631987bc1d4fa615d238812604c0cb84d26257e0938b5d035d008a204991a99a60470af1f15d008a20418e75d600e9873814d7ed44023881250cc67c054a7fe767e5b8851f36ca8832801c4c4805f888ce85ff959136d622941e432d76a419b6b9606441d4409226b65b3cd66e0277e56441d4409204e1ff033397c45731025301c3a1471c03c07a6194c206ede81a884a200ac5e1daf05a6028d401278d8ef3a152a82fc8708c79d5d207b4a1152556592c03bc02ee0dffdae0f0572904b80f105b0a31439975ffede5e51c0b9d8af718f4c6c3bc8b1c0ddc012cb769422a6a727e26cd820638238dde0bce673950e63bb8ff97e0999f78858c339b2363d13158e0bb18db56be333eebc7342e5e9a71f4cde75d73b2fd5d77767ca4279c1903e87cd247d26709ee41d0345aad1c02c80aeae2e003a3b3b9d6ddbb68d064826936759aae3a8b45d8ba88d0178f4d138008944343a71e2a199366cb818d4e7b0e52015c083c05f03878011035cafc27121b6b172e5ae331e7e387eecc4893d5d6565e6251b3682261c779274d325e4d827bd58efcbdae27e51e138b511241bb692f4374597f793729c22e72f059659b2a9141de61a30cf6eda543dd2ef9af4872d07e993a8913ef6cbf90f5559514961ca655ff33937df3cf1d4be3e5fe724f64ba1060a3f921eb36c3d584a38a9029e010e2d5af4e7b64864a0dd0bfc41e762293ee1ec07e75a60ea1557240aa2923814d441141f30178091f51ecedb796c7ee31bea204a81313159e3b11dcced7ed766207436af52681a81499293bee377650642238852609ca781b380078087fcaecd406804510a8889a4560b3a5b806bfcae4d3e6804510a8489c99ee6df0613f7bb36f9a211442914cdc03439764a132bf0a8832885623bf03be0f862c83dd2a8832805c2590f3480393e28ab05f3417310c532a65c2625ca9207a7ddef1a0d067510c5368b811fa7f20e53f0ed0b868b3a88629b79f27808d8e1735d068de6208a6d2e4aed69ce8162ca3dd2a883289630d1d42a52a71758e5776d868acd26d67ca03575e720013c2eab0b4341aca32356d9da4aaca323e6775d7ce26ba9dfdf5c29ce5294d88c20adc02299905609dc0afc54d44e4a16037160398d8d0d18038ed360e011e03a2775a308012606dc0c4c06fe495412937ed76a28d88c20db80df03ef01ef026dc0148bf682c26a6001469638a41e17044167b680448115c05ee0ce42ee6bee35b617029f0dfc4a64802a806ff4b319634908c755b4b5554c696aea3742ee6869d9d85d57e7a5285aa0657f3a3b23d18a0afaf2581015d8cf613b49df2a51a35efac37fdfcf7525211c174de46e4145138999d4d57965ce4d6084e35e78612455557d9c7df601aaabfbacd8182681108e4bd32b4dacf4f12a3011f820e3ba92108e4bc6e315b972ac643cbe1128d908d2d313716ebbed13333a3aca465c78e1077b962d6b7bdd6b1bc32050c271d9982ce27139f39062178e33f09449651e99478bd7b68227b866668239201ff96a3b368646d084e31045f73349f5ea9c2642d67f746d0c5faafceaa8678e03b006b8c2af0a150e67237022705b31cdd8cd854d079900fc1c68079e9566d55c11952b490cc480bf05488e19d3fde6aa55bcb16edd060716967e17af3926f5e8ec01e7f6621c35cf864d07b95592f30a7196f921881e574953928ee6e6b7bbce38839e9a9a92f847c98d89a5f24bb306cc2979bca168d0c98a1e21d1e36679da9658b428b0626816b84a9a5697cb961725833a88771c8e1ec09d7de5e5811543b3c0f33240bab354728f34ea201e90193d44182d4438dbc1b922b5debc34728f34ea20de7054f470526b1f42808981b903cc84d473a7e494fbd5418649c8a34733f0cd54f7bd69f0bb32365007193e218d1ee09a35b007b0b5759aafe882a96110f2e801385f03f3606abbefd2ca3dd2a8830c8f90460f134b6dccea7c08ce06bf6b63136d620d9190478f66e02d30b71c91f3294dd441864e98a3c72dc058e0da529e3a843ac8d00879f4e805ae075e29f6d582f9a039c8d00869f400704c4a80c33c11861b6cc97f40af0977f4309781f9cb5433cb31e014a510c3605007193ca18c1e870e451ce07bc083b27d732850071904618e1e3b7654548a5a09b2002c14d87490ab814d221cd72e1ba68cb268af10842e7a7474c462adad958c1fdfdb039c24827025356337173693f489c01dc06660bcdc6def933ef4a2237cd1c3c481e58d8d34a4f4ef6810c7b8ae5447cdb361d341fed1f5f7bbc08f809b2cdab34dd8a2c76ae0a2a3f5ef5820ad80267fab56386c0bc7b97958dab00bb3bc1668e1b8484f8f3375eedc19657bf78ee81d37ae7bfb33cfbc98c782a8a295b2696baba8686a9ad2af7c514bcb8e8d7575dd252b5fe4a650e3205f15c18633fa793dd0c271a37ff94bcaf6ee0560cf9225157de5e517786d6398786a2391c8ad359d484467dad1bf0bde775508079907dc037c5184acb31158e1b8484f8f337ec58a19c088de71e3badfbfe4921745dfcb331bc3c08a8d783c9953002f1e4f96b4005e21592002c667e6fb86a009c719b8c625fe56126268f9619eccae7f6742208077049bddbc9703cb24a1db6cd18e35c2d77375148b80358e64a9f2181201bc23d86c62dd0a8c93b190349dc0488b36bd266c3d572e9c04b070ddbad727edde5dd6505bdbbb61f6ec93b375b09434361d649ac5b2ad13f2e871989a9a9eb4f65d68c63edce85493fe0971f450d2a8836441a38792461d243b1a3d145007f9381a3d1437ea201f47a38772187510171a3d944cd4418e46a3877214ea2082460f251bea2047d0e8a17c0c75108d1e4a0ed4415268f450b2127a07d1e8a1e422f40ea2d143c945a81d24d2d3e368f45072116a0789af5a55abd143c9854d07f91cf01cb04fd67007661f89584747ac6aeb566a56af4e4b0f68f450b26273c1d44722f5f3af4191aa34100796d3d8d820424f69a7bd57a387920d9b11648bdc955fb76863b0ac0616a455d05c7cc99fea2841a710c271d3c5592a25aaf4778d55e1b88ab6b68a294d4dfd4ad9ec6869d9d85d57a752366ae32882b2818e75e1b8682231d0eb33b1a38616383134b5112ce1b87cb02e1c978cc7738aa125e3711543531bbe307d30bd583685e30c3c994d09cd40a8c4d0d446fe846d1c6411b086a3d5d0422786a6e48fcd26d6d9c04baee707e571a4c73abb79e3400258f8faba7593ca76ef6ee8adaddd70f2ecd9a1134353f2c7a683bc5ce0ed15f2a627a5864658c5d094fc095b134b5106853a88a2e4401d445172a00ea22839500751941ca883284a0ed441142507ea208a9203751045c9813a88a2e4401d445172a00ea22839500751941ca88328ca118e01cadd27d4411425c5c9c0ef80efb84fda5e937e237013293daa75c0d5407bae377cf4d14751f7a30d366fde5c9d4c268946a3d56a436d082b8069c0e9a28ff00b5b7549334716c89f270ef233e08981de545555d5031879b482cd75ef6aa3686dd4017f16fd847d69495a9b4dac6b4459f17f482d75bd19b80838c1a24d45192a6d40b338c868602d506e7349ecab2206b7d2756e3f709968f6ba392c1c1789442ee8ebeb731cc7a1b2b2b217a0b6b6f6e0881123925e55acadad6d546767a7e39616f21ab5519c36dadbdb2bf7eddb5701505353d39fd0a127bc03fc45c6b95dc0822cd77e5e3c570f3d0275d84cd2df038ecd383706d89be5dac3c2716981af482462d251c3eb08b26bd7aeeaaeaeaeb2aaaaaadefafa7a2b0a2b6aa3386d143282ac0596b99e9f0824f3c8419e17efb52622a636d4463f5c0cf4c9759b80729b49fabf8820db6725927c0b7812f893459b8a3254ea808744aa6a3f309f026c897183e4220781c780da3cde335d7292e916eba536d44626bf96c8d1075c6ab11e8a52949c2c3daff7fa5d1145092a1f9b8b153469d0a884c05ea055c29dd754039f16d9d197f2b87e284c90ce88761980b2c124e078692f6fb7f45da5f93430569a215e320d382ee3dc8bc0871edb01a8014e92ded5ed16cab74e1df006b043c64bb600e33db671b7f4a47d2013d3bc262af5ee045e931ffa49b93379c9d392dbbd02ec01fe17a8f7d8469a493265c8c63fed1ae0ff44c7397d4cf5d84604f8bee4c1dbe4a675b7c7360ac243c07f4a548b02cf02f7796c638acc0bbbc19283448085404c9ed7006f02b77a6ca7caf5b7033c923163c14b1e03fed9a283fc838572dddc08fc518619d28cc9f7cd4199ee1e916eb51f494f4212b85ffed9bc6487cc0bb3459ffcb3a6275a76487ffa448fed74c97ca1a94023709aa5df7291ccf8b639b3b55c9a3e9596cabf0eb843a2e034a04226231615c78b63b807114f937336a640db8a20994c9036ef5c0b655f0bec94a6c37a0b9340c7026fc9acd6b9162348a78c8df5cae4d6aa3cde972f23e466fbb844f2cdd2249deda18d82709238833be73851ce6526715e50080719096c00965bb6334aa2d6173c2ef761e0efe46f5b0e52e78a7c932507fdae87e51f27ff434fb8d63edd22794f505a4f79718c7c90535ce73e2b2399363e886d073916f82df060817e8879c01f3c2c6f9644a7a972a36a060ec8dfb69a42c8eff2b287e545a5b9bbd875ae5efed726e553405076b93d20bd3e17b87ee859f265d9ecbeb4c128e965fa83aca02c44fdeb5d1d035e908eda4fc9639534579e95bcf0450f6db9a99726a9572425073cde752edd9cb7998b5aa15966fa5e2e1ebfdfc290ff2459e978bf74f9cd016678587eb9fc205b812f4af9733c9e42710ca95d79af96efe73669c72ff5d04626369a58e5d27379a57c8eef498ba1c9633b5f9695828ba5ec2d83e9f10b4a0441beac5e71903ee02a0bbd273364a523d20e5d2a83469b3c2abf527a4b00bee13abfd1c3bdb9bb657dff17a429d72edf99e75b59bb78cfc22061529a715f9108f5b62ccff6eab748f3b8dc7c174b936ba5ac3f571445511445511445511445511445511445511445511445511445511445511445511445511445511445511445511445516cf1ff17c1a4c739f52b930000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (7, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda7930000144c49444154789ceddd7b7c54e599c0f1df4932991040302180140228208606290a6214a1a02c2c5ea85540e4da5dab5656c1c5226ddd46b7eb15452e5ea88a0a08555cd7aa513e280a6b654122b046a272a9102d9744129110c86572fa479ec03426934972de397379be9fcf7c2699999ce7cd24cfbcef7bce7b9e03e125312d2ded0460cb7da289207979791bf2f2f2ecbcbcbc0d26b6af31a227469ca90635430fe0c3a2a2a22400b9ff501e57ca15e19220e3806dc0e03a8f0f96c7c7b9d42e15e3dc4e9004e041e035e04c80f6eddb5700a4a6a69603b63cfe3fc05253432ea51ae276827881ab000bf81e18dfa54b9732804e9d3a9d909ea3585e7b29e071b7b92ad6b89d20c781f1c006e07c604d9de7df002e90e7c7cbeb950a9904b71b00ec047e1ae0f97d8d3caf94316ef7204a8535d309d20f580b940125c07386e329e5289309f2236023b05512a53fb0da603ca51c67720e324b92e31ebfc7be36184f29c75906b7bd5e26d8670303802f815f03ff5bcf6b07008f032427275f52565696d0a64d1b3b3d3dfd28c0dcb973f70e1c38b0d4c1b60d00da0147811d0e6e576344590c9309f239900e8c053603b701ff019c0b1caaf3dae1c0070d6d68d9b2650c1a34c8605395aa9fc921d611c9d4dac5618f02738061c0cb755efb9dcc57eaed41e2e3e3f702da83688c708fd124cfd433293f2807fc1a9491915102d8726f4438af1ed518e115c3e45eaca76419c950592272872c2dd96830a6528e3239c4da06fc0a781ee8026c97f9c8618331957294e9a526cbe5a65444d2a5264a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a056032416e91eaecfeb75906e3c59ca2228f272faf1545451e2dea6d88e913a6de03ae301c2306d929c0929123c9b26db02cb2c05e05cc04ab38880da8208543f16ad5742b8131b65df38ddcdf20553bc6badbb4e862b22ed62dc003c031a9cb9b03dcdf40f91e2d1c17a48202af77ecd8de431a7a3e2767f7e6f4f4f272a7e245f27be5440c933dc866e07ae02ba017f018d0533ee9ea6a2ff5b2282b2b03a0b4b4d4cacfcf6f0fe0f3f92e30d4c676b5710d72344671717c63cf0f494f772ada3f88b8f7ca89182613c43f4bf74a859377a5f44fdd4f382d1c17a494149f1768b0074949f16daee7fd6d89887daf5c88d12217035540ab402fd2c271c1b0dfae9979fce096e374a4c87faf5a16c3e46edef1405f193e5d002c04de014e188c192b6e05565b328394fbd5c014779b157d4c0eb106030b800e52ac3aa7cea51054b3d81e29f4fde9e2c5fb77a4a4540de8dcb96ad388117d27b9ddb268643241e6c84d396b86ecece8b977af77d7b061c7002add6e54b4d2a52691672db008d83d797271ddcb4828876982441cab00ac3b80ccc4c46adbedd6443b4d9088617bc07e08ecee35df5b4eeeca550dd004891cd3e51276bbc01eea766362852648e418202ba20fc82a051502ba58316258b781bd0c48054bf75a85882648d8b31381d6609580f589dbad89353ac40a7fd36a167cdaf7829dec7663628d264858b33dc03c5964375dd6b2a910d204096b5625f04b600bf007b02adc6e51acd13948d8b3deab3975d9d60f3317e89b1eb6ec0960df06b6b7e67babdaed16c5224d90b0647b8007812552f842b94413243cf5f49b90eb65b45da47390b064ed02fb3c39e96c8ddbad8965a1ea415e9165121786285e04b3bbd74cc8ad2ab056e9517377852241ae063a86204e14b03dc0869aa202f668b75ba3cc0fb1ce00e6033f033e331c2b1a4c057ac8d7dd5c6e8b325c380ee049e01ba98975021804e4d6f33a2d1c079496c6c73ff34c5a978d1bdba6ad59b377bbc7d3e8095161f97b44530c93093204f8a3cc3be21a4990e15288a05ecb962d63d0a041069baa54fd4c0db1bcc073c0cd400590d4c8eb63ba705c65659c357b76b773274c283e3874e8b1a32662b480c630a017e0038ae556227bb18e027303fd606c168eb36ff22bfe76b59918cd13eb314cf5207f957a58b5bcc041609c9e0d57af338132a0508aeba930612a41aaa5d7a8553bc43aa69515eb633d0cf6f29a23e87adc239c84ea48fac910ec318b40b607381bac2fc13a2415285518d1b558ee9a0eec04fb25b053dd6e8cfa214d10d7d871b2c3221eb844869f2acce86245d758d5605f2905bddfd7b305c3932688abac2f801bdd6e856a980eb15c614f037b01d89ddd6e890a4c7b9090b33d40b62c4afc2720c3ed16a986690f127a6972cd46e402432a8c690f1272d601e072b02f013e76bb352a30ed4142ca3e1fec36355f5b1fe951f3f0a7091232b607785dca88feabdbad51c1d12156e85ce777b6a02ebb89109a20a1f3b25c6c733af0a2db8d51c1d1040919ab1a78556e2a42e81cc4b08a8a380becf7c09e0eb67e204518fd8319b672654a67a00f3052ceb25ce1769b54f04cf62013803ce0b89c76fb26708ec17861c55354e46995974747bb10a9ecb20ff893dbed524d633241f280c9403ad05ffe495e32182f2cd89062c3aa73478ecc3a67d224ee5e38a04f15091f5dc39f6fd4e31e91c7e4102bdfefeb38a0406acd46bb95c0186c296965dbc4e39bf03ae3da5a30d6edc6a9a631bd3ffe42609d146df0027735b0fe282a0ac7790b0abcbdc78e1dd2d0f3bb73723697a7a7973b152f8acae5846d0cd393f41d406f3940360df8ff065ed71e180650565606406969a9959f9fdf1ec0e7f35d60a87ded6ae33a21beb8b8b1e787909eee54387f8efe1e1ae334d30952051cf1bb7d0a7405beaff3baa8281ce74b49f14a45c9869edf0c680f12bd315aa4a7148feb1de845915e38ce86776cbf2a707eb71ca7638573c1b5688961722fd66dc0402005e82785acf7f89d0b1195ee64c1f71ff0d3d30f5816c06a608a8bcd52cd643241ba00af4945c5776558355a8aca45a5393cd27a0dd75d3b82f71918b7c3defbe20abe5cbf7e930593ac9a63412ac2989c83fc566e31e36696de748cb609cf33836b2ffbaaf0c4c0019d6481a28a50ba16cb2136787ab1e7f6a7b9857c320e5cf560f75d6eb749b59c2688431ee3cefbf7d1a327c039eccd8e6fed89daa1642cd104714036d9c90b983dab0fbb98cb4347f57c8fe8a109e208fb81bff1a3844a3c14d2f10dabe6a2412a0ae872f716b2c103f75e75356fb080d9a5fdd879abdb6d52ced10469a14a3cbff050d9f3276c673953efb46a96f7ab28a143ac16c8263bb93f9f2eba9b07f9960edfe8dc23fa680fd202fb495ffa057d13bfa02f87e9f4c10bccd0b94794d10469261b3cebf8d3c82fe8cbd774abd2b94774d20469be19a35877d628d6b1858be60d618bce3da290ce419a610e8fb45ec81dff75b2e6daa40517b16591db6d5266688234c311529f9ec5e31dce612f6bb8fe393dee11bd34419ac806cf1e7afd1c208eeaaafd747fd4ed362973740ed27433de6744ab554ce253fa3f7b17f375ee11c534419ae079a62755b3fcee04aa98caf202e00eed3ea29bc921d64d728198e372d2d433724e70c4dac0f06732c9ebb99ca994e3bddffdb94791a7ba3a0f28f2b8db8ee865b207e90adc076c033aca51e68552dd3ce264939dfc1c23267e4d37e6f140d5579cfd52cda506436fd32652121359525e3e32abe6347f2b2b3797551515cccccad233179d6432417eeff7f501e009608ec17846cd64f18c648e27cc670ea358b73a9b6c27abac3489d7cb4adb664c4d7220b530b82131917668713a4785f2422e2b807860523dcf8575e1b8b8ca4aabcfe8d183130a0b938ea6a697efcb79fde3204e88325266c6b60bbc15150d17a74b4cccd96c595a9ccea918a19aa4df28051b7ed2c0f3615d38ee93f99f5354781ec328a474e60c6f7c6bcf50a76304cbb68b1a79be78886569713aa762842241c6038f01a3a480757dc2b6709cafcc17f7bb972fbbb48049d664ef2bbe7957f7fa88d3631b476204a7d2f2f95674aeaa5ade5dcab8d6cbb2b4389d8b319aec06a050ea630525dc0ac73dc9ad0f2673dc06db9ecef3cb4dc408243717cfd6ad4ccdcd65776e2e7623372d4ee7700c933dc8446011f0cfb2272be2d49c2df8d4f86b798dc79975349523215bb19b9b8bc7b6b901b8c7b2e8e5f75401f0b46571be6d5b13642f1660afaea86066a8da172b4cd7c5ea20c7426a95026d0dc674d401badcd285033d3b71980798775728ce166c24311e6bd78ea77bf7ae1942e5e5adef565d7d282b2eaef3a6cccc11f5edfc502d643241320d6edbb86cb2932f66c663596ce237dc7f30933ca3670b3625314e4bab8c8b4b438bd399a34b4d1af0153d9616909e50403a499c7ccfd4d982cd4b0c152a9a20f5b0c1b3934786fb88e743861a395b501323326882d46f463f76765dc1140ae97847270a1d9b7b686244164d903ab2c94ebe8bd60fcd66015d3850d091c2679dd8ae264664d213a6ead84ffad2f9cc69df8b3d2ce6df56b77cc56ea5b5752b53817ccbe24538951c05c0ac76ede873e1852cd4e4084fda83f8b1c17323de6b00523952558ef73f9bbfb54acbe77b87aaaa45832c8bcbfc9ed01e23826882fca3192f7163dbdb78827719f54473ce16ac1d4a95978f190487015ac9539a181148134464939d7c9405bf69c751b2d85490c5a65f37e56c8f1fce310e0360591dca6dfbdbb99a189149e720623fe94bcf616ff70798c711521f0a76ee51bb56aaee1cc3b23a942724ccc5eb5dfbb1ce312297f620d49e2d78f9c423a4b28499551578973776b660637ba5bcdeb53fb76def50db8ede6b32c6024d10e01eee9b32904f12eee5f7649217f06cc16077d7e6e5797f169ad62b93623e416a56ec56cfbd8a37b992b70a5ee5ba9b5fa8e7757a1c2336c57c82fc3b8f2eeec7ce9e53588187ca3f8c67cd09ffe73531625b4c2748e5715fdc2b8cff976fe8ca327e71f22f5c7a6ac5ae268622d613a464f1ba6e161313007ab37b8d05159a18ca9fc9ddbc1703ef0125720e7792c1584d5274b2c8f359d10ecefbf0e1b3f6d08b27f955f1b0e17fbe5d9784a8ba4cf62027a5d4cfb3c06a837182974d0ab06464cec82c1b1b6b06de893be1f63e4fadf55ccb56bfa4407b0c85e104d92eb701066334d54a608c2d45496c0b56ff180a3a3269e1e9d76862a8534251386e80244a2be9551a7a8dd1c27105c70bbc63d7365c70edad91a9e55ddb4edd1f1f3fe510788229ebd39868296513d331c265926ebc705cf1c9c0256b4b7c8f78bbc70fea03f46969ac3ac2ae189ac608afc271c1305e382e2529c50b34d883a42475d2826b1ae307c26588754a464646497e7e7efb8c8c8ceff2f3f3cf74b425d9bc0d8ca9e799b7c976b6e8b314281b066ccccccc1ceee4b63546e862c4da6adec9c06a4b3e17e47e3530c5ed86a9f06472887521b0d5effbda251c6d1daeb31bbc6c8a8149ebb7aeef7ea8ec5056e7e4ce9b460cd2826baa6126132437c49757085a5a525a655a92165c538d8bb52196524da209a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a254009a204a05a009a2d469ad8144ff07344194aad117f83fe021ff074d9f933e1b9803a400eb819b8083817ee0e4c993f1fef7266cdbb6ad8dcfe7233e3ebe8dc6d018e2292013f8b1d44778dd545b6a5d2e27c85f2a09f22af056633f949c9c5c09d8726f444646460960cbbdc6d01800e9c0b75205b404e889e121d62fa5b2e25f8062e06e2998d0cd604ca59aab00982e09d21e78194834794aeca7520c6e99df63df01d749cd5e7fa70ac7c5c5c55d565d5d6d599645ab56adaa003a77ee7c222929c9e754c30a0a0ada9596965afea5859ca6312233c6c183075b9594947801d2d2d21aadc2d312df00d7d7796c1f70433daf1d2e99ab37bd85d5cde424fd0870469dc7ce040aeb79eda9c271b505bee2e2e2ecda5ec3e91e64dfbe7d6dcacaca12929393ab7af4e861a4c28ac688cc18a1ec415e0616f97d7f36e00b620eb241b27783c1b6690c8d519f2b816a79ddc740a2c949fa1fa520db45d293dc0fbc0d7c6d30a652cd950ebc20a5aabe032610e4a5c05b6296cc454e006f009d83f8990132273179d9048da131eafa407a8e6a609cc176281591faca9ed7056e3744a970f583b558e1561a345ebac02a204fba3ba7b501fa4bd9d1ad41bcbe39bac8ce88837200ca84eec059325ede65e8bdaad51f489561889332814e751edb021c73380e409a5c62ef88bc5f11271df812d82dc74bb6031d1d8e315ff6a47d2f0bd39c162fed2e0576ca1ffa6df96472d25a99db7d021c063e037a381ca35677593264e29f7635f037a9e35c7b73fa024671c0a3320fce970fadf90ec708891780ff965e2d1e78175818c4cf35456f591736cb5082c40193008f7c9f06fc15f8adc37192fdbeb6805575562c38e90de0698309f23b03dbf5371bd82387196a057ddd997059ee1e27bbd59e903d093ee049f96773d26e5917664ab5fcb3d62eb42c92fde95d1d8e5326eb85fa0023817e86fe969365c5b7c995ad8932f4696568fb3381fba417cc04bcb21831a29c2589e17f10b19f3c666209b4a91ea4ae2e32e61d6d60dbb7007b65e8b0d1c022d054e02b59d53ada600f522ac7c6aa64716b72103f17ac24f9b07d537af26d32241de1608c90e825c9e03fe7385b1eab3b8973422812a42db0095862384e3be9b5ae7078bb2b803be56b530992eed7f3f59439e8c30e6ebf93fc0fbde577eed33c99f784cbe82928ade51739cfefb18be448a6895fc474829c017c043c17a23fc478e07307b7374c7aa73ef241351d382e5f9b1a0a217f975c07b7172fc3dd697e8ff590ffb5eec16c205cae727b5cf6fa5ce6f7871e266f96c9dd9726b493bd4c9fcb1994a1687f0fbf1d034ea8edb5df91fb6419aebc2bf3c22d0ec6f2d74386a44ef1c91cf02cbfc76a87f326e7a2464c9795be1325e3bf3370c8bfbb9ce9f8a4ecf2bb1c18ece0f613e50fb2031825dbbfdce12514ad811c49be7140b68ce3e73a18a32e1343ac44d97339557e8f4764c4e0e8d58681abe44cc169b2eded4dd9e3172e3d08f2665549825403330cec3d192c673a22e3d0b972d0e86387b6df4af69600dce5f7f86607afff5d2ee7f75f2143b983f29ee538b4fdfa1c317090d027c3b86ba487da2fa7673bf5b7a8f5a67cf84e9321d73239ff5c29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a99f277617e2a39eb5547650000000049454e44ae426082');


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
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (2, 1, 1, 'Koordinaten', 'Ein Punkt in einer Zeichnung ist gut sichtbar. Allerdings müsste man immer noch jeden Punkt von Interesse
einzeichnen. Sobald man zwei oder mehr Punkte hat, wird es unübersichtlich: Welcher Punkt ist jetzt z.B. in
einem Text gemeint? Man müsste mit dem Finger auf den Punkt zeigen, Pfeile malen, oder aber die Punkte benennen.

Die bessere Lösung bieten _Koordinaten_. Damit können wir die Position eines Punkts durch Zahlen angeben. Dazu
werden zunächst _Koordinatenachsen_ festgelegt. Eine Achse zeigt nach rechts, die andere nach oben.

![image](course:1)

Der Kreuzungspunkt der beiden Achsen ist der _Ursprung_. Man kann die Position eines Punkts dann durch zwei
Zahlen angeben: Die erste Zahl gibt an, wie viele Einheiten man vom Ursprung aus nach rechts gehen muss, die andere
Zahl, wie viele Einheiten man nach oben gehen muss. Die Achsen legen dabei fest, was "nach rechts" und "nach oben"
genau bedeutet. Folgender Punkt hat zum Beispiel die Koordinaten "1 nach rechts, 3 nach oben":

![image](course:2)

Dafür gibt es verschiedene Kurzschreibweisen, z.B. (1 | 3) und (1, 3) und (1; 3). Alle drei Schreibweisen sagen
das gleiche aus. Gerade die Schreibweise mit Komma hat allerdings die Gefahr der Verwechslung mit dem Dezimalkomma:
Ist der Punkt (1,5,5) jetzt "1,5 nach rechts, 5 nach oben" oder "1 nach rechts, 5,5 nach oben"? In der
Handschrift lässt sich die Schreibweise mit Trennstrich ebenso leicht schreiben, deshalb benutzen wir sie hier:

![image](course:3)
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
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (4, 1, 3, 'Abstand zwischen zwei Punkten', 'Bei zwei Punkten ist es oft interessant, wie weit sie voneinander entfernt sind. Dabei sprechen wir beim _Abstand_
von der Länge der _kürzesten_ Verbindung zwischen den beiden Punkten, also ohne Umweg -- bei einer Karte wäre das
die "Luftlinie". Für jede andere Verbindung müsste man den genauen Weg kennen, um von dessen Länge zu sprechen,
aber der Abstand ergibt sich alleine aus den beiden Punkten.

In manchen Fällen kann man den Abstand direkt an den Koordinatenachsen ablesen:

![image](course:4)

![image](course:5)

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

![image](course:6)

Die Richtung ist auch unabhängig vom Abstand. Zum Beispiel ist die Richtung der Verbindung vom grünen Punkt zum roten Punkt die gleiche wie
zum blauen Punkt, aber der Abstand ist ein anderer. Die Verbindung vom grünen Punkt zum gelben Punkt dagegen hat den gleichen Abstand, aber
eine andere Richtung:

![image](course:7)

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
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (8, 1, 7, 'Vektoraddition in Zahlen TODO', '... (wie begründen?) TODO
Übung
- rechenübungen
', NULL, '{"type": "explicit", "exercises": []}', '');


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

