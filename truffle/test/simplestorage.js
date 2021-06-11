const Complaints = artifacts.require("Contract");

contract('Contract', () => {
  it('should read newly written values', async() => {
    const complaintsInstance = await SimpleStorage.deployed();
    var value = (await complaintsInstance.reader.call()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await complaintsInstance.write(1);
    value = (await complaintsInstance.reader.call()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await complaintsInstance.write(2);
    value = (await complaintsInstance.reader.call()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});
