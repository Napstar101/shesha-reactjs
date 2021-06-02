import { ISignalRStateContext } from './contexts';
import { SignalRActionEnums } from './actions';

export function signalRReducer(
  state: ISignalRStateContext,
  action: ReduxActions.Action<ISignalRStateContext>
): ISignalRStateContext {
  const { type, payload } = action;
  //#endregion

  switch (type) {
    case SignalRActionEnums.SetConnection:
      /* NEW_ACTION_ENUM_GOES_HERE */

      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
