import { useEffect, useState } from "react";

function useWeatherReport() {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        console.log(weather);
    }, [weather]);

    const updateWeatherReport = (coords) => {
        fetch("/weather_report", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coords)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(weatherReportData => {
                    setWeather(weatherReportData);
                });
            }
        })
    }

    return { weather, updateWeatherReport }
}

export default useWeatherReport;