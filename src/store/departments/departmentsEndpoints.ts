import { apiSlice } from '../apiSlice';
import { PaginatedResponse, DepartmentType } from '../../types';
import { setDepartments } from './departmentsSlice';

interface QueryDepartmentsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: Record<string, any>;
  search?: string;
  active?: boolean;
}

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<
      PaginatedResponse<DepartmentType>,
      QueryDepartmentsParams
    >({
      query: (params) => ({
        url: '/geographic/departments',
        params,
      }),
      keepUnusedDataFor: 300,
      providesTags: () => [{ type: 'Departments' as const, id: 'LIST' }],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data: departments },
          } = await queryFulfilled;
          console.log('Fetched departments:', departments);
          dispatch(setDepartments(departments));
        } catch (error) {
          console.error('Failed to fetch departments:', error);
        }
      },
    }),
    getDepartment: builder.query<DepartmentType, string>({
      query: (id) => `/geographic/departments/${id}`,
      keepUnusedDataFor: 60,
      providesTags: (_result, _error, id) => [
        { type: 'Departments' as const, id },
      ],
    }),
    createDepartment: builder.mutation<
      DepartmentType,
      Omit<DepartmentType, '_id'>
    >({
      query: (item) => ({
        url: '/geographic/departments',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Departments'],
    }),
    updateDepartment: builder.mutation<
      DepartmentType,
      { id: string; item: Partial<DepartmentType> }
    >({
      query: ({ id, item }) => ({
        url: `/geographic/departments/${id}`,
        method: 'PATCH',
        body: item,
      }),
      invalidatesTags: ['Departments'],
    }),
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/geographic/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Departments'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetDepartmentQuery,
  useLazyGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApiSlice;
