// events.js
let events = {};

const emitEvent = (name, data) => {
  if (events[name]) events[name].forEach(fn => fn(data));
};

const onEvent = (name, fn) => {
  if (!events[name]) events[name] = [];
  events[name].push(fn);
};

const offEvent = (name, fn) => {
  if (events[name]) {
    const index = events[name].indexOf(fn);
    if (index !== -1) events[name].splice(index, 1);
  }
};

export default { emitEvent, onEvent, offEvent };
