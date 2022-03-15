import { useEffect } from "react";
import "./mainBox.css";
import moment from "moment";
const MainBox = (props) => {
  useEffect(() => {
    let hour = moment(props.data.dt * 1000 + props.data.timezone * 1000)
      .utc()
      .hour();
    if (hour >= 0 && hour < 6) {
      document.body.className = "night";
    } else if (hour >= 6 && hour < 8) {
      document.body.className = "sunrise";
    } else if (hour >= 8 && hour < 18) {
      document.body.className = "day";
    } else if (hour >= 18 && hour < 20) {
      document.body.className = "sunset";
    } else {
      console.log("mmmm", hour);
      document.body.className = "night";
    }
  });
  return (
    <div>
      <div className="widget" id="one">
        <div className="left-panel panel">
          <div className="date">
            {moment(props.data.dt * 1000 + props.data.timezone * 1000)
              .utc()
              .format("lll")}
          </div>
          <div className="city">
            {props.data.name}, {props.data.sys.country}
          </div>
          <div className="temp">
            {Math.floor(props.data.main.temp - 273.15)}&deg;
          </div>
        </div>

        <img
          className="weatherIcon"
          src={
            "https://openweathermap.org/img/wn/" +
            `${props.data.weather[0].icon}` +
            "@4x.png"
          }
          width="120px"
        />
        <p className="PWeather">{props.data.weather[0].main}</p>
      </div>
      <div className="widget">
        <table>
          <tr>
            <td className="property">Feels like : </td>

            <td className="value">
              {Math.floor(props.data.main.feels_like - 273.15)}&deg;C
            </td>
          </tr>
          <tr>
            <td className="property">Min. Temprature : </td>

            <td className="value">
              {Math.floor(props.data.main.temp_min - 273.15)}&deg;C
            </td>
          </tr>
          <tr>
            <td className="property">Max. Temprature : </td>

            <td className="value">
              {Math.floor(props.data.main.temp_max - 273.15)}&deg;C
            </td>
          </tr>
        </table>
      </div>
      <div className="widget">
        <table>
          <tr>
            <td className="property">Pressure : </td>

            <td className="value">
              {Math.floor(props.data.main.pressure)} mbar
            </td>
          </tr>
          <tr>
            <td className="property">Humidity : </td>

            <td className="value">{Math.floor(props.data.main.humidity)} %</td>
          </tr>
          <tr>
            <td className="property">Wind Speed : </td>

            <td className="value">{Math.floor(props.data.wind.speed)} km/h</td>
          </tr>
          <tr>
            <td className="property">Wind Direction : </td>

            <td className="value">{Math.floor(props.data.wind.deg)}&deg;</td>
          </tr>
        </table>
      </div>
      <div className="widget">
        <table>
          <tr>
            <td className="property">Timezone : </td>

            <td className="value">
              {/* {moment(props.data.timezone * 1000).format('LT')} */}
              GMT {props.data.timezone <= 0 ? "" : "+"}
              {props.data.timezone % 3600 === 0
                ? `${props.data.timezone / 60 / 60}:00`
                : `${Math.floor(props.data.timezone / 3600)}:${
                    (props.data.timezone % 3600) / 60
                  }`}
            </td>
          </tr>
          <tr>
            <td className="property">Sunrise : </td>

            <td className="value">
              {moment(
                props.data.sys.sunrise * 1000 + props.data.timezone * 1000
              )
                .utc()
                .format("LT")}
            </td>
          </tr>
          <tr>
            <td className="property">Sunset : </td>

            <td className="value">
              {moment(props.data.sys.sunset * 1000 + props.data.timezone * 1000)
                .utc()
                .format("LT")}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default MainBox;
