import React from "react";
import "./styles.css";
import MainBox from "./Components/MainBox";

class App extends React.Component {
  constructor() {
    super();
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      this.setState({ location: { lat, lon } }, function () {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&appid=70c07c7b93566cce1e3f16c51f776ad7`
        )
          .then((data) => {
            return data.json();
          })
          .then((jd) => {
            this.setState({ data: jd });
          });
      });
    });
    this.state = {
      location: {
        lon: null,
        lat: null
      },
      data: null
    };
    this.tryAgain = this.tryAgain.bind(this);
  }

  tryAgain() {
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      this.setState({ location: { lat, lon } }, function () {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&appid=70c07c7b93566cce1e3f16c51f776ad7`
        )
          .then((data) => {
            return data.json();
          })
          .then((jd) => {
            this.setState({ data: jd });
          });
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="searchDiv">
          <input
            className="searchInput"
            type="text"
            placeholder="Search City, Town or location..."
            onKeyPress={(e) => {
              // console.log(e);
              // console.log(e.key)

              if (e.key === "Enter") {
                e.preventDefault(); // Ensure it is only this code that runs

                let input = document.getElementsByClassName("searchInput")[0]
                  .value;
                if (input !== "") {
                  fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=70c07c7b93566cce1e3f16c51f776ad7`
                  )
                    .then((data) => {
                      return data.json();
                    })
                    .then((jd) => {
                      if (jd.cod === 200) {
                        this.setState({ data: jd });
                        document.getElementsByClassName(
                          "searchInput"
                        )[0].value = "";
                      }
                    });
                }
              }
            }}
          />
          <button
            className="btnSearch"
            onClick={() => {
              let input = document.getElementsByClassName("searchInput")[0]
                .value;
              if (input !== "") {
                fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=70c07c7b93566cce1e3f16c51f776ad7`
                )
                  .then((data) => {
                    return data.json();
                  })
                  .then((jd) => {
                    // console.log(jd);
                    if (jd.cod === 200) {
                      this.setState({ data: jd });
                    }
                  });
              }
            }}
          >
            Go!
          </button>
        </div>
        {this.state.data ? (
          <MainBox data={this.state.data} />
        ) : (
          <div>
            <p>Cannot access your location! you must be good at Stealth</p>
            <button onClick={this.tryAgain}>Try Again</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
