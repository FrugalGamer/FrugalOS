/**
 * Created by Adam on 16.03.2017.
 */
'use strict';

let weatherWidget = {
    settings: {
        api_key: '6bd5b850178e2134497c4b965fbaf54e',
        weather_url: 'https://api.openweathermap.org/data/2.5/weather',
        forecast_url: 'https://api.openweathermap.org/data/2.5/forecast',
        search_type: 'city_name',
        city_name: 'Wichita Falls',
        units: 'imperial',
        icon_mapping: {
            '01d': 'wi-day-sunny',
            '01n': 'wi-day-sunny',
            '02d': 'wi-day-cloudy',
            '02n': 'wi-day-cloudy',
            '03d': 'wi-cloud',
            '03n': 'wi-cloud',
            '04d': 'wi-cloudy',
            '04n': 'wi-cloudy',
            '09d': 'wi-rain',
            '09n': 'wi-rain',
            '10d': 'wi-day-rain',
            '10n': 'wi-day-rain',
            '11d': 'wi-thunderstorm',
            '11n': 'wi-thunderstorm',
            '13d': 'wi-snow',
            '13n': 'wi-snow',
            '50d': 'wi-fog',
            '50n': 'wi-fog'
        }
    },
    constant: {
        dow: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
};

weatherWidget.init = function (settings) {
    this.settings = Object.assign(this.settings, settings);
    Promise.all([this.getWeather(), this.getForecast()]).then((resolve) => {
        let weather = resolve[0];
        let forecast = resolve[1].list;

        //@TODO lokalizacja bez zwrotki, blad

        document.getElementsByClassName('ow-city-name')[0].innerHTML = weather.name;
        document.getElementsByClassName('ow-temp-current')[0].innerHTML = Math.round(weather.main.temp) + '&deg';
        document.getElementsByClassName('ow-pressure')[0].innerHTML = weather.main.pressure + ' hPa';
        document.getElementsByClassName('ow-humidity')[0].innerHTML = weather.main.humidity + '%';
        document.getElementsByClassName('ow-wind')[0].innerHTML = weather.wind.speed + ' km/h';
        if (!!this.settings.icon_mapping[weather.weather[0].icon]) {
            let icon = this.settings.icon_mapping[weather.weather[0].icon];
            let ico_current =  document.getElementsByClassName('ow-ico-current')[0];
            if (ico_current.classList) {
                ico_current.classList.add(icon);
            } else {
                ico_current.className += ' ' + icon;
            }

        }

        // split forecast data by day
        // get max and min temperature for a day
        //@TODO get average forecast by day

        // remove todays weather from forecast
        forecast = forecast.filter((x) => {
            return x.dt_txt.substr(0, 10) !== new Date().toJSON().slice(0, 10);
        });

        // array to hold forecast items
        let fs = [];

        for (let f of forecast) {
            let date = f.dt_txt.substr(0, 10);
            if (!!fs[date]) {
                fs[date].temp_max = f.main.temp_max > fs[date].temp_max ? f.main.temp_max : fs[date].temp_max;
                fs[date].temp_min = f.main.temp_min < fs[date].temp_min ? f.main.temp_min : fs[date].temp_min;
                fs[date].icons.push(f.weather[0].icon);
            } else {
                fs[date] = {
                    dow: this.constant.dow[new Date(date).getDay()],
                    temp_max: f.main.temp_max,
                    temp_min: f.main.temp_min,
                    icons: [f.weather[0].icon]
                }
            }
        }

        let forecast_items = document.getElementsByClassName('ow-forecast-item');
        console.log(forecast_items);

        // for each daily forecast, get weather icon with highest occurence
        // show the foreacast
        let FIcounter = 0;
        for (let day in fs) {
            console.log(FIcounter);
            let icon = this.settings.icon_mapping[this.getIconWithHighestOccurence(fs[day].icons)];
            let fi = forecast_items[FIcounter];
            fi.getElementsByClassName('max')[0].innerHTML = Math.round(fs[day].temp_max) + '&deg';
            fi.getElementsByClassName('min')[0].innerHTML = Math.round(fs[day].temp_min) + '&deg';
            fi.getElementsByClassName('ow-day')[0].innerHTML = fs[day].dow;
            let ico_current =  fi.getElementsByClassName('ow-ico-forecast')[0];
            if (ico_current.classList) {
                ico_current.classList.add(icon);
            } else {
                ico_current.className += ' ' + icon;
            }
            FIcounter++;
        }

    });
};

weatherWidget.getForecast = function () {
    let params = {
        'q': this.settings.city_name,
        'APPID': this.settings.api_key,
        'units': this.settings.units
    };

    let p = '?' + Object.keys(params)
            .map((key) => {
                return key + '=' + params[key]
            })
            .join('&');
    return this.makeRequest(this.settings.forecast_url, p);
};

weatherWidget.getWeather = function () {
    let params = {
        'q': this.settings.city_name,
        'APPID': this.settings.api_key,
        'units': this.settings.units
    };

    let p = '?' + Object.keys(params)
            .map((key) => {
                return key + '=' + params[key]
            })
            .join('&');
    return this.makeRequest(this.settings.weather_url, p);
};

weatherWidget.makeRequest = function (url, params) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', url + params, true);
        req.responseType = 'json';

        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                resolve(req.response);
            } else {
                reject(Error(req.status));
            }
        };

        req.onerror = () => reject('Error occured while connecting to Weather API');
        req.send(params);
    });
};

weatherWidget.getIconWithHighestOccurence = function (a) {
    let elems = Array.prototype.slice.call(a);
    return elems.sort((a, b) =>
        elems.filter(v => v === a).length - elems.filter(v => v === b).length
    ).pop();
}

// run the widget
let widget = Object.create(weatherWidget);
widget.init({
  city_name: 'Wichita Falls'
});