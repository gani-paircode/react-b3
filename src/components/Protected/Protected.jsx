import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';

export const Protected = (props) => {
    const admin = useAppStore(state => state.data.admin)
    const isLoggedIn = admin && admin.data;
    const pathname = window.location.pathname;
    console.log('path name ', pathname);
    return isLoggedIn ? props.children : <Navigate to="/login" replace={true} />
}
