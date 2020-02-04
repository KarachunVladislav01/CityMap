import { CityMapController } from "./controller/cityMap.controller.js";
import { CityMapView } from "./view/cityMap.view.js";
import { CityMapModel } from "./model/cityMap.model.js";
const str =
  '"Nashville, TN", 36.17, -86.78;"New York, NY", 40.71, -74.00;"Atlanta, GA", 33.75, -84.39;"Denver, CO", 39.74, -104.98;"Seattle, WA", 47.61, -122.33;"Los Angeles, CA", 34.05, -118.24;"Memphis, TN", 35.15, -90.05;';
//window.localStorage.clear();
const citiesList = JSON.parse(window.localStorage.getItem("citiesList"));

if (citiesList === null) {
  const app = new CityMapController(new CityMapModel(str), new CityMapView());
} else {
  const app = new CityMapController(
    new CityMapModel(citiesList),
    new CityMapView()
  );
}
