import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useLazyGetDepartmentsQuery } from '../store/departments/departmentsEndpoints';
import { DepartmentType } from '../types';
import AsyncSelect from 'react-select/async';

interface SearchFormProps {
  onSearch: (values: Record<string, string>) => void;
  department?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, department }) => {
  const [getDepartments] = useLazyGetDepartmentsQuery();

  const initialValues = {
    search: '',
    departmentId: '',
  };

  const handleSubmit = (values: { search: string; departmentId: string }) => {
    const searchValues: Record<string, string> = {};
    if (values.search) searchValues.search = values.search;
    if (values.departmentId) searchValues.departmentId = values.departmentId;

    onSearch(searchValues);
  };

  const handleClear = (resetForm: () => void) => {
    resetForm();
    onSearch({});
  };

  const loadDepartments = async (inputValue: string) => {
    try {
      const { data } = await getDepartments({
        search: inputValue,
        limit: 10,
      }).unwrap();

      return data.map((item: DepartmentType) => ({
        value: item._id,
        label: item.name,
      }));
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, resetForm }) => (
        <Form className="flex flex-wrap gap-4 items-end">
          {department && (
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="departmentId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Departamento
              </label>
              <AsyncSelect
                name="departmentId"
                loadOptions={loadDepartments}
                defaultOptions={true}
                placeholder="Buscar..."
                isClearable
                onChange={(selectedOption) => {
                  setFieldValue(
                    'departmentId',
                    selectedOption ? selectedOption.value : ''
                  );
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre
            </label>
            <Field
              type="text"
              id="search"
              name="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre..."
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => handleClear(resetForm)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
