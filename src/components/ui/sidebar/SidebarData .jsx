import { CashIcon, CubeIcon, CurrencyDollarIcon, ViewGridAddIcon } from "@heroicons/react/outline";

export const SidebarData = [
  {
    title: 'Ingresos',
    path: '#',
    icon: <CurrencyDollarIcon className='w-5 h-5' />,
    iconClosed: null,
    iconOpened: null,
    permisions: ['admin', 'superadmin', 'manager', 'visitante'],
    subNav: [
      {
        title: 'Nueva venta',
        path: 'sales/new-sale',
        icon: null,
        cName: 'sub-nav',
      },
      {
        title: 'Lista de Ventas',
        path: 'sales',
        icon: null,
        cName: 'sub-nav',
      },
      {
        title: 'Detalle de ventas',
        path: 'sales/SalesDetailsPage',
        icon: null,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Egresos',
    path: '#',
    icon: <CashIcon className='w-5 h-5' />,
    iconClosed: null,
    iconOpened: null,
    permisions: ['admin', 'superadmin', 'manager', 'visitante'],
    subNav: [
      {
        title: 'Nueva egreso',
        path: 'egresses/new-egress',
        icon: null,
        cName: 'sub-nav',
      },
      {
        title: 'Lista de Egresos',
        path: 'egresses',
        icon: null,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Products',
    path: '#',
    icon: <CubeIcon className='w-5 h-5' />,
    iconClosed: null,
    iconOpened: null,
    permisions: ['admin', 'superadmin', 'manager', 'visitante'],
    subNav: [
      {
        title: 'Lista de Productos',
        path: 'products',
        icon: null,
        cName: 'sub-nav',
      },
      {
        title: 'Agregar un producto',
        path: 'products/new-product',
        icon: null,
        cName: 'sub-nav',
        permisions: ['admin', 'superadmin', 'manager'],
      },
    ],
  },

  // {
  //     title: "Reportes",
  //     path: "#",
  //     icon: <ClipboardListIcon className="w-5 h-5" />,
  //     iconClosed: null,
  //     iconOpened: null,

  //     subNav: [
  //         {
  //             title: "Reporte de ventas",
  //             path: "reports/sales-report",
  //             icon: null,
  //         },
  //         {
  //             title: "Agregar emploado",
  //             path: "#",
  //             icon: null,
  //         },
  //     ],
  // },
  {
    title: 'Config',
    path: '#',
    icon: <ViewGridAddIcon className='w-5 h-5' />,
    iconClosed: null,
    iconOpened: null,
    permisions: ['admin', 'superadmin', 'manager'],
    subNav: [
      {
        title: 'Empleados',
        path: 'employees',
        icon: null,
        permisions: ['admin', 'superadmin', 'manager'],
      },
      {
        title: 'Usuarios',
        path: 'users',
        icon: null,
        permisions: ['admin', 'superadmin', 'manager, visitante'],
      },
      {
        title: 'Marcas',
        path: 'brands',
        icon: null,
        permisions: ['admin', 'superadmin', 'manager', 'visitante'],
      },
      {
        title: 'Metodos de pago',
        path: 'metodos-de-pago',
        icon: null,
        permisions: ['admin', 'superadmin', 'manager', 'visitante'],
      },

    ],
  },
];
