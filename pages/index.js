import Head from 'next/head';
import { Button, Heading, Input } from '@chakra-ui/react';
import ConvertDate from '../components/ConvertDate';
import clsx from 'clsx';
import { useState } from 'react';

export default function Home({}) {
  const d = new Date();
  const currentYear = d.getFullYear();
  const currentTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [zip, setZip] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [updated, setUpdated] = useState('');
  const [temp, setTemp] = useState('');
  const [conditionText, setConditionText] = useState('');
  const [conditionIcon, setConditionIcon] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [cloud, setCloud] = useState('');
  const [sunset, setSunset] = useState('');
  const [moonrise, setMoonrise] = useState('');
  const [moonset, setMoonset] = useState('');
  const [phase, setPhase] = useState('');
  const [illumination, setIllumination] = useState('');

  const { NEXT_PUBLIC_API_KEY } = process.env;

  const handleSubmit = async e => {
    e.preventDefault();
    setZip('');

    const baseUrl = 'https://api.weatherapi.com/v1';
    const day = new Date();
    const today = day.getDate();

    const res = await fetch(`${baseUrl}/current.json?key=${NEXT_PUBLIC_API_KEY}&q=${zip}`);
    const json = await res.json();
    const location = await json.location;
    const current = await json.current;

    const astro = await fetch(
      `${baseUrl}/astronomy.json?key=${NEXT_PUBLIC_API_KEY}&q=${zip}&dt=${today}`
    );
    const jsonAstro = await astro.json();

    setName(location.name),
      setRegion(location.region),
      setUpdated(current.last_updated),
      setTemp(current.temp_f),
      setConditionText(current.condition.text),
      setConditionIcon(current.condition.icon),
      setWind(current.wind_mph),
      setHumidity(current.humidity),
      setCloud(current.cloud),
      setSunset(jsonAstro.astronomy.astro.sunset),
      setMoonrise(jsonAstro.astronomy.astro.moonrise),
      setMoonset(jsonAstro.astronomy.astro.moonset),
      setPhase(jsonAstro.astronomy.astro.moon_phase),
      setIllumination(jsonAstro.astronomy.astro.moon_illumination);
  };

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
            {cloud > 30 ? 'Not worth it' : 'Take a look!'}
          </h1>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
            <div className="px-6 py-4">
              <div className="flex flex-row mb-2">
                <Input
                  bg="white"
                  placeholder="Enter Zip Code"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
                <Button colorScheme="blue" type="submit" variant="solid" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
              <div className="font-bold text-xl mb-2">
                {name ? (
                  <p>
                    {name}, {region}
                  </p>
                ) : (
                  <p>Location Name</p>
                )}
                <span>{currentTime ? currentTime : 'current time'}</span>
                <p>Current Conditions</p>
              </div>
              <span
                className={clsx(
                  'flex flex-row text-center justify-center items-center ml-16',
                  conditionIcon ? '-mb-4' : 'mb-4'
                )}
              >
                {conditionText ? conditionText : 'current conditions'}{' '}
                <img className="ml-2" src={conditionIcon ? conditionIcon : ''} />
              </span>
              <p
                className={clsx(
                  temp >= 80
                    ? 'text-red-500'
                    : temp <= 79 && temp >= 40
                    ? 'text-green-500'
                    : 'text-blue-500'
                )}
              >
                Temp: {temp ? `${Math.floor(temp)}\u00B0F` : ''}
              </p>
              <p className={clsx(wind >= 7 ? 'text-red-500' : 'text-green-500')}>
                Wind: {Math.floor(wind)} MPH
              </p>
              <p className={clsx(humidity >= 85 ? 'text-red-500' : 'text-green-500')}>
                Humidity: {humidity ? `${humidity}%` : ''}
              </p>
              <p
                className={clsx('font-extrabold', cloud <= 30 ? 'text-green-600' : 'text-red-600')}
              >
                Cloud Coverage: {cloud}%
              </p>
              <p>Sunset: {sunset ? sunset : ''}</p>
              <p>Moon Rise: {moonrise ? moonrise : ''}</p>
              <p>Moon Set: {moonset ? moonset : ''}</p>
              <p>Moon Phase: {phase ? phase : ''}</p>
              <p
                className={clsx(
                  'font-extrabold',
                  illumination <= 50 ? 'text-green-600' : 'text-red-600'
                )}
              >
                Illumination: {illumination ? `${illumination}%` : ''}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Last Updated: {updated ? <ConvertDate dateString={updated} /> : ''}
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
