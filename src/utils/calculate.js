export const calculate = (dispatch, input, firstNumber, operation) => {
  switch (operation) {
    case '+':
      dispatch({
        type: 'CALCULATE',
        payload: firstNumber + parseInt(input.current.value)
      });
      break;
    case '-':
      dispatch({
        type: 'CALCULATE',
        payload: firstNumber - parseInt(input.current.value)
      });
      break;
    case 'x':
      dispatch({
        type: 'CALCULATE',
        payload: firstNumber * parseInt(input.current.value)
      });
      break;
    case '/':
      dispatch({
        type: 'CALCULATE',
        payload: firstNumber / parseInt(input.current.value)
      });
      break;
    default:
      break;
  }
  input.current.value = '';
};
