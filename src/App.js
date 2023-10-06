import './App.scss';
import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_WHEEL_SPINS,
  MAX_ADDITIONAL_SPINS,
  sectors,
  sectorToDegreesMap,
} from './constants';

// Returns a number from -10 to 10
const generateRandomSectorPosition = () => {
  return Math.floor(Math.random() * 21) - 10;
};

const questions = {
  1: 'Вопрос под номером 1 это я вопрос вообще-то?',
  2: 'Вопрос под номером 2 это я вопрос вообще-то?',
  3: 'Вопрос под номером 3 это я вопрос вообще-то?',
  4: 'Вопрос под номером 4 это я вопрос вообще-то?',
  5: 'Вопрос под номером 5 это я вопрос вообще-то?',
  6: 'Вопрос под номером 6 это я вопрос вообще-то?',
  7: 'Вопрос под номером 7 это я вопрос вообще-то?',
  8: 'Вопрос под номером 8 это я вопрос вообще-то?',
  9: 'Вопрос под номером 9 это я вопрос вообще-то?',
  10: 'Вопрос под номером 10 это я вопрос вообще-то',
  11: 'Вопрос под номером 11 это я вопрос вообще-то',
  12: 'Вопрос под номером 12 это я вопрос вообще-то',
};

const calculateWheelSpinDegrees = (result) => {
  return (
    (DEFAULT_WHEEL_SPINS + Math.ceil(Math.random() * MAX_ADDITIONAL_SPINS)) * 360 +
    generateRandomSectorPosition() +
    (360 - sectorToDegreesMap[result])
  );
};

const availableQuestionsDefault = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text || !delay) {
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

function findClosestNumber(target, set) {
  let nextNumber = Infinity;

  for (const number of set) {
    if (number >= target && number < nextNumber) {
      nextNumber = number;
    }
  }

  return nextNumber !== Infinity ? nextNumber : null;
}

function App() {
  const wheelRef = useRef(null);
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState(availableQuestionsDefault);
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const [questionNum, setQuestionNum] = useState(null);

  const onClick = async () => {
    setIsSpinning(true);
    setIsShowResult(false);
    setIsShowQuestion(false);
    if (questionNum) {
      const available = availableQuestions;
      available.delete(questionNum);
      setAvailableQuestions(available);
    } else if (result) {
      const available = availableQuestions;
      available.delete(+result.split('_')[1]);
      setAvailableQuestions(available);
    }
    setResult('');
    setQuestionNum(null);

    // Random number from 1 to 12
    const randomResult = `SECTOR_${Math.floor(Math.random() * 12) + 1}`;
    const degree = calculateWheelSpinDegrees(randomResult);
    setRotationDegree(degree);
    setQuestionNum(findClosestNumber(randomResult.split('_')[1], availableQuestions));

    wheelRef.current.style.transform = `rotate(0deg)`;
    wheelRef.current.style.transition = `transform 5s cubic-bezier(0, 0, 0.18, 1)`;
    setTimeout(() => {
      wheelRef.current.style.transform = `rotate(${degree}deg)`;
    }, 50);
    setResult(randomResult);
  };
  const onTransitionEnd = () => {
    setIsShowResult(true);
    setIsSpinning(false);
    if (wheelRef.current) {
      wheelRef.current.style.transition = '';
      wheelRef.current.style.transform = `rotate(${rotationDegree % 360}deg)`;
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="wheel-container">
          <div
            ref={wheelRef}
            className={`wheel ${isSpinning && 'loading'}`}
            onTransitionEnd={onTransitionEnd}
          >
            {sectors.map((sector, index) => {
              return (
                <div
                  key={`${sector.resultType}-${sector.deg}`}
                  className={`sector ${sector.type} ${
                    sector.resultType === result && isShowResult && 'glowing'
                  }`}
                  style={{ transform: `rotate(${sector.deg}deg)` }}
                >
                  <span className="text">
                    {availableQuestions.has(index + 1) ? index + 1 : '→'}{' '}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="btn"
              onClick={onClick}
              disabled={isSpinning || !availableQuestions.size}
            />
          </div>
        </div>
        <div className="pointer" />
      </div>
      <div className="question">
        {questionNum && (
          <span
            className={isShowResult ? 'opacity' : ''}
            onTransitionEnd={() => {
              setIsShowQuestion(true);
            }}
          >{`Вопрос номер: ${questionNum}`}</span>
        )}
        {isShowQuestion && <Typewriter text={questions[questionNum]} delay={100} />}
      </div>
    </div>
  );
}

export default App;
