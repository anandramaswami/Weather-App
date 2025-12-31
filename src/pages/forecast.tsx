import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import type { ForecastResponse } from '../types/forecast.response'
import { LocationContext } from '../context/LocationContext'
import { toast } from 'react-toastify'
import { DropletsIcon } from 'lucide-react'
import { WindIcon } from 'lucide-react'


function ForecastPage() {
  const [forecast, setForecast] = useState<ForecastResponse>()
  const [isloading, setisLoading] = useState(false)

  const viewforecast = async () => {
    try {
      setisLoading(true)
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=9b4e13dc1bd447a4a7990414250411&q=${location}&days=7&aqi=no&alerts=no`)
      setForecast(response.data)
      setisLoading(false)
    } catch (error) {
      toast("An error occurred!")
      setisLoading(false)
    }
  }

  useEffect(() => {
    viewforecast()
  }, [])

  const { location } = useContext(LocationContext)


  return (
    <div className="min-h-screen bg-blue-300">
      {isloading && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-blue-900 text-xl sm:text-2xl font-bold">
            Fetching data....
          </p>
        </div>
      )}

      <div className="min-h-screen p-2 sm:p-4 flex items-center justify-center">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-5 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="p-2 px-5">
              <p className="text-base sm:text-2xl text-blue-800 font-semibold">
                {forecast?.location.name}
              </p>
              <p className="text-lg text-blue-600">
                {forecast?.location.region}
              </p>
              <p className="text-lg text-blue-600">
                {forecast?.location.country}
              </p>
            </div>

            <h2 className="text-center text-2xl font-bold text-blue-900">
              Hour Forecast
            </h2>

            <p className="text-xs sm:text-lg text-blue-800 px-5">
              {forecast?.current.last_updated}
            </p>
          </div>

          <div className="mt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-3">
              {forecast?.forecast.forecastday[0].hour.map((hourItem, hourIndex) => (
                <div key={hourIndex} style={{ transitionDelay: `${hourIndex * 80}ms` }} className="bg-white/50 backdrop-blur-xl border border-white p-3 sm:p-4 rounded-xl flex flex-col justify-between space-y-2 opacity-0 translate-y-7 animate-[slideUp_0.7s_ease-out_forwards]">
                  <div className="text-xs text-center flex flex-col gap-1 items-center">
                    <img src={hourItem.condition.icon} alt="" className="w-10 h-10" />
                    <p className="line-clamp-2">
                      {hourItem.condition.text}
                    </p>
                  </div>

                  <p className="text-center text-xl sm:text-2xl md:text-xl text-blue-900 font-semibold">
                    {hourItem.temp_c}°C
                  </p>

                  <div className="w-full flex flex-col gap-2">
                    <div className="flex gap-1 text-blue-900 items-center">
                      <DropletsIcon size={15} />
                      <p className="text-xs">
                        {hourItem.humidity} %
                      </p>
                    </div>

                    <div className="flex gap-1 text-blue-900 items-center">
                      <WindIcon size={15} />
                      <p className="text-xs">
                        {hourItem.wind_kph} km/h
                      </p>
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-xs text-center text-gray-800">
                    {(hourItem?.time ?? "").slice(-5)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            {forecast?.forecast.forecastday[0].day && (
              <div className="bg-blue-300 p-4 rounded-xl space-y-4">
                <h1 className="text-center text-2xl font-bold text-blue-900">3 Day Forecast</h1>
                <div className="mt-8 grid grid-cols-1 gap-4">
                  {forecast.forecast.forecastday.map((dayItem, dayIndex) => {
                    const dayName = new Date(dayItem.date).toLocaleDateString("en-IN", { weekday: "short" });
                    return (
                      <div key={dayIndex} className="bg-white/50 backdrop-blur-xl border border-white p-4 rounded-lg flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
                        <img src={dayItem.day.condition.icon} alt="" className="w-10 h-10" />
                        <p className="text-sm text-center">
                          {dayItem.day.condition.text}
                        </p>
                        <p className="text-2xl sm:text-3xl text-blue-900 font-semibold">
                          <span className="text-sm">max</span>
                          {dayItem.day.maxtemp_c}°C / {dayItem.day.mintemp_c}°C
                          <span className="text-sm">min</span>
                        </p>

                        <div className="flex gap-1 text-blue-900 items-center">
                          <DropletsIcon size={15} />
                          <p>
                            {dayItem.day.avghumidity} %
                          </p>
                        </div>

                        <div className="flex gap-1 text-blue-900 items-center">
                          <WindIcon size={15} />
                          <p>
                            {dayItem.day.maxwind_kph} km/h
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <p className="text-lg text-blue-600 font-semibold">
                            {dayItem.date.toString()}
                          </p>
                          <p className="text-xl text-blue-600 font-semibold">
                            {dayName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <a href="/" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800">Back to Home</a>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ForecastPage



