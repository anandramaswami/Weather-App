import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import type { ForecastResponse } from '../types/forecast.response'
import { LocationContext } from '../context/LocationContext'
import { toast } from 'react-toastify'

function ForecastPage() {
  const [forecast, setForecast] = useState<ForecastResponse>()
  const [isloading, setisLoading] = useState(false)

  const viewforecast = async () => {
    try {
      setisLoading(true)
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=9b4e13dc1bd447a4a7990414250411&q=${location}&days=1&aqi=no&alerts=no`)
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
    <div className="min-h-screen bg-blue-100">
      {isloading && (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-blue-900 text-lg sm:text-xl font-bold">
            Fetching data....
          </p>
        </div>
      )}

      <div className="min-h-screen p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-white border border-blue-300 mx-auto p-3 sm:p-5 rounded-2xl w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-base sm:text-lg text-blue-800 font-semibold">
                {forecast?.location.name}
              </p>
              <p className="text-xs text-blue-600">
                {forecast?.location.region}
              </p>
              <p className="text-xs text-blue-600">
                {forecast?.location.country}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-blue-700">
              {forecast?.current.last_updated}
            </p>
          </div>

          <div className="mt-4">
            {forecast?.forecast.forecastday.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4"
              >
                {item.hour.map((hourItem, hourIndex) => (
                  <div
                    key={hourIndex}
                    className="bg-blue-300 p-3 sm:p-4 space-y-2 rounded-xl flex flex-col justify-between"
                  >
                    <div className="text-xs text-center flex flex-col gap-1 items-center">
                      <img
                        src={hourItem.condition.icon}
                        alt=""
                        className="w-10 h-10"
                      />
                      <p className="line-clamp-2">
                        {hourItem.condition.text}
                      </p>
                    </div>

                    <p className="text-center text-xl sm:text-2xl md:text-3xl text-blue-900 font-semibold">
                      {hourItem.temp_c}°
                    </p>

                    <p className="text-[10px] sm:text-xs text-center text-blue-700">
                      {hourItem.time}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="mt-6 bg-blue-600 text-white p-2 px-4 rounded-xl  hover:bg-blue-800">
              <a href="/" >
                Back to Home
              </a>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForecastPage



