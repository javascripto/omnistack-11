const { generateUniqueId } = require('../../src/utils');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});

// npm install jest
// npx jext --init
// npm test
