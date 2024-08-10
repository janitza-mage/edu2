--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

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

arrow = (context, x1, y1, x2, y2, tipSize = 0.2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ndx = dx / length;
    const ndy = dy / length;

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx - tipSize * ndy, y2 - tipSize * ndy + tipSize * ndx);
    context.moveTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx + tipSize * ndy, y2 - tipSize * ndy - tipSize * ndx);
    context.stroke();
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
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (3, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda79300000fb349444154789ceddd7f7454e59dc7f1f74c42424204128c84c0866845a91689c489adbf8bd8c5654b399c6daa94563d87bab0f658ea5ad95df767cf51b7d596b5a7b5dbf690b2d4ea71bbebf668b13d15562d34a22008b3e21145b2b134d8682218031192ec1f7ec7bd8e334f26709f999bf0799d33672677eedcefcd8f6f9ee7defb3cdf0bd152525d5d7d1818b4e7121f4192c9e493c9647230994c3ee963fb8a317a62c47dedd071a807367576768e05b0e74db65ca420a292208b80ed4053daf2265bbea840fb2527b942274831f0cfc0c34025c0c48913df05983469521f3068cbff0bf881af2e974836854e9052e0d3400c380434d7d6d6f6024c9e3cf9b0b51c5db6ee25c098c2eeae9c6c0a9d20ef00cdc093c06ce06769ef3f0234dafbcdb6be48de14177a078017804f3ade6f1be27d116f0add8288449aef043917f815d00b74036b3cc7130995cf04990a3c056cb544390f78d0633c91d0f93c065969c9f1778165af798c2712ba98c76d6fb403ec338006e025e036e03719d66d00fe05a0bcbcfce2dededee28a8a8ac1bababa8300ab56adda3b67ce9c9e10f7ad0198001c049e0f71bb8a31ca62f84c9017813a6001b005b809f87be06ce040daba57004f64db504b4b0b8944c2e3ae8a64e6b38bf5a6656a6a70d8b7805b81cb8187d2d67dcb8e5732b6204545457b01b5208a11f518c3f2a30c07e51d76c12fab73ce39a71b18b4672fa23c7a5431a215c3e759acefdb30924b6d88c8576c68c9531e638a84ca67176b3bf017c08f815a60871d8fbcee31a648a87c0f3559670f911149434d441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171f09920cbad3a7bf0b1d2633c91d0f99e30b501b8ca730c116fd4c51271f059176b397017f0b6d5e55d0fdc99a57c8f0ac729462463f84c9006e054601f7026f06d6017706d867555384e22c9e73148304bf75a8593c7adf44f5fdaba2a1ca718a321c609f904700c2873ada4c2718a11a5183e5b9066eb521d003e02dc0bfc1238ec31a648a87c9ec56ab20aefafdb5d6cb701d77b8c27123a9f2dc8adf61019b1741d44c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a1011877c25c8bf5be1b80bf2144f2414f9489085c069798823123adf09321eb807b8c9731c112f7cd6c502b80ff89dd5c43a0c246c6e7a3a158e538c48c6f099201f077e68c71df121124485e324927c156d2805d6007f0ebc0b8c1d627d158e538cd11023676702fd40973dbaed2cd6416095eb832a1ca718518ae1ab0579d5eaf2a694021dc022608ba79822a1f3952003d66aa4a4ba586fabb2a28c24be6fa09372240f67cc4442a7a126220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004117150828838f84c90cf0149e01d9b76fb28f0118ff172d6d9d93926994cd2d9d939a6d0fb22d1e673c25412586a657fca80db819f5ab59342a902be7be595575e343838482c16bb087800f8b225b1c807f84c90dd81d771a01d68f6182f17f703570f0e0e0260cfd75ab58b0505de378920dfd3602f007e6d451b4a81af01ab33ace7bd705c7b7b7be982050bb2b65eebd7afdf525757d7772231d28c96523627750cdf73d29f076600f5c075c0ce2ceb4d042e07e8eded05a0a7a727b67bf7ee8900fdfdfd8d27ba235d5dee1e545757d7c7ebeaea4e344c261352df9b478ae12986ef043906bc1978ec02a60187d2d6f35e38aeaaaaaad475fc535555b505500ba2180573ba158f9be15ac973e1b8c76c1fd21febc30e14e562688a913b9fa7796f02e6d899a373ad90f52bc05e8f3187b2147830167befd0cb9e1f04be50c07d9208f3d9c5aa051e06a658f76a1330df8aca154a17b064e3c68dd30f1c3870514d4d4debdcb9739714707f24e27c26c8edf6889ceaeaeaa3d5d5d500470bbd2f126d1a6a22e2a0041171508288382841441c9420b9bb14b82d87bb65e56225f0d913ddc89e3d7bca5a5a5a686b6b0b639f24837cddfe60a41b67a37eb702dfccf0fe74e07cbb081a07fe7b88edfd13b019f859daf238f051bbea7b9a8d95db6ff775fcd0f5a369d3a6f5dd7ffffdb4b6b646621ac168a404c9cd6dc054bb8e131407fe004c4a5bfe97c7196713705196f71e006eb4f935f0deb09c8165cb9671d75d779d6a2ddca6e38c2b59a88b35b4329b2fb2097821c3fbafdadd7c57d870fa13f114702bf0c7c06c6b49be08bc082cc934127ae1c2859494940cd8e724646a4186768d0d975997e1bd01a029f0f594138cf5371996ed047e03b4d92ccd1b836f565454d0d4d4f4c6e6cd9b17007536ef4642a21664688bedf9d705dc87c336a832e368e38b2fbeb80b28023e93ff5d1bdd94206e45d6b7df0fbc96c7b81540a5cde1ff13e0e776c0fe6f99566e6c6c7cdb5e7e328ffb78525017cbaddee6106ccf73dc8781ab025fefb7716ddfc8b4f28c19330e5b776f76fe76f1e4a00471abb6e77c177478c89272ac9d3e9e6dc717e5762bed0f282e2e1eb4db6e4fcef37e8e7a4a10b7327b0e73a6612ed6a47dbdd8ae999c63d34507337ce6884d5d8e65795f8e838e41dcdeb0e7ca02efc7c37661f1522b84914995edaf9223443e13e44bc0b37661ab03f891f5e74792fdf6075753e81d09cce39f96fe46777777b1b5763ac51b329f09320df8ba0dbfb8daae17dceb319e0f5d7671f06381ee962fae124cf5d67a00bc94fee673cf3d778abdd495f490f93c06f987c0ebdf03df1ba1577b37588234a52aafa49912489e5457ac6aefdebd634b4b4b292e2e2ec931ce65c09d567df225e0806def42e02bd6fa3e9256900f806ddbb68d0fecab84c877e1b8a09fd875854c73c0bd178ecb102fa71230c96472dc92254b2e983f7ffeefefbefbee97d3df5fba74e9793b77eecc7a8c326fdebca3ab57af6e0d2e6b6a6aba64e6cc9907d7ad5b974c2ddbba75eb292b56ac98ddd7d75794be8d783c3e3877eedcd7efb8e38e97cbcbcb8373fa1b80090b172e1c3874e8d0d10d1b363c6367b4c2345a4af244b2705ccae76da0dff959def75e382e8b218b88cd9a358b4422c1d34f3f5ddbd7d7575b5a5afa81f7172f5e4c6363f6dd3bfbecb3c7a4c7282a2aa2a2a2a22ab83c9148d0dadacace9d3b696f6fe7e0c183c46231a64e9d4a229188555656d6643a164a2693ecdbb72f7ef3cd37971617175f36ccef7f382257d42d1f31f29120cdc0b7814f5921eb4cbc178e4b33acff26cb962d1bbf7cf9f2f35b5a5a5e59b162c5fee07b8b172fcef6b1ac31fafbfb2fe9e9e9396805bedf575252422291209148e4fc7dac59b366426565e5607373f36f81fe5c3f380c91fdef1ec118c376ad0d079f93eb073c178e83e32f22f6533b1b571e428c836114ab5bbb76edb6582c3678cb2db77ce8c03d2c512eea968f183ecf625d037cc7aaa6e77ba8860f9fb703f2de42ef484a636363cfae5dbbb8e1861b3a0abd2fa395cf04b91d38d5ae85a44a7c7e6898844894f93c0699e571db23dd48bb607ad2d250131107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c7c26c827ac0c4db74d96d27df464c4f1992047acd4cf0a8f3144bcf239a370873d1a3cc610f12a1f85e31a2c51caac55c9b64e240bc729c6c91d232a097205f044b60db4b4b40ca756944868a2727f9048178e530cc5f0a9613867b1225c384e314ec218ba0e22e2e033412eb09663877d9dba957185c79822a1f2790cb22dcfb75710099dba58220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a00411f97fe38092e0022588c87b66024f03df082ef43d27fdabc0ad4015b011f812d0e1fac09123478a82cf3e6cdfbebda2bfbf9fa2a2226f93b71463c4c5f83e300bf898d547f8b9af7d49996713e42fb104f90fe017437da8bcbcfc283068cf5ee463debb628cb81875c01b36ebb51b381dcf5dac1badb2e266a00bf82be06ae08f3cc614395eedc0f5962013818780129f5362775931b896c0b2b7803fb39abd41ef178e8bc7e3970d0c0cc462b118656565c7006a6a6a0e8f1d3bb63fac1d6b6f6f9fd0d3d3130b96160a9b628ccc181d1d1d65dddddda500d5d5d5d9eab885e277c067d396b501d76658f70acb5c3df488d4c3e741fa9bc0f8b46595c01f32acfb7ee1b85481af783c3e986a35c26e41dadada2a7a7b7b8bcbcbcb8fd5d7d78759904e3146788c7cb6200f01df097c7d06d09fc331c89396bdde8a8829866264f1a7c080adf72c50e2f320fd87c017800bad25b913780c78cd634c91e35507acb552556f019f03def51d74a51d8b1c061e016a72f84c831d93f8bc6d82622846ba27ace518001679dc0f911169a69d795d5de81d1189aa0f8dc58a5a69d0226b028f01496beec256019c071c05b67ad83e40ad9d8ce8b00b503e4c07a6587f798fa79f55ca79c024d73d5c8ed32c6072dab26780b7438e03500d9c696757f778d8be7775c04bc0cb76bd6407705ac831eeb13369876c605ad88a6cbf7b8017ec17fd98fd670ad3afecd8ee39e075e07f80fa9063a44cb721433efe681f04f65b1de7d4e3ac9063c4816fd971f06efba7754fc831f2622df09fd6aa15018f03f7861c63868d0b5be92941e2c012608c7d5d0dbc0adc1e729cf2c0eb18f040da8885303d02fcabc704f95b0fdb0dfa2af08a5d6648a9ccf5c35119ee1eb7d36adfb33309fdc07df6c716a6976d5c982f03f6c79a1a68d969e7d3a7851ca7d7c60b9d055c099cebe977b9d4467cfb1cd95a625d9f324fdbff32f0756b056701a53618714499628911bc8878ae2df33104da570b92aed6fabcf33d6c7b39b0d7ba0e4f7918043a09d867a35ae77b6c417aecdad8311bdc5a9ec3e77235d6fed93e6a2df976eb92ce0d31465e9c69c9103ce638c396a51fc485211f09720ad00a7cd7739c09d66a5d15f2767f02dc62af7d25485da0e53bdd8e41bf19e2f627dbdfd02f02739ffeda8e7ba2d27bcac938fb463e1a5876a15dc9f4f18df84e90f1c06f813579fa4534032f86b8bdcbad753acbfe515d0fbc63af7d7585b0dfcbb610b75764ddddeb02cbeaed6f6d7a2e1b88ca5d6edfb1b33e97057ed197db0fcbe7e94b1f26d859a6176d06653ef6bf3e7062200ca956fb97f65c6edd95c7edb8f099106305d55b97342cfd760c3825b02cd59df7792ceac5f536d2f71acbf8b73c5cf29f6e331defb3537ef380a610b75f62bf90e7814fd9f6e7853c84621cb0de926f11f08fd68f5f15628c743eba582576e6f28bf67ddc6d3d860521c7f9b4cd14bcceb6bd633867fca2d282603fac63962003c00d1ece9e34d94c47ac1fbaca2e1a3d1bd2f6cbec6c09c0d702cbb784786fee3e9bdf7f9575e53aec67b63ea4ed67f2a6878b84fdd68dfb8cb550ff6bd3b3c3fa5da43c6aff7cafb32e578bcd3f1711111111111111111111111111111111111111111111111111111111111111115ffe0f1417f32da41667a30000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (4, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda7930000113d49444154789ceddd7f7454e59dc7f1771220240403a10164354641055930a0d068552c28470fd2e2b20db555a27b4eba8aec59bac74277cbeee9768f965a6b176ba5a52bb5b68563774b7b90989eb5452860a3b141180414508a760123413024fcc88ffdc3efb077879927c3709fc924f9bcceb927993b77ee779267bef33cf7dee7792e64967ec5c5c52d4087fdece723482412591f89443a2291c87a1ffb578c9e1323dbd71b4a4129b0b1a1a1a13f80fddc68eb45ba44a624c82ca01e981cb37eb2ad9fd545ef4b7ab9ae4e903ec0126035301860d0a041a700860c197212e8b0f5bf027ee8abc92592485727482e3013c8028e011523468c680618366c588bd51c8db6ed0d40dfae7dbbd2db7475821c072a80f5c0d5c07fc63cbf06b8c69eafb0ed45d2a64f57bf01e00de0d38ee7f775f2bc88375d5d83886434df093216f80dd00c1c019ef61c4f24543e13e42f800d409d25ca786095c77822a1f3790cb2c092e39f03ebdef5184f2474591ef7fd3b3bc0be0c2803de041602bf8fb36d19f0ef00f9f9f99f6a6e6eee535050d0515252721460d1a2457b274e9cd814e27b2b030a81a3c0eb21ee57317a580c9f09b21328016600b5c083c0bf0057020763b6bd197829d18e56ac58c1a449933cbe5591f87c36b10e5ba6463b877d07780898023c17b3ed8776bc12b706c9c9c9d90ba806518c4c8f714e7e14e7a0fc805df04be8aaabae3a0274d84f2f32b9f7a86264560c9f67b1965937921bad8bc8df5bd7920d1e638a84ca6713ab1e9807fc1818016cb1e391431e638a84ca775793676d11e996d4d544c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a1011079f0972bfcdce1e5c16788c27123adf03a67e0bdcea398688376a628938f89c17eb7ee09bc047362f6f35f04882e97b34719c6264640c9f0952067c02780718053c0e6c03ee8ab3ad268e938ce4f3182498a57b6d8693176dea9f9331db6ae238c5e80931cecb75402b90e7da4813c7294626c5f05983545893ea203012580ad4002d1e638a84cae759acc936c3fb21bb8bed6bc0bd1ee38984ce670df2902d22dd96ae8388382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e290ae04f9854d1c776d9ae28984221d09f21960681ae28884ce77825c003c063ce8398e88173ee7c502780a78cfe6c46a0126d9d8f4589a384e31323286cf04290796db7147762709a289e32423f99ab42117781af85be014d0bf93ed35719c62f48418491b05b4018db61cb1b358478145ae176ae238c5c8a418be6a90b76d5edea85ce000300ba8f514532474be12a4dd6a8da86813eb23cdac28dd89ef1be8449d48c3193391d0a9ab8988831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a0041171508288382841441c9420220e3e13640e10018edbb0dbe781911ee38984ce67824480bb811260bc4dfff3738ff14442e77344e18ec0efd9c07ea0c2633c91d0f91e067b2df0df3669432ef015e0bb71b6d3c4718a9191317c27481f7b53a54025f06b605d9ced34719c6424df9336b4028703cb36e022e058cc769a384e317a428cf372a94d1e77b96b234d1ca7189914c3e759ac078189401130d626b2de03ecf5185324543e9b582380d5c085d6bcda08dc6693ca89740b3e13e46bb688745bea6a22e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004499fd7819fc5acfb830d0548c6c5c067437c3f33ed3ef69d6a6f6f67f6ecd913a23dae7b1325487a8cb1b1379f06f253dcc7a5c017427e5f4959bd7a3543870e3dd115b1bb5aba6ee2d9dbdd053c0b5c0ddc01fc22f0dcbdc0744b9cfb802df6f809e0b48da9b91ef8271bd3f0a2d54475b367cf9e909d9dcde9d3a727dae8cdd76cf0d9621be25c6abda7ab2cd62ce0511b8ff3bbc07be867cb59636e0e1d3ad4b7a6a686cacacaffd9b46993ffff54865182a4c71ce05660a77d588309d2df12e046e03f806b808596545b8081c029e0111b4230c75e57b072e5caadb9b9b937eedcb973574545c5e3c04df6dc684b86261bc1596689f23de0069b40632df0ae6d3f0bf862bc26dcc30f3f3c72fefcf934373777f8ff37651e258867757575038106fb463f00fc081864a3280156dacf8d403150006c027e60b5ce6abbbf7cacbe0b172ebcbcb1b191b6b6b65156d344bd12a80d76594d926733cdfcc9d6afb264c18e2dde8c13634a565656c7840913d8bc797348ff91ee4509e2d99a356b86da87333a50ac00b813f8b1e3655f077e65dfec2f03b7c4d96651494949cbd2a54b696d6d8d4c9830a12cf0dca9c0ef6d81720e26d1e9c0ef876c8975fdd6ad5b07df7efbed3435358db5b13c6b80cf74fe97f70c3e0fd2ab80576de2b8e83767a1c778496b6868e81b8944686868e8eb334e7b7b3b1b376e2cb6638f91b6dc69cda7a8e881f74dc0fbf6cd3f0ad80afc2b50075c69eb87065e37b8b4b4b40560eddab54392f8b28b58d36ba03d9e1e78ee62e053715ef3cdf5ebd7d7d6d4d4b064c99237ac3c434f8e7495472a7cd6201701df00eaad607f022cb583d2ae52043c396ddab4eb3b3a3ac8cacabade9a38f36df6c750d5d7d73364c89093870f1ffe7360f5ef2de6307b7c0aa8b56991fec6d67dd58e4b72acb9f45b1bcfdf016c079e049e58b56ad59cbaba3af2f3f3072631a945934dbb540dec8ba965ae4b740ce2595acb23d37d0978abb38d3c4fdaf042e083165caac30e94c9131164508c8c2f0fdff36205fdd4be11e39dcbf73e71dcfefdfb7367cc98519ee8f9eaeaeada0f3ef8a0eff6eddb0b00e6ce9d7b908f6b818214d795eddab5ab70c78e1d2d4d4d4dfb43d85f8f8ab179f3e641cb972f4f3857737575756d4949c9c9f328f258294dfb93ae83f42fda840d13123c3f089802d0dcdc0c40535353d68e1d3b0601b4b5b55d73be6fa0b1d15d6337363696d7d6d6b26cd932f8b830af04389f75ebd6ad63d9b26579c09561ecaf27c558bedc7d11bfb1b1b1bca4a4a493524d4961f4b3968c74244805f0b81d14be97601bef13c7151515e502096b90a2a2a2daf2f2f2be05050505b6ea2040797979418aebcaa64e9d5a387cf8f096a6a6a6fd21ecaf47c5686b6b73d620454545b54097d720bedd6567662626fb021d83f4aa18195f1e3e4ff37edeba4bccb0335999e06e605556d6c7875ef67315704fcc76fdec6c51b2f733b9d8be0892f557364f716fd7abcb2312e79b21de15e1ff271d538fae5bb76ef3ca952b3bd6ad5b97e8f2f0df01cf041e8f066aec9fde61d72982620b64caf8f1e31b0b0b0b3bf2f2f24edb6b47079ecf02deb053b929eb013508a4561e77c4f96c7d3bf07c68e5e1f318649cc77d9f97e2e2e2d3c5c5c5c45c4d0e9a674b542bf04be031bb26d199d2e9d3a7bf3f6ddab4c1adadad7f9c3973e6516b368c0a14e8b316e3e570feaaee2b85f2c0bad08c493244cae5a1ae2667bbc2fa2e05bfcdf6d8f28924f7f193cacacafbec0af809bb22be03186ebd0ab0deb48bac99abe958138b571ee72ae5f2d07890b34d00de8eb9d27cbe6eb09eb30703eb760283cf61c0546f95a83c4a8077ac69f4bd73f8f2e25cca4335c8d90ae3dcbf246591486400f02dbb1614ec327edc9a6e83c38ad543c52b8f3781cf01bb6d72f425d6eb794accfff82ce75a1e4a90b31d052e0863477bf6ec61debc79e3ad9b4d4dccd303ecffefed64440f11af3c76db12fdfd1e6b025f6cc30ae24aa53cd4c43adb16e0323bb598b26ddbb60da8aaaaa2aaaaea1deba8196b8c5d20dd773e717a8164ca237a709ff00b3fd5f250829ced2d1b5474dd79eca3ec81071eb87ac1820567fa1fc531d52e94e900dd2d5e79ccb421048381ab6c28c5163b268927e5f25082c4f7fd986ef9c3adbdda608f77dbe3d1095e5f75ecd8b1be8b172f66dcb8715302a712a33d0ab280b916473a175b1e636ce0d6411ba37fc8baea273afe48b93c740c12df0fedeaff481b0978f01c7b3e3f188944c6da41e38671e3c6dd1cf3fc9d9664bdfe1a489262cbe3515b929572792841e23b05fca5c7fdafb64592d365e5a12656388ed9b978c90ca1958712241c47817febea37216784561e4a101107258888831244c4410922e2e03341aeb3b11347eca24c7f8fb144bcf09920276caa9f073cc610f1cae785c22db69425b1ad48464ac7c4716596287956ab24dac6ebc47171e2f99e0246317a408c4c49909b819712ed60c58a154c9a34c9df3b14492053fa62799f382e46c67e632946b78e9192b273398b958e697f7aca74398ae13f86ae838838f84c906bade6d8628f5bec714127af13c9183e8f415e4bf3ed154442a7269688831244c4410922e2a0041171508288382841441c9420220e4a101107258888831244c4410922e2a004117150828838284144fecf80d83b592941443e361af883dde0f30cdf63d2bf0c3c0414d97da8ab02f7a58eebc4891339c19f3ed4d7d717b4b5b5919393e36df0966274bb18cb8071761f920dc0af7dbd97a85b6c80fc0d9620ff05acedec45f9f9f9a7810efbe9453ac6bd2b46b78b51027c60a35e8f0097e2b989f5259b597113d0087c15b8dd6ed52b9269f6db7d103b8041c073403f9f4362b7d964702b02eb3e04fedae6ec0d3a33715c7676f64dededed59595959e4e5e5b5020c1f3ebca57ffffe6d61bdb1fdfbf7173635356505a7160a9b6274cf18070e1cc83b72e4482e40717171a279dc42f11ef0b99875fb80bbe26c7b73e0cea35ab464cce2f320fd307041ccbac1c0fb71b63d33715c7482afececec8e68ad11760db26fdfbe82e6e6e63ef9f9f9ada5a5a5614e48a718dd3c463a6b90e78027028f2f03da923806596fd9eb6d1231c5508c04ee00da6dbb57817e3e0fd29703f7009fb49ae411e005e05d8f31455255023c6353557d08ccb1db4f7bb5c08e455a8035c0f0245e5366c7243e6f9ba0188a11eb25ab39da81591edf8748b734dacebc7eb7abdf8848a63aab2f56a64d0d9a6355602b10b1ea2e6c05c078e03450e761ff0023ec64c401bb00e5c325c085d65e7ecbd3ff2a6a3c30c4750f97148d0386c5ac7b05f828e43800c5c0283bbbfa9687fd7b5702bc09ecb6eb255b80a121c778cccea41db38e6961cbb1f7dd04bc6105fd827d3385e937766cf747e010b01d280d3946d425d665c8c7877615f0679bc739ba5c11728c6ce03b761cbcc3beb41e0b39465a3c03fcd26ab51ce0456069c8312eb77e610b3c254836f005a0af3d2e06de06be16729cfcc0ef59c0ca981e0b615a03fcc063822cf6b0dfa02f037bec3243d4e0645f9c29ddddb3edb4daf7ed4c421bf0947dd8c2b4dbfa85f9d26e1fd66847cb063b9f7e51c8719aadbfd015c03460aca7b2bcdb7a7cfbecd9dacf9a3e799ef63f1ff886d582e3805ceb8cd8ad5c688911bc8838d6d6f9e802edab068935c2dabcb779d8f7fdc05e6b3a6cf0d0097408f08ef56abdcd630dd264d7c65aad736b7e12af4b567ffbb27dde6af27a6b924e0d31465a8cb264081e735c66eb620fe2c2908e041908bc0c3ce9394ea1d55ab786bcdf9f02ff60bffb4a909240cd77a91d833e1ae2fe87d967686d60ecd33fda714fa6b49e9232c0fe903181759fb42b993efe10df097201b019783a4d055101ec0c717f53ac76bac2bea8ee058edbefbe9a4258b9bc16e2fe72acb95b1958576a9fb54b92d941a6dce5f6b89df5b92950d053ec9fe5f3f4a50f85769669a78da04cc7fb2f0d9c180843b4d6aeb19ff9d65c79d18e0b5f09315650a93549c3d266c7801706d6459bf33e8f45bdb8d77afa7ede32fe430f97fc2fb1918e4fd929bf5b80c921eebf9f15c8ebc074dbff2d2177a11800545bf2cd02be6eedf84521c688e5a389d5cfce5cceb5bfe3dbd6629811729c993652b0d2f6bde55ccef8654a0d82fdb35a2d41da81fb3c9c3d996c231db176e822bb68f46a48fbcfb3b325005f09acaf0df1dedc276d7cffadd6943b60ffb3ea90f61fcf610f1709dbac19f759aba1fe64c3b3c32a8ba8e7edcbb7d29a5c2b6cfcb98888888888888888888888888888888888888888888888888888888888888888f8f2bf07c73f21bcd51c630000000049454e44ae426082');
INSERT INTO edu2."Image" OVERRIDING SYSTEM VALUE VALUES (5, 1, 'image/png', '\x89504e470d0a1a0a0000000d49484452000000c8000000c80806000000ad58ae9e00000006624b474400ff00ff00ffa0bda793000014f049444154789ceddd7b74147596c0f16f1e2410022181608810c23bc0048111088ac282206c961df40c8880418f808278965118660e0eaece39eeec8ccee08b800f7644079645f1c94399c84b11a326480382024670251009044278e4d1fb87b7d99aa653e924f54b0afa7ecee9d3e9ea4addcae376fd7e55bfdf2d7097a8c4c4c47380579ea34c04f1783c9b3d1e8fd7e3f16c36b17d8d71f5c40837b54375900a6c2b2a2a6a0a20cfdb64b9528dc22d09320ec80306fa2d1f28cbc735d27ea910d7d8091209fc015803c403b46ad5ea2240ebd6ad2f005e59fe26b0d454934ba9ea3476824403638130e03430213939b90ce09a6bae3927478e62597708d0a4717757859ac64e90b3c0046033701db0daeffd77809fcbfb13647da51a4c6463ef00b007f8279bf70b6a785f29631afb08a294ab994e90dec006a00c3809bc6c389e528e329920d7025b80cf2451fa002b0dc653ca7126fb207324397e675976c4603ca51c176670db39d2c1ee0cf405f603bf06b60658b72fb008202626e6c6b2b2b2c8d8d8586f4a4a4a09c0fcf9f30ff6efdfbfd4c17deb0bc40125c04e07b7ab31aeb2182613e42b2005c80476000f000b811e40a1dfbac3804dd56d68d9b2650c1830c0e0ae2a1598c926d609c954dfe0b0a780b9c0506095dfbaa7a4bf12f0081211117110d02388c6707b8c5a793140a7fca85cf0ab56af5ebd4e025e7936c2cda3473586bb62983c8b952dc3486e922122ff26434bb6188ca994a34c36b1f28059c07f01c940bef4478e198ca994a34c0f35592e0fa5ae483ad444291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c984c90fba53abbf531c7603ca51c677ac2d4df8191866328658c36b194b261b22ed6fdc07f0067a42eef5ae0896acaf768e1388de1ca182613a42fd006f816e80afc19d805dc19605d2d1ca75cc9641fc49aa507a5c2c94629fd73c16f5d2d1ca731ae8618f53218a8009ad9ada485e334869b62983c824c90265521d005781a580f9c3318532947993c8b35502abc1f93bbd87e0edc6d309e528e337904992b0fa5ae587a1d44291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c345482fc8f148ebbbe81e2d92a2a2a6ae2f178282a2a6ad2d8fba2dccd74e138807f05da36409c602400cf8d1831e206afd74b5858d80dc00a603650dcd83ba7dcc77482b4049e046e03761b8e158cd780315eaf170079be53aa5d6436f6ce29f73159170b6031f0bdd4c43a070c90b9e9fe8c178e3b7cf870746666664675efaf5dbb76474a4a8a7f39a2fab85a4ad984740c9347900c6088f43b6aeaebb402860294959501505a5a1ab677efde56009595953fafefce1417dbb7a08a8b8b33525252ea1b269038dfcf6690c63014c3548244032f03f7011781a635ac6fbc705c424242b4246d75efef0850d0ae3e5cfba9a8311abf705c57a0523abec5529bd72b3b37dfee1b0d178e5b17e0960c5ea91bec28371743d318c133759af790d4e5ed228f9eb27c1cf08ca198c19802ac0c0bfba9eb25cf2b81bbfcd68b92930a5d82dc6e07e0782df6e376e0ad5aacaf1a89a904a992a386ef714a969f69e4ca8ac5c0a49c9c9ced2b56ac202727673b3029c029defbe464c241799d2655218fcb11a76bb001972c5972ad7ccf4396c56f02dd801b9cf9b194290d75a1f0bc9c310b7406abc11d3972247adbb66d1c397224ba9a556601af585e57006f545399be5a858585bcf1c61bd702fbfddef202cb258e72b1901c6ab27bf7eed8ecec6c76efde1d1be0edee402af0b165d901e025e0cbdac479e28927983163c6b7d2f7f29723d75e226aff13a88612920952837ed287ba589f8dac5ab5aa6d797939e3c78f2faa6695afe4f476c7fac45166856482646565157a3c1eb2b2b20a03bc1d079cae6788d64b972eedb460c102bb75ce4ad32dbe9eb194412199203528912132f5f1546666e6d1f6eddbdbadd35cae4319bb0f8aaabf8618ace83a797979b13b76ec20232323501f241fe82ca77aebdacc1ab96ad5aab66bd6aca1b2b2f24659962e57707f21af7bcad9bd823ac6500d202413c4d7498f8d8d0d94205f03dfc91db1b6d43144af0d1b36ac8d8c8cbcb1a2a2e2d3a1438736937ba458af010d970b9755758ca11a8036b1027bdeef663f49726ad6d7e1fe465ea755f3fd25090909152d5bb6242121a142fa1ae7e43a1072ca3b4be228170bc904a9a1930eb054461efbaea417ca3fb5ff635f902107c988669fdb24c9b6d7f34751868564132b0817819f19dcfe1a7928970bc904a9a1935e17a781671dda967291904c901a3ae9755102fcdea16d291709c93e8852c10ac90409a293ae14846a822815ac90ec8318e8a4abab94c923c81d804706e51503efd662869e51350c7757ea129309e29129ae29401f29fff33783f19cd05ee6cc5b8b4c7402feb911f7692ad0c26e05a910390578582ac92887984c90bd32c1e804f0037058a699363a9b4efa3dc0a3c018cbb21ec0f85a6c3e07e8e5d0ae023c58d3e8e2471f7db4ab9457aa009600331c8c1fd24c178ebb1ef840ca004503f380bf0458cf78e1b800f12e2b013366cc98ebc78e1d7b74d7ae5d714b962cd90bb07efdfa840d1b3624de7efbed857bf6ec891d39726471b76eddce01ecdcb93376ebd6adad222323bdc3870f2f3e7ffe7cc4dcb9737b0d1e3cf844870e1dda4c9f3ebde9a14387ce6cdcb8f158555515b7de7aeb892e5dba9c472654f5efdfffccb66ddb5a454545554d9c38f1786464a417203737b7c5279f7cd2eaa69b6e3af9d8638f757feeb9e7f674e8d0215049a2be405c555555497878f84e80ad5bb7c63dfbecb39d56af5eed54699baba5248feb0ac7213bd24da6b04eb599b26abc709cd5be7dfbf8f0c30f193e7c785c5a5ada5080fdfbf7939090c0b469d3ba8e193386b367cf0e6ddebc392d5ab460dfbe7d7cf1c51749c9c9c93cf8e083bcfaeaab949797b370e142a64c9942444404050505f4efdf9ff8f878faf5ebd73e393919808f3efaa845bb76ed5a949797f3f0c30f777de9a59768d3a60defbfff3edbb76f67d2a4497cf0c1072c59b2246df6ecd9e4e7e7f3f8e38f336dda34d6ac59c3a953a7888e8ece0058be7c39a3478fa66ddb7f2c751c1e1e7ea9185a494909a9a9a91828c0e6baa26e0d11c37482544813cbf7d825ed7cff197bc60bc759edddbb7760767676b3a4a4a473696969b9fcf489de69f0e0c1e5515151dfa7a7a7f778fbedb74f4d9a34e9d899336712626262521f7ae8a13c808282828eafbdf65ad5a041834a222323bbdc7cf3cd7b9292922ecd1b898c8cbcae478f1edff4eeddbb3b103779f2e4924d9b367df7c30f3f44c7c7c7b759b76edd8f59595985656565d76565657d3768d0a0538989894de7cd9bd773f6ecd9f92fbef862cf7beeb9e7c771e3c6158d1a352a7cd8b061375cb870e133e0427e7e7e8f8c8c8cc36ddbb6f55586f9874fc5c2c2c2a8458b16f55bb468d16e3939e204d77ebabb3046bd749221e2b6fd10c385e30098376fde3ec02bcf4853f35b69fecd975a59efc97ba3a502bccf64cbb8ab5f4bd27f2cf347f0f5413c1ecfe62fbffcd2dbbd7bf712d9ee0ca98c324fd6db64192edf464e6a006c96c9553e1ee0da403f875f31b4e6c08e5af6976ae4e6a26e0d11c36427fd01a0bfdc72a0b714b23e60a935d5680274d207cb27aeeff54ef9c4692dafada7a7bb0247e4eb3fca19ba85be3e9454946c0270ecd831aaaaaa007e05bc00fc1844bfef7b4b424400ed6afa792e5ebc1826c9f7376075b0bf075533934dac6419d2dd4e9a57dbe4d3d88d33e826022f024f5b9675067e29b30baf01fe24d363a702374a3bf61699137213b047beef2030f3f5d75f4f1c3b762ca5a5a54d64bd4479aee903221bf883343b337dc9265603bff39f87b260c182aef23bbe2047aad3c07f3bf7eb095d268f200ba4731e2dc972871b8e1ec895f4c58b17939797e7bb50582077c1b2ca967ecf216916ad950f945b80a332777d8ff4a9b60033e5fb7e0b78f6eedd1b1b1515c5e2c58b3d7294b920a7913f95f556ca3f3532db70997cfdb11c713280b781472c33113fb17c7d495a5a5aa94cdfed2c0f2365ea4351480e350930dcfdcf0156db69e9cc7d2dcfd6f66b759fd2a780e7172e5c381e489153c281b6ff82e5ebb37ea7bf3fb754a1b456a30cb41deebdf7dea38b162dfa4da0f754fde86045a56c846482e8707715ac904c10a58215927d101deeae8215920962604ebaba4a69134b291b219920da4957c10ac904512a5821d907d14eba0a5648268876d255b0b489a5948d904c10eda4ab608564822815ac90ec8368275d05cbe411643a902b43b98fca84a43883f182969b9b1b979d9d4d6e6eae2bf647b997c904690f3c2e73d0c70003fd66ec35860460c5e2c58bbb02c8f30a59aed4654c36b11eb57cfd83dc8f6faec178c1780d18e3f57a0190e73be5c896d9c8fba65cc874e138ab57a508c1a400ef192f1c77f8f0e1e8cccccc8ceade5fbb76ed8e94949440c5d9eaea6a296513d2311aaa933e590a36f4abe67de385e38a8b8b6b7a3f2325c5c8546ed71543d318ee291c073041e6528f92923681182f1c979090102d8510aa7b7f871456708a6b3f1535867b0ac7dd091c97fa5841315c386e9d14aff37fac753a909b8ba1698ce0993c8b351178463abf7906e3d4c614606558d84f5d2f795e09dce5b75e14b0bb16f733e9201f04c1ba1d78ab16ebab4662ba2e561bb916e2fba4beaca653032b0626e5e4e46c5fb16205393939dbe5a4817f07e53e29b7e3abe39506ac9724f04a75453b43274f9edc67c890210c1c38f046f9de34cbfb6fcae9ef1b1cfef994c34cf641d28358a75124262696272626029457b3ca2c79f8544869cf2781bf07112275d4a851c7478c18115f5151f1c5d8b1634ba419d7d5f261b15c626c77e6a7522684e450931a74978a901f5b961d90479b20b7f1cad4a953ef919bef9c071e931b0a25c9a802a4c8f57c398abbb11cabd2c18a01f59372a3178358375843a4e0b575f4f05740bc24a372293d825c2e2ec0fd4beacce3f13407fe53ae05792d6f9d95a65bbc53b194f334412e5752d33d018375e0c00166cd9ad5472aaeaff77bbbb9fcfe8ddd0745d59f36b12e972f15d2a3eab3915dbb76359f3e7d3ad3a74fff167825c02a3de50269417de228b334412ef7b5dc13647010eb56a7efcc9933af9b33678eddacc5e172e1523be82ea60912d8f3c0dd96d749d27f2892d7dfc8ebb46abe7ffae9d3a79b3cf2c823a4a7a70fb59cdaf58d280803b2248e7231ed8304b654aefe77918b8585b51cf9fc80c7e3e92d83e2b6a4a7a70ff37bff364932bd06e2729a20815d047e6670fb6be4a15c4e9b58ce386db9f3adba8a688238a304f87d63ef84729e26885236344194b2a109a2940d4d10a56c984c90c13277e2a45c246b6a30965246984c90f352ea67a6c1184a1965f24261be3cfa1a8ca194510d5138aeaf244a3339aa54b78ed1c27101e25d0d65663486e1186e499061c0a6ea36b06cd932060c18606e0f95aa865bc662192f1ce7c7b59f581ae38a8e51277d6b7316cb70e1387079a1328de1ae187a1d44291b2613e47a3972e4cbeb73f25aefeaa4ae1826fb209f37f0ed1594729c36b194b2a109a2940d4d10a56c68822865431344291b9a204ad9d00451ca8626885236344194b2a109a2940d4d10a56c68822865431344291b9a204afdbfe6fe7716d30451ea2769c02772c3d54b4ccf49ff1530174890fb824fb7dc273ca0f3e7cf47589f4dc8cbcb8badacac242222c2d8e42d8d71c5c5c806d2e5be305b80b74ced8bcf2d32417e8824c8ebc07b357d534c4c4c39e09567231a62debbc6b8e262a4003fcaacd79340270c37b1664865c58f8062e037c018a083c1984ad5d561b92fa5176805ac02a24c4e89dd25c5e09659969d027e29357bad2e158e0b0f0fbfb9aaaa2a2c2c2c8c66cd9a55002425259d6bdab469a5533b76f8f0e1b8d2d2d2306b6921a7698c2b33c6d1a3479b9d3c79321a203131b1ba3a6e8ef81e18efb7ac00b833c0bac32c7782d5873e5cf330d9493f01b4f45b160f1c0fb0eea5c271be025fe1e1e15edf51c3e923484141416c595959644c4c4c456a6aaa9305e934c6151ea3218f20ab80672caf3b039541f441364bf61a2b22a631344635fe05a892f5728128939df41780bb80417224790258071c311853a9ba4a01fe2aa5aa4e0177c8edc08d9a237d9173c03b405210dfd357fa24266f9ba0313486bf4d72e4a802c619dc0fa5ae486972e6f52f8dbd234ab9d56563b1dc561a34420e811580470e774e8b05fa00e5c06706b60f902c27238eca0528133a02eda4bdfcb5a1df954f1fa0b5dd3d5cea281db8c66fd9a7c01987e30024025de5ecead706b66f5c0ab01ff846ae97e4036d1d8ef1a49c493b2d03d39c1621fb5d0aec913ff43af96472d206e9db7d011c037603a90ec7f0e92843864cfcd3ae04fe57ea38fb1edd1d8e110e3c25fde0bdf2a1f5a4c3311ac45f8137e4a816016c049e76384637191736c750828403938026f23a1138042c70384e8ce5eb306085df880527bd032c3198208f18d8aed5af80037299c1273ed86f76cb70f77039adf6bc9c49a80416cb3f9b93be917161a654c93fab6fa065919c4f6fef709c32192fd41d1801f436f4b79c2223be4d8e6c8d92a64f3343db9f0d3c2e47c174205a06235e51da4962582f22f696652686409b3a82f84b9636ef6803dbbe1f38284d872d060681b606be9551ada30d1e414ae5da58850c6e8d09e2fb82d5543e6cdf9523799e3449873b18a341749564b0f6393acb32ff4e9c131a22415a00db81e70cc78993a3d64887b7fb2af0907c6d2a41522c47be4ed207fda383dbbf46fe87deb3cc7dfaadf47bdcd27a0a4a73f9417a5a960d922b99267e10d309d212f81878b981fe101380af1cdcde50393a75970faabb81b3f2b5a9a610f277f9dcc1ed45487377aa6559aafcaf750c66036eb9cbed5939eb73b3e50f3d547e59264f5f9a10276799be9219940db1ffa99613034ef01db5d7cb738c3457364abff053076359a54a93d42995d2076c6759e66bce9bec8b1a71b78cf49d28197fcac025ff8e32d371b19cf2bb0518e8e0f6a3e40fb2131825dbbfc5e12114cd81b5927ce3807f9776fc7c0763f833d1c48a92339759f273fc495a0c990ec7192b3305a7cab6f36b73c6cf2d4710e4975521095205dc63e0ecc94099e988b443e7cb45a35c87b6df4cce9600ccb32cdfe1e0bdb92fc8fcfe91d2943b2abfb3b50e6d3f9013062e12564a33ee177284fa4ea6673bf5b7f079573e7ca74a936b99cc3f574a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a594524a29a59452a6fc1f2ccb094c45c52af50000000049454e44ae426082');


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: edu2; Owner: -
--

INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (5, 1, 4, 'Eigenschaften der Kürzesten Verbindung TODO', 'Der kürzeste Weg zwischen zwei Punkten hat viele Eigenschaften:
- die Position des ersten Punkts ("Startpunkt")
- die Position des zweiten Punkts ("Endpunkt")
- die Länge der Verbindung
- die Richtung der Verbindung (mit verschiedenem Verständnis davon, was "Richtung" bedeutet)
- wieviele Einheiten man vom ersten Punkt nach rechts, links, oben und unten gehen muss, um zum zweiten Punkt zu kommen
- ob man eine bestimmte Linie kreuzt
- ob man sich vom Ursprung wegbewegt oder darauf zu
- ...

Die Vektorrechnung -- die Grundlage der linearen Algebra -- baut auf der Idee auf, dass man sich auf ein paar
wenige dieser Eigenschaften konzentriert und die anderen ignoriert:
    - wieviel Einheiten nach rechts/links (Zahl mit Vorzeichen)
    - wieviel Einheiten nach oben/unten (Zahl mit Vorzeichen)
    - Länge der Verbindung (nicht-negative Zahl)
    - Richtung der Verbindung in dem Sinne: Wenn man die Verbindung in beide Richtungen verlängert -- welchen Winkel
        bildet sie dann mit den Koordinatenachsen?

Die Gesamtheit dieser Eigenschaften wird als _Vektor_ bezeichnet. Das heißt: Wenn zwei Vektoren sich in diesen
Eigenschaften gleichen, dann werden sie als "gleich" angesehen, auch wenn sie z.B. unterschiedliche Start- und
Endpunkte haben. Ein Vektor fasst also viele kürzeste Wege als gleichartig zusammen, die sich nur in den
"unwichtigen" Eigenschaften unterscheiden.
"""
Übung:
- Koordinatensystem mit mehreren farbig markierten Vektoren -- welche zwei sind gleich?)
    - welche mit gleicher Länge aber unterschiedlicher richtung und gleichem Endpunkt
    - welche mit gleicher Länge aber unterschiedlicher richtung und gleichem Startpunkt
    - welche mit gleicher Richtung aber unterschiedlicher Länge und gleichem Startpunkt (längerer als durchgezogene
        Linie, kürzerer als gestrichelte Linie)
    - welche mit gleicher Richtung aber unterschiedlicher Länge und gleichem Endpunkt (längerer als durchgezogene
        Linie, kürzerer als gestrichelte Linie)
    - ein paar ganz andere Extra
    - einer von den o.g. ein zweites Mal, ist dann einer der "einzelnen"
    - Buttons mit Farbigen ausgefüllten Kreisen bzw. getrichelten Outline-Kreisen
...
...
...
', NULL, '{"type": "explicit", "exercises": []}', '');
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
          selectedIndex = (state.position.x > 250 ? 1 : 0) + (state.position.y > 250 ? 2 : 0);
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
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (8, 1, 7, 'Vektoraddition in Zahlen TODO', '... (wie begründen?) TODO
Übung
- rechenübungen
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
', NULL, '{"type": "script"}', 'function myCreateCanvas(showLabels) {
  let matrix = new DOMMatrix();
  const canvasState = createPassiveCanvas({
    onRender: (state) => {
      const g = state.context;
      g.resetTransform();
      g.clearRect(0, 0, state.canvas.width, state.canvas.height);
      setupCoordinateGridCanvas(g, -0.6, 6, -0.6, 6, { clipNegative: true, greyedOut: state?.greyedOut ?? state?.freeze });
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
INSERT INTO edu2."Unit" OVERRIDING SYSTEM VALUE VALUES (4, 1, 3, 'Abstand zwischen zwei Punkten TODO', 'Bei zwei Punkten ist es oft interessant, wie weit sie voneinander entfernt sind. Dabei sprechen wir beim _Abstand_
von der Länge der _kürzesten_ Verbindung zwischen den beiden Punkten, also ohne Umweg -- bei einer Karte wäre das
die "Luftlinie". Für jede andere Verbindung müsste man den genauen Weg kennen, um von dessen Länge zu sprechen,
aber der Abstand ergibt sich alleine aus den beiden Punkten.

In manchen Fällen kann man den Abstand direkt an den Koordinatenachsen ablesen:

![image](course:4)

![image](course:5)

Im allgemeinen Fall muss man den Abstand entweder messen oder aus den Koordinaten der Punkte berechnen. Letzteres
geht gerade deshalb, weil der Abstand ja nur von den beiden Punkten bzw. dessen Koordinaten abhängt und
sonst von nichts. Die genaue Formel zum Berechnen wird später erläutert.

# TODO

    Übungen (Idealvorstellung)
    - Abstand zwischen zwei Punkten ablesen, deren Verbindung parallel zu den Koordinatenachsen ist
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

SELECT pg_catalog.setval('edu2."Image_id_seq"', 5, true);


--
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: edu2; Owner: -
--

SELECT pg_catalog.setval('edu2."Unit_id_seq"', 31, true);


--
-- PostgreSQL database dump complete
--

