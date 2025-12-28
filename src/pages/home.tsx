import { AirplayIcon, AirVentIcon, ArrowRight, ClockAlertIcon, CloudAlertIcon, CloudRainWindIcon, DropletOffIcon, Droplets, DropletsIcon, PercentCircle, WindIcon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import type { RealTimeResponse } from '../types/realtime.response'
import { toast, ToastContainer } from 'react-toastify'
import { LocationContext } from '../context/LocationContext'


function HomePage() {
    const navigate = useNavigate()
    const [realTimeResponse, setRealTimeResponse] = useState<RealTimeResponse | undefined>()

    const getRealTimeWeather = async () => {
        if (location !== "") {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=9b4e13dc1bd447a4a7990414250411&q=${location}`)
            setRealTimeResponse(response.data)
        } else {
            toast("Enter a location to get weather details!", {
                position: "top-center",
                hideProgressBar: true,
            })
        }
    }

    const { location, setLocation } = useContext(LocationContext)

    useEffect(() => {
        getRealTimeWeather()
    }, [])

    return (
        <div className="min-h-screen bg-blue-100">
            <div className="p-3 sm:p-4">

                {/* Header */}
                <div className="bg-white border border-blue-200 max-w-4xl mx-auto p-3 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
                    <div>
                        <p className="text-base sm:text-lg font-semibold">
                            {realTimeResponse?.location.name}
                        </p>
                        <p className="text-xs text-gray-600">
                            {realTimeResponse?.location.region}
                        </p>
                        <p className="text-xs text-gray-600">
                            {realTimeResponse?.location.country}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="border-gray-200 border-2 rounded-xl p-2 w-full sm:w-56">
                            <input
                                type="text"
                                placeholder="search..."
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                                className="w-full focus:outline-0 text-sm"
                            />
                        </div>
                        <button
                            onClick={getRealTimeWeather}
                            className="bg-blue-600 text-white p-2 px-4 rounded-xl hover:bg-blue-800 w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Weather Info */}
                <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row justify-center items-center gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="text-center">
                                <img
                                    src={realTimeResponse?.current.condition.icon}
                                    alt={realTimeResponse?.current.condition.text}
                                    className="mx-auto w-16 sm:w-auto"
                                />
                                <p className="text-blue-400 text-sm sm:text-base">
                                    {realTimeResponse?.current.condition.text}
                                </p>
                            </div>

                            <h2 className="text-5xl sm:text-7xl md:text-8xl text-blue-800 font-semibold">
                                {realTimeResponse?.current.temp_c}°C
                            </h2>
                        </div>

                        <p className="text-sm sm:text-xl text-blue-500 text-center">
                            {realTimeResponse?.current.last_updated}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12 sm:mt-20">

                    <div className="bg-blue-50 p-3 py-8 rounded-xl border border-blue-300 flex gap-3 justify-center items-center">
                        <div className="text-blue-700">
                            <DropletsIcon size={36} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Humidity</h3>
                            <p className="text-blue-900 text-lg sm:text-xl font-semibold py-2">
                                {realTimeResponse?.current.humidity}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 py-8 rounded-xl border border-blue-300 flex gap-3 justify-center items-center">
                        <div className="text-blue-700">
                            <WindIcon size={36} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Wind</h3>
                            <p className="text-blue-900 text-lg sm:text-xl font-semibold py-2">
                                {realTimeResponse?.current.wind_kph}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 py-8 rounded-xl border border-blue-300 flex gap-3 justify-center items-center sm:row-span-2">
                        <div className="text-blue-700">
                            <CloudAlertIcon size={36} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Pressure</h3>
                            <p className="text-blue-900 text-lg sm:text-xl font-semibold py-2">
                                {realTimeResponse?.current.pressure_mb}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 py-8 rounded-xl border border-blue-300 flex gap-3 justify-center items-center">
                        <div className="text-blue-700">
                            <CloudRainWindIcon size={36} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Dew</h3>
                            <p className="text-blue-900 text-lg sm:text-xl font-semibold py-2">
                                {realTimeResponse?.current.dewpoint_c}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 py-8 rounded-xl border border-blue-300 flex gap-3 justify-center items-center">
                        <div className="text-blue-700">
                            <PercentCircle size={36} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-blue-500">Precipitation</h3>
                            <p className="text-blue-900 text-lg sm:text-xl font-semibold py-2">
                                {realTimeResponse?.current.precip_mm}
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/forecast")}
                        className="bg-blue-600 text-white font-semibold p-3 col-span-1 sm:col-span-2 md:col-span-3 flex gap-2 justify-center items-center rounded-xl hover:bg-blue-700 cursor-pointer"
                    >
                        Forecast Page
                        <ArrowRight />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>

    )
}

export default HomePage