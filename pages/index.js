import Head from 'next/head';
import { Heading } from '@chakra-ui/core';
import Date from '../components/Date';

export default function Home({
  name,
  region,
  time,
  temp,
  condition_text,
  condition_icon,
  wind,
  humidity,
  cloud,
}) {
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
          <h1 className="text-5xl mb-8">{cloud > 40 ? 'Not worth it' : 'Go for it dude!'}</h1>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {name}, {region}, <Date dateString={time} />
              </div>
              <p>Temp: {temp}</p>
              <span className="flex flex-row text-center justify-center items-center ml-16">
                Conditions: {condition_text} <img className="ml-2" src={condition_icon} />
              </span>
              <p>Wind: {wind} MPH</p>
              <p>Humidity: {humidity}%</p>
              <p>Cloud coverage: {cloud}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(
    'http://api.weatherapi.com/v1/current.json?key=17cfa4ff046e47a1828152113202810&q=75098'
  );
  const json = await res.json();
  const location = await json.location;
  const current = await json.current;

  return {
    name: location.name,
    region: location.region,
    time: location.localtime,
    temp: current.temp_f,
    condition_text: current.condition.text,
    condition_icon: current.condition.icon,
    wind: current.wind_mph,
    humidity: current.humidity,
    cloud: current.cloud,
  };
};
