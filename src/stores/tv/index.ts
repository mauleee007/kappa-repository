import { tvSlice } from './tv';

export { getTVChannels } from './actions';

export const { setCategories, setChannels } = tvSlice.actions;

export default tvSlice.reducer;
