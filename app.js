const hourAngle = (hours) => Number(hours) * (360 / 12) + 180;
const minuteAngle = (minutes) => Number(minutes) * (360 / 60) + 180;
const secondAngle = (seconds, ms) => {
  s = Number(seconds) + Number(ms) / 1000;
  return s * (360 / 60) + 180;
};

function initClock(length) {
  const canvas = new fabric.StaticCanvas('clock', {
    height: length,
    width: length,
  });

  const canvCenter = canvas.getCenter();
  console.log(canvCenter);
  let circle = new fabric.Circle({
    radius: length * 0.45,
    originX: 'center',
    originY: 'center',
    top: canvCenter.top,
    left: canvCenter.left,
    fill: 'rgb(50,50,50)',
    stroke: 'rgb(120,120,120)',
    strokeWidth: 15,
  });
  let hourHand = new fabric.Rect({
    height: length * 0.25,
    width: 6,
    top: canvCenter.top,
    originX: 'center',
    left: canvCenter.left,
    fill: 'white',
    angle: hourAngle(current[0]),
  });
  let minuteHand = new fabric.Rect({
    height: length * 0.33,
    width: 6,
    top: canvCenter.top,
    originX: 'center',
    left: canvCenter.left,
    fill: 'white',
    angle: minuteAngle(current[1]),
  });
  let secondHand = new fabric.Rect({
    height: length * 0.4,
    width: 4,
    top: canvCenter.top,
    originX: 'center',
    left: canvCenter.left,
    fill: 'red',
    angle: secondAngle(current[2], current[3]),
  });

  canvas.add(circle, hourHand, minuteHand, secondHand);
  //   setInterval(() => {
  //     let current = getTimeStamp().split(':');
  //     // Kinda hacky way to keep secondHand smooth. Avoids the opposite cycle that happened between second = 59 and 00
  //     if (current[2] == 00 && current[3] < 200) {
  //       secondHand.animate('angle', 180, {
  //         duration: 1,
  //         onChange: () => {
  //           minuteHand.set('angle', minuteAngle(current[1]));
  //           hourHand.set('angle', hourAngle(current[0]));
  //           canvas.renderAll();
  //         },
  //       });
  //     } else {
  //       secondHand.animate('angle', secondAngle(current[2], current[3]), {
  //         duration: 100,
  //         onChange: () => {
  //           canvas.renderAll();
  //         },
  //       });
  //     }
  //   }, 100);
  setInterval(() => {
    let current = getTimeStamp().split(':');
    secondHand.set('angle', secondAngle(current[2], current[3]));
    minuteHand.set('angle', minuteAngle(current[1]));
    hourHand.set('angle', hourAngle(current[0]));
    canvas.renderAll();
  }, 10);
}

const getTimeStamp = () => {
  const date = new Date();
  let timeStamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  console.log(timeStamp);
  return timeStamp;
};

let current = getTimeStamp().split(':');

initClock(400);
