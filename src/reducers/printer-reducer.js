const defaultState = {
  printers: [],
  printer: {name:{}},
  loading: false,
  errors:{}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_PRINTERS_FULFILLED': {
      return {
        ...state,
        printers: action.prinload.data.data,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_PRINTERS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_printerS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.prinload.message }
      }
    }

    case 'NEW_PRINTER': {
      return {
        ...state,
        printer: {name:{}}
      }
    }

    case 'SAVE_PRINTER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_PRINTER_FULFILLED': {
      return {
        ...state,
        printers: [...state.printers, action.prinload.data],
        errors: {},
        loading: false
      }
    }

    case 'SAVE_PRINTER_REJECTED': {
      const data = action.prinload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'FETCH_PRINTER_PENDING': {
      return {
        ...state,
        loading: true,
        printer: {name:{}}
      }
    }

    case 'FETCH_PRINTER_FULFILLED': {
      return {
        ...state,
        printer: action.prinload.data,
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_PRINTER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_PRINTER_FULFILLED': {
      const printer = action.prinload.data;
      return {
        ...state,
        printers: state.printers.map(item => item.date === printer.date ? printer : item),
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_PRINTER_REJECTED': {
      const data = action.prinload.response.data;
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'DELETE_PRINTER_FULFILLED': {
      const date = action.prinload.data.date;
      return {
        ...state,
        printers: state.printers.filter(item => item.date !== date)
      }
    }

    default:
      return state;
  }
}
