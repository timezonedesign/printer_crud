import { combineReducers } from 'redux';
import PrinterReducer from './printer-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  printerStore: PrinterReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
