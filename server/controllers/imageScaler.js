const imageScaler = (imgDesc) => {
  let [width, height, check, styles] = ['', '', 0, {}];
  for (let char of imgDesc) {
    if (char === ',') {
      break;
    } else if (char === 'x') {
      check ++;
      continue;
    }
    !check ? width += char : height += char;
  }
  styles.width = `${width}0px`;
  styles.height = `${height}0px`;
  return styles;
}

module.exports = imageScaler;