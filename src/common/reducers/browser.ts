export interface IBrowserState {
  userAgent: string;
}

const initalState: IBrowserState = {
  userAgent: null,
};

const browser = (state = initalState, action: string) => {
  return state;
};

export default browser;
