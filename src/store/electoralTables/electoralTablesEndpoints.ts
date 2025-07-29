import { apiSlice } from '../apiSlice';
import { ElectoralTablesType } from '../../types';

export const electoralTablesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getElectoralTablesByElectoralLocationId: builder.query<
      ElectoralTablesType[],
      string
    >({
      query: (electoralLocationId) => ({
        url: '/geographic/electoral-tables/by-location/' + electoralLocationId,
      }),
      keepUnusedDataFor: 300,
      providesTags: (_result, _error, electoralLocationId) => [
        { type: 'ElectoralLocations' as const, id: electoralLocationId },
      ],
    }),
    getElectoralTable: builder.query<ElectoralTablesType, string>({
      query: (id) => `/geographic/electoral-tables/${id}`,
      keepUnusedDataFor: 60,
      providesTags: (_result, _error, id) => [
        { type: 'ElectoralTables' as const, id },
      ],
    }),
  }),
});

export const {
  useGetElectoralTablesByElectoralLocationIdQuery,
  useLazyGetElectoralTablesByElectoralLocationIdQuery,
  useGetElectoralTableQuery,
  useLazyGetElectoralTableQuery,
} = electoralTablesApiSlice;
