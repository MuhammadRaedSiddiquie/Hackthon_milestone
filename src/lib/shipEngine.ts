import ShipEngine from "shipengine";
console.log(process.env.SHIPENGINE_API_KEY)
const shipEngine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY,
});

export { shipEngine };