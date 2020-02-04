class CityMapView {
  renderCitiesList(cities) {
    if (cities == null) {
      return;
    }
    if ("content" in document.createElement("template") === false) {
      return;
    }

    const temp = document.querySelector("#tmp-city");
    const node = temp.content.querySelector(".city");
    const cityNode = document.importNode(node, true);

    this.cleanNode("#list-of-cities");
    cities.forEach(city => {
      const cityNode = document.importNode(node, true);

      cityNode.querySelector(
        ".cityNameState"
      ).textContent = `${city.cityName} ,${city.state}`;
      cityNode.querySelector(".latitude").textContent = city.latitude;
      cityNode.querySelector(".longitude").textContent = city.longitude;

      document.querySelector("#list-of-cities").appendChild(cityNode);
    });
  }

  bindShowStatesList(handler) {
    document
      .getElementById("show-states-list")
      .addEventListener("click", event => {
        handler();
      });
  }

  renderStatesList(statesList) {
    document.querySelector(
      "#statesList"
    ).textContent = `List of states: ${statesList}`;
  }

  bindShowExtremeCities(handler) {
    document.getElementById("compassImg").addEventListener("click", event => {
      event.preventDefault();
      handler();
    });
  }

  renderExtremeCities(extremeCities) {
    if (extremeCities == null) {
      return;
    }
    document.querySelector("#northernmost").textContent =
      extremeCities.northernmostCity;
    document.querySelector("#southernmost").textContent =
      extremeCities.southernmostCity;
    document.querySelector("#westernmost").textContent =
      extremeCities.westernmostCity;
    document.querySelector("#easternmost").textContent =
      extremeCities.easternmostCity;
  }

  bindShowNearestCity(handler) {
    document
      .getElementById("show-nearest-city")
      .addEventListener("click", event => {
        event.preventDefault();
        const latitude = document.querySelector("#latitude-input");
        const longitude = document.querySelector("#longitude-input");
        if (latitude.value != "" && longitude.value != "") {
          handler(latitude.value, longitude.value);
          latitude.value = "";
          longitude.value = "";
        }
      });
  }

  renderStatesChart(statesDataset) {
    webix.ready(function() {
      webix.ui({
        view: "chart",
        type: "donut",
        container: "states-chart",
        value: "#sales#",
        borderless: true,
        legend: {
          border: false,
          align: "right",
          valign: "middle",
          template: "#state#"
        },
        pieInnerText: "#sales#",
        shadow: 0,
        gradient: true,
        data: statesDataset
      });
    });
  }

  renderNearestCity(city) {
    document.querySelector("#nearest-city").textContent = city;
  }

  bindShowFilteredCityList(handler) {
    document
      .getElementById("filter-by-state")
      .addEventListener("click", event => {
        event.preventDefault();
        const state = document.querySelector("#state-input");
        if (state.value !== "") {
          handler(state.value);
          state.value = "";
        }
      });
  }

  bindRefreshCitiesList(handler) {
    document
      .getElementById("refresh-cities-list")
      .addEventListener("click", event => {
        event.preventDefault();
        document.querySelector("#state-input").value = "";
        handler();
      });
  }

  showAddCityModal() {
    document.getElementById("add-new-city").addEventListener("click", event => {
      event.preventDefault();
      this.removeModal();
      document.getElementById("modalWindow").style.display = "block";
      document.getElementById("modal-add-new-city").style.display = "block";
    });
  }

  bindAddCity(handler) {
    document.getElementById("create-city").addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formObjects = Object.fromEntries(formData.entries());
      if (
        formObjects.cityName != "" &&
        formObjects.state != "" &&
        formObjects.latitude != "" &&
        formObjects.longitude != ""
      ) {
        handler(formObjects);
      }
    });
  }

  removeModal() {
    document.getElementById("modalWindow").addEventListener("click", event => {
      event.preventDefault();
      if (event.target == modalWindow) {
        this.closeAddCityModal();
      }
    });

    document
      .getElementById("add-city-cancel")
      .addEventListener("click", event => {
        event.preventDefault();
        this.closeAddCityModal();
      });
  }

  closeAddCityModal() {
    document.getElementById("modalWindow").style.display = "none";
    document.getElementById("modal-add-new-city").style.display = "none";
  }

  cleanNode(nodeId) {
    const node = document.querySelector(nodeId);
    node.innerHTML = "";
  }

  beforeUnload(handler) {
    window.onunload = () => {
      handler();
    };
  }
}

export { CityMapView };
