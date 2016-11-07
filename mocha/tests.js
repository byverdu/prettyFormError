
const c = $('<div/>');
const expect = chai.expect;
describe('xoxo', function() {
  it('is happy', function() {
    expect(c).to.be.a.instanceOf($);
  })
  it('is not happy', function() {
    expect(c).not.to.be.a.instanceOf(String);
  })
})
