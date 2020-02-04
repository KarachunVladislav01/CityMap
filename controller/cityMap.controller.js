class CityMapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderCitiesList(this.model.citiesList);
    this.view.renderStatesChart(this.model.getStatesDataset());
    this.view.showAddCityModal();
    this.view.beforeUnload(this.handleSaveToLocalStorage);
    this.view.bindAddCity(this.handleAddCity);
    this.view.bindShowStatesList(this.handleShowStatesList);
    this.view.bindShowExtremeCities(this.handleShowExtremeCities);
    this.view.bindShowNearestCity(this.handleShowNearestCity);
    this.view.bindShowFilteredCityList(this.handleShowFilteredCityList);
    this.view.bindRefreshCitiesList(this.bindRefreshCitiesList);
  }
  handleSaveToLocalStorage = () => {
    window.localStorage.clear();
    window.localStorage.setItem(
      "citiesList",
      JSON.stringify(this.model.citiesList)
    );
  };

  handleShowStatesList = () => {
    const statesList = this.model.getStatesList();
    this.view.renderStatesList(statesList);
  };

  handleShowExtremeCities = () => {
    const extremeCities = this.model.getExtremeCities();
    this.view.renderExtremeCities(extremeCities);
  };

  handleShowNearestCity = (latitude, longitude) => {
    const nearestCity = this.model.getNearestCity(latitude, longitude);
    this.view.renderNearestCity(nearestCity);
  };

  handleShowFilteredCityList = state => {
    const citiesList = this.model.getFilteredCitiesByState(state);
    this.view.renderCitiesList(citiesList);
  };

  bindRefreshCitiesList = () => {
    this.view.renderCitiesList(this.model.citiesList);
  };

  handleAddCity = form => {
    this.model.addNewCity({
      cityName: form.cityName,
      state: form.state,
      latitude: parseFloat(form.latitude).toFixed(2),
      longitude: parseFloat(form.longitude).toFixed(2)
    });
    this.view.closeAddCityModal();
    this.view.renderCitiesList(this.model.citiesList);
  };
}

export { CityMapController };
