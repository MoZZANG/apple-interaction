const firSecOpacityInValue = [
  [0, 1, { start: 0.1, end: 0.2 }],
  [0, 1, { start: 0.3, end: 0.4 }],
  [0, 1, { start: 0.5, end: 0.6 }],
  [0, 1, { start: 0.7, end: 0.8 }],
];

const firSecOpacityOutValue = [
  [1, 0, { start: 0.25, end: 0.3 }],
  [1, 0, { start: 0.45, end: 0.5 }],
  [1, 0, { start: 0.65, end: 0.7 }],
  [1, 0, { start: 0.85, end: 0.9 }],
];

const firSecTranslateYInValue = [
  [20, 0, { start: 0.1, end: 0.2 }],
  [20, 0, { start: 0.3, end: 0.4 }],
  [20, 0, { start: 0.5, end: 0.6 }],
  [20, 0, { start: 0.7, end: 0.8 }],
];

const firSecTranslateYOutValue = [
  [0, -20, { start: 0.25, end: 0.3 }],
  [0, -20, { start: 0.45, end: 0.5 }],
  [0, -20, { start: 0.65, end: 0.7 }],
  [0, -20, { start: 0.85, end: 0.9 }],
];

const thirdSecOpacityInValue = [
  [0, 1, { start: 0.15, end: 0.2 }],
  [0, 1, { start: 0.5, end: 0.55 }],
  [0, 1, { start: 0.72, end: 0.77 }],
];

const thirdSecOpacityOutValue = [
  [1, 0, { start: 0.3, end: 0.35 }],
  [1, 0, { start: 0.58, end: 0.63 }],
  [1, 0, { start: 0.85, end: 0.9 }],
];

const thirdSecTranslateYInValue = [
  [20, 0, { start: 0.15, end: 0.2 }],
  [30, 0, { start: 0.5, end: 0.55 }],
  [30, 0, { start: 0.72, end: 0.77 }],
];

const thirdSecTranslateYOutValue = [
  [0, -20, { start: 0.3, end: 0.35 }],
  [0, -20, { start: 0.58, end: 0.63 }],
  [0, -20, { start: 0.85, end: 0.9 }],
];

const thirdSecPinsOpacityInValue = [
  "",
  [0, 1, { start: 0.5, end: 0.55 }],
  [0, 1, { start: 0.72, end: 0.77 }],
];

const thirdSecPinsOpacityOutValue = [
  "",
  [1, 0, { start: 0.58, end: 0.63 }],
  [1, 0, { start: 0.85, end: 0.9 }],
];

const thirdSecPinsScaleYValue = [
  "",
  [0.5, 1, { start: 0.5, end: 0.55 }],
  [0.5, 1, { start: 0.72, end: 0.77 }],
];

export const firSecScrollRatios = [0.22, 0.42, 0.62, 0.82];

const setNewArr = (length, inValue, outValue) => {
  return new Array(length).fill(0).map((_, i) => {
    return { in: inValue[i], out: outValue[i] };
  });
};

export const msgOpacity = [];
msgOpacity[0] = setNewArr(
  firSecOpacityInValue.length,
  firSecOpacityInValue,
  firSecOpacityOutValue
);

msgOpacity[2] = setNewArr(
  thirdSecOpacityInValue.length,
  thirdSecOpacityInValue,
  thirdSecOpacityOutValue
);

export const msgTranslateY = [];
msgTranslateY[0] = setNewArr(
  firSecTranslateYInValue.length,
  firSecTranslateYInValue,
  firSecTranslateYOutValue
);

msgTranslateY[2] = setNewArr(
  thirdSecTranslateYInValue.length,
  thirdSecTranslateYInValue,
  thirdSecTranslateYOutValue
);

export const pinOpacity = [];
pinOpacity[2] = setNewArr(
  thirdSecPinsOpacityInValue.length,
  thirdSecPinsOpacityInValue,
  thirdSecPinsOpacityOutValue
);

export const pinScaleY = [];
pinScaleY[2] = setNewArr(
  thirdSecPinsScaleYValue.length,
  thirdSecPinsScaleYValue,
  []
);
// [
//   { in: thirdSecPinsScaleYValue[1] },
//   { in: thirdSecPinsScaleYValue[2] },
// ];
