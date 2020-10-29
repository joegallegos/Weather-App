import Head from 'next/head';
import { Heading } from '@chakra-ui/core';
import ConvertDate from '../components/ConvertDate';
import clsx from 'clsx';

export default function Home({
  name,
  region,
  temp,
  condition_text,
  condition_icon,
  wind,
  humidity,
  cloud,
  updated,
  sunset,
  moonrise,
  moonset,
  phase,
  illumination,
}) {
  const d = new Date();
  const currentYear = d.getFullYear();
  const currentTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-full max-h-full flex flex-col">
      <Head>
        <title>Worth Going Outside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex m-4 text-3xl justify-center font-bold">
        <Heading className="text-center">Worth Going Outside?</Heading>
      </div>
      <div className="flex flex-row justify-center text-center item-center">
        <div className="flex flex-col m-4">
          <h1 className={clsx('text-5xl mb-8', cloud <= 30 ? 'text-green-600' : 'text-red-600')}>
            {cloud > 30 ? 'Not worth it' : 'Go for it dude!'}
          </h1>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <p>
                  {name}, {region}
                </p>
                <span>{currentTime}</span>
              </div>
              <span className="flex flex-row text-center justify-center items-center ml-16 -mb-4">
                Conditions: {condition_text} <img className="ml-2" src={condition_icon} />
              </span>
              <p>Temp: {Math.floor(temp)}&deg;F</p>
              <p>Wind: {Math.floor(wind)} MPH</p>
              <p>Humidity: {humidity}%</p>
              <p
                className={clsx('font-extrabold', cloud <= 30 ? 'text-green-600' : 'text-red-600')}
              >
                Cloud coverage: {cloud}%
              </p>
              <p>Sunset: {sunset}</p>
              <p>Moon Rise: {moonrise}</p>
              <p>Moon Set: {moonset}</p>
              <p>Moon Phase: {phase}</p>
              <p
                className={clsx(
                  'font-extrabold',
                  illumination <= 50 ? 'text-green-600' : 'text-red-600'
                )}
              >
                Illumination: {illumination}%
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Last Updated: <ConvertDate dateString={updated} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <footer>Joe Gallegos &#169;{currentYear}</footer>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const baseUrl = 'http://api.weatherapi.com/v1';
  const key = process.env.API_KEY;

  const res = await fetch(baseUrl + '/current.json?key=' + key + '&q=75098');
  const json = await res.json();
  const location = await json.location;
  const current = await json.current;

  const astro = await fetch(baseUrl + '/astronomy.json?key=' + key + '&q=75098&dt=2020-10-28');
  const jsonAstro = await astro.json();

  return {
    name: location.name,
    region: location.region,
    updated: current.last_updated,
    temp: current.temp_f,
    condition_text: current.condition.text,
    condition_icon: current.condition.icon,
    wind: current.wind_mph,
    humidity: current.humidity,
    cloud: current.cloud,
    sunset: jsonAstro.astronomy.astro.sunset,
    moonrise: jsonAstro.astronomy.astro.moonrise,
    moonset: jsonAstro.astronomy.astro.moonset,
    phase: jsonAstro.astronomy.astro.moon_phase,
    illumination: jsonAstro.astronomy.astro.moon_illumination,
  };
};
