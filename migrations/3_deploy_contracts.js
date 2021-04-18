const PrimeNumber = artifacts.require("PrimeNumber");
const Integers = artifacts.require("Integers");

module.exports = async function (deployer) {
  await deployer.deploy(PrimeNumber);
  await deployer.link(Integers, PrimeNumber);
};