import Head from 'next/head';
import { Heading } from '@chakra-ui/core';

export default function Home({
  name,
  region,
  lat,
  lon,
  time,
  temp,
  condition_text,
  wind,
  humidity,
  cloud,
}) {
  return (
    <div className="max-w-screen-lg max-h-full flex flex-col">
      <Head>
        <title>Worth Going Outside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex m-4 text-3xl font-bold">
        <Heading className="text-center">Worth Going Outside?</Heading>
      </div>
      <div className="flex flex-row justify-center text-center item-center">
        <div className="flex flex-col m-4">
          <p>
            {name}, {region}
          </p>
          <p>
            Lat: {lat}, Lon: {lon}
          </p>
          <p>Time: {time}</p>
          <p>Temp: {temp}</p>
          <p>Conditions: {condition_text}</p>
          <p>Wind: {wind}</p>
          <p>Humidity: {humidity}</p>
          <p>Cloud coverage: {cloud}</p>
        </div>
        <div className="flex items-center ml-4">
          <h1 className="text-3xl">{cloud > 40 ? 'Not worth it' : 'Go for it dude!'}</h1>
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
    lat: location.lat,
    lon: location.lon,
    time: location.localtime,
    temp: current.temp_f,
    condition_text: current.condition.text,
    wind: current.wind_mph,
    humidity: current.humidity,
    cloud: current.cloud,
  };
};
