import ShipEngine from "shipengine";
console.log(process.env.SHIPENGINE_API_KEY)
if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("Missing ShipEngine API key!");
}
const shipEngine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY,
});

export { shipEngine };