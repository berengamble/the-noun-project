describe("Client : Operations on client usage endpoints", function () {
  it("should get usage details", function (done) {
    nounProject.getUsage(function (err, data) {
      assert.ifError(err);
      assert(data);
      assert(data.monthly.usage < data.monthly.limit);
      done();
    });
  });
});
