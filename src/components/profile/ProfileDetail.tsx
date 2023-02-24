import { useQuery } from 'react-query';
import { GET_ACCOUNT } from '../../services/account.services';
import Card from '../../shared/Card';

const ProfileDetail = () => {
  const { data: account } = useQuery(['account'], GET_ACCOUNT, {
    suspense: true,
  });
  return (
    <div className='space-y-4'>
      <Card>
        <div className='flex text-gray-700'>
          <div className=''>
            <img className='rounded-md w-36 h-36' src={'/img/app/productDefault.png'} alt='avatar' />
          </div>
          <div className='grid text-sm md:grid-cols-2 '>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Primer Nombre</div>
              <div className='px-4 py-2'>{account.firstName}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Apellido</div>
              <div className='px-4 py-2'>{account.lastName}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Email</div>
              <div className='px-4 py-2'>
                <a className='text-blue-800' href='mailto:jane@example.com'>
                  {account.email}
                </a>
              </div>
              <div className='px-4 py-2'></div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Rol</div>
              <div className='px-4 py-2'>{account.role.role}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDetail;
