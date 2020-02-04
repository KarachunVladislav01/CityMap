class City {
  constructor(cityData) {
    this.cityName = cityData.cityName;
    this.state = cityData.state;
    this.latitude = cityData.latitude;
    this.longitude = cityData.longitude;
  }
}

class CityMapModel {
  constructor(citiesList) {
    if (typeof citiesList === "string") {
      const arr = citiesList.replace(/"/g, "").split(";");
      arr.pop();
      this.citiesList = arr.map(
        cityData => new City(this.parse(cityData.split(",")))
      );
    } else {
      this.citiesList = citiesList;
    }
  }

  parse(cityData) {
    return {
      cityName: cityData[0],
      state: cityData[1].replace(/ /g, ""),
      latitude: parseFloat(cityData[2]),
      longitude: parseFloat(cityData[3])
    };
  }

  getExtremeCities() {
    let maxLatitude = -90;
    let minLatitude = 90;
    let maxLongitude = -180;
    let minLongitude = 180;
    const extremeCities = {};

    this.citiesList.forEach(element => {
      if (element.latitude > maxLatitude) {
        maxLatitude = element.latitude;
        extremeCities.northernmostCity = element.cityName;
      }
      if (element.latitude < minLatitude) {
        minLatitude = element.latitude;
        extremeCities.southernmostCity = element.cityName;
      }
      if (element.longitude > maxLongitude) {
        maxLongitude = element.longitude;
        extremeCities.westernmostCity = element.cityName;
      }
      if (element.longitude < minLongitude) {
        minLongitude = element.longitude;
        extremeCities.easternmostCity = element.cityName;
      }
    });
    return extremeCities;
  }

  getNearestCity(latitude, longitude) {
    let minDistance;
    let currentDistance;
    let nearestCity;
    this.citiesList.forEach(element => {
      const distanceLatitude = element.latitude - latitude;
      const distanceLongitude = element.longitude - longitude;
      currentDistance = Math.sqrt(
        Math.pow(distanceLatitude, 2) + Math.pow(distanceLongitude, 2)
      );
      if (minDistance === undefined) {
        nearestCity = element.cityName;
        minDistance = currentDistance;
      }
      if (minDistance > currentDistance) {
        nearestCity = element.cityName;
        minDistance = currentDistance;
      }
    });
    return nearestCity;
  }

  getStatesList() {
    const stateList = {};

    this.citiesList.forEach(element => {
      stateList[element.state + "::" + typeof element.state] = element.state;
    });

    return Object.keys(stateList)
      .map(element => {
        return stateList[element];
      })
      .join(" ");
  }

  getFilteredCitiesByState(state) {
    const filteredCities = this.citiesList.filter(
      element => element.state == state.toUpperCase()
    );
    return filteredCities;
  }

  addNewCity(city) {
    this.citiesList.push(new City(city));
  }

  getStatesDataset() {
    const statesDataset = {};
    this.citiesList.forEach(element => {
      statesDataset[element.state] =
        element.state in statesDataset ? statesDataset[element.state] + 1 : 1;
    });
    return this.parseStatesDataset(statesDataset);
  }

  parseStatesDataset(dataset) {
    const statesDataset = [];
    for (const key in dataset) {
      statesDataset.push({
        sales: dataset[key],
        state: key
      });
    }
    return statesDataset;
  }
}

export { CityMapModel };
