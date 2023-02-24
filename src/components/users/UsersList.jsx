import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import SkeletonTable from '../../shared/SkeletonTable';
import { Table } from '../ui/Table';
import { GET_USERS } from '../../services/users.services';

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery(['users'], GET_USERS, {
    refetchOnWindowFocus: false,
    suspense: true,
  });

  if (isLoading) {
    return <SkeletonTable columns={5} rows={5} />;
  }

  if (isError) {
    return (
      <div>
        <p className='p-2 bg-red-50'>{error.response.data.message}</p>
      </div>
    );
  }

  return (
    <Table>
      <thead className='text-xs uppercase text-gray-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope='col' className='px-6 py-3'>
            User
          </th>
          <th scope='col' className='px-6 py-3'>
            Primer Nombre
          </th>
          <th scope='col' className='px-6 py-3'>
            Apellido
          </th>
          <th scope='col' className='px-6 py-3'>
            Roll
          </th>
          <th scope='col' className='px-6 py-3'>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, i) => (
            <tr
              key={i}
              className='bg-white border-b shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 '
            >
              <td className='px-6 py-2'>{user.user}</td>
              <td className='px-6 py-2'>{user.firstName}</td>
              <td className='px-6 py-2'>{user.lastName}</td>
              <td className='px-6 py-2'>{user.confirm}</td>
              <td className='px-6 py-2'>
                <div className='space-x-2'>
                  <Link to={`${user.idUser}   `}>Ver</Link>
                  <button
                    type='button'
                    className='px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700'
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UsersList;
