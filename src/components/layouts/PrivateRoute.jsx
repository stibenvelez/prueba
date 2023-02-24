import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getNotificationsAction } from '../../redux/notifications/notifications.actions';
import LoadingView from '../LoadingView';
import Navbar from '../Navbar';
import Sidebar from '../ui/sidebar/SideBar';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { auth, loading, user } = useSelector(({ auth }) => auth);

  if (loading) {
    return <LoadingView />;
  }

  if (!auth && !loading) {
    navigate('/');
  }

  return (
    <div className='flex w-full h-screen overflow-hidden bg-gray-50'>
      <Sidebar />

      <div className='w-full h-full overflow-y-auto'>
        <Navbar />
        <div className='p-4'>{auth ? <Outlet /> : <Navigate to='/' />}</div>
      </div>
    </div>
  );
};

export default PrivateRoute;
