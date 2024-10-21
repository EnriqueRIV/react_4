import './Timer.css';

const Timer = ({ time }) => {
  return (
    <>
      <div className='timer'>
        <h3>{time.toLocaleTimeString()}</h3>
      </div>
    </>
  );
};

export default Timer;
