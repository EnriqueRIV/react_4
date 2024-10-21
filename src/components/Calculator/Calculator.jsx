import { calculate } from '../../utils/calculate';
import './Calculator.css';
import { memo, useCallback, useMemo, useReducer, useRef } from 'react';

const START_STATE = {
  firstNumber: 0,
  operation: '',
  result: 0,
  historicResults: [],
  historicResultsFinish: []
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_OPERATION':
      return {
        ...state,
        firstNumber: parseInt(action.payload.inputValue),
        operation: action.payload.operation
      };
    case 'CALCULATE':
      return {
        ...state,
        result: action.payload,
        firstNumber: 0,
        operation: '',
        historicResults: [...state.historicResults, action.payload]
      };
    case 'FINISH':
      return {
        ...state,
        historicResultsFinish: [...action.payload]
      };
    default:
      return state;
  }
};

const Calculator = memo(() => {
  const [state, dispatch] = useReducer(calculatorReducer, START_STATE);

  const input = useRef();

  const {
    result,
    operation,
    firstNumber,
    historicResults,
    historicResultsFinish
  } = state;

  const selectOperation = useCallback(
    (operation) => {
      dispatch({
        type: 'SELECT_OPERATION',
        payload: { inputValue: input.current.value, operation: operation }
      });
      input.current.value = '';
    },
    [operation]
  );

  useMemo(() => {
    dispatch({
      type: 'FINISH',
      payload: historicResults.toSorted((a, b) => a - b)
    });
  }, [historicResults]);

  return (
    <div className='calculatorContainer'>
      <h2>SIMPLE CALCULATOR</h2>
      <input type='number' ref={input} />
      <div className='btnsContainer'>
        <button onClick={() => selectOperation('+')}>+</button>
        <button onClick={() => selectOperation('-')}>-</button>
        <button onClick={() => selectOperation('x')}>x</button>
        <button onClick={() => selectOperation('/')}>/</button>
      </div>
      <div className='resContainer'>
        <div className='btnResult'>
          <button
            onClick={() => calculate(dispatch, input, firstNumber, operation)}
          >
            =
          </button>
        </div>
        <div className='result'>
          <h3>Result: {result}</h3>
        </div>
      </div>
      <div className='resultsContainer'>
        <h3>Historical of Results</h3>
        {historicResultsFinish.map((histResult, index) => (
          <h3 key={index}>{histResult}</h3>
        ))}
      </div>
    </div>
  );
});

export default Calculator;
