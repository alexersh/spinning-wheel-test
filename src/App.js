import './App.scss';
import { useRef, useState } from 'react';
import {
  DEFAULT_WHEEL_SPINS,
  limitToValueMap,
  MAX_ADDITIONAL_SPINS,
  sectors,
  sectorToDegreesMap,
  variants,
} from './constants';

// Returns a number from -10 to 10
const generateRandomSectorPosition = () => {
  return Math.floor(Math.random() * 21) - 10;
};

const calculateWheelSpinDegrees = (result) => {
  return (
    (DEFAULT_WHEEL_SPINS + Math.ceil(Math.random() * MAX_ADDITIONAL_SPINS)) * 360 +
    generateRandomSectorPosition() +
    (360 - sectorToDegreesMap[result])
  );
};

function App() {
  // For test
  const [currentVariant, setCurrentVariant] = useState(variants[0]);
  const [result, setResult] = useState(sectors[0].resultType);

  const [isLoading, setIsLoading] = useState(false);

  const [isShowResult, setIsShowResult] = useState(false);
  const wheelRef = useRef(null);

  const onClick = () => {
    setIsLoading(true);
    setIsShowResult(false);

    setTimeout(() => {
      setIsLoading(false);
      wheelRef.current.style.transform = `rotate(0deg)`;
      setTimeout(() => {
        wheelRef.current.classList.add('my-animation');
        wheelRef.current.style.transform = `rotate(${calculateWheelSpinDegrees(result)}deg)`;
      }, 10);
    }, 2000);
  };
  const onTransitionEnd = () => {
    console.log('>>> transition end');
    setIsShowResult(true);
    if (wheelRef.current) {
      // wheelRef.current.style.transform = `rotate(${rotationDegree % 360}deg)`;
    }
  };

  return (
    <div className={`page ${currentVariant}`}>
      <div className="header" />
      <div className="sidebar" />
      <div className="wheel-container">
        <div
          ref={wheelRef}
          className={`wheel ${isLoading && 'loading'}`}
          onTransitionEnd={onTransitionEnd}
        >
          {sectors.map((sector) => {
            return (
              <div
                key={`${sector.resultType}-${sector.deg}`}
                className={`sector ${sector.type} ${
                  sector.resultType === result && isShowResult && 'glowing'
                }`}
                style={{ transform: `rotate(${sector.deg}deg)` }}
              >
                <span className="text">{limitToValueMap[currentVariant][sector.type]}</span>
              </div>
            );
          })}
        </div>
        <div className="pointer" />
        <div className="btn-container">
          <button type="button" className="btn" onClick={onClick} />
        </div>
      </div>
      <div className="bonus-wheel" />
      <div className={`wheel-type ${currentVariant}`} />
      <div className="win" />
      <div className="footer" />

      {/* Just for the test */}
      <div className="settings">
        <div className="box">
          <span>Current mode</span>
          <div className="variants">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setCurrentVariant(variant)}
                className={`variant ${currentVariant === variant && 'active'}`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
        <div className="box">
          <span>Next spin result</span>
          <div className="variants">
            {sectors.map((sector) => (
              <button
                key={sector.resultType}
                onClick={() => {
                  if (sector.resultType === result) {
                    setResult('');
                    return;
                  }
                  setResult(sector.resultType);
                }}
                className={`variant ${result === sector.resultType && 'active'}`}
              >
                {sector.resultType}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
