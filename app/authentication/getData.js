import { setUserAuthenticated } from '../../store/actions';
import RNSInfo from 'react-native-sensitive-info';

const getData = async (dispatch, history) => {
    try {
        const token = await RNSInfo.getItem('token', {});
        if (token) {
            dispatch(setUserAuthenticated(true));
        } else {
            dispatch(setUserAuthenticated(false));
        };
    } catch (err) { if (console) console.error(err) };
};

export default getData;