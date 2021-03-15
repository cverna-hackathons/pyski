import { connect } from ".";

before(async function() {
  await connect();
  return true;
});