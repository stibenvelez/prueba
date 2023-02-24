import { useQuery } from 'react-query';
import { GET_EMPLOYEES } from '../services/employees.services';

const useEmployees = () => {
  const {
    data: employees,
    isLoading: isLoadingEmployees,
    ...rest
  } = useQuery(['employees'], GET_EMPLOYEES,{
    refetchOnWindowFocus: false,
    suspense: true,
  });

  const employeesOptions = employees?.map((employee) => ({
    label: `${employee.name} ${employee.lastName}`,
    value: employee.idEmploye,
  }));
  return { employees, isLoadingEmployees, employeesOptions, ...rest };
};

export default useEmployees;
