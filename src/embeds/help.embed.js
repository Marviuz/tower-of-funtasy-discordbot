const sortSpecify = require('../utils/sort-specify');

module.exports = (commands) => {
  const commandsNew = sortSpecify(['bot', 'tof', 'others'], 'type', commands);

  return {
    title: 'Commands',
    description: 'This bot is made only with a single guy without professional testing experience (actually, even a professional coding experience). **Expect bugs**!',
    fields: commandsNew.map(({ name, description }) => ({ name: `/${name}`, value: description }))
  };
};
