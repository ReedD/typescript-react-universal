export interface IBrowserState {
  userAgent: string;
}

const initialState: IBrowserState = {
  userAgent: null,
};

const browser = (state = initialState, action: string) => {
  return state;
};

export default browser;
