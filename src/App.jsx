import './App.css';
import Calculator from './components/Calculator/Calculator';
import Timer from './components/Timer/Timer';
import { useTime } from './customHooks/useTime';

function App() {
  const { time } = useTime();

  return (
    <>
      <div className='card'>
        <Timer time={time} />
        <Calculator />
      </div>
    </>
  );
}

export default App;
