describe("livi18n.js", function() {
  
  it("Get a version of livi18n.js", function () {
    expect(livi18n.version).toBe("0.1.0");
  });
  
  it("Say translated message", function () {
    expect(livi18n.t({key: 'messages.test', options: {name: 'Princess', nick: 'Bella'}, defaultValue: 'Test'})).toBe("Tested livi18n with Princess Bella!");
  });
  
  it("Say pluralized message", function () {
    expect(livi18n.p({key: 'messages.test2', options: {name: 'Bella'}, value: 4, defaultValue: 'Test'})).toBe("Bella have 4 The Vampire Diaries Books");
  });
  
});