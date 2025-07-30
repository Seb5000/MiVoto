import React, { useState, FormEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface BaseField {
  key: string;
  label: string;
  placeholder?: string;
}

interface InputField extends BaseField {
  type: 'input';
}

interface SelectField extends BaseField {
  type: 'select';
  options: SelectOption[];
}

type SearchField = InputField | SelectField;

interface SearchFormProps {
  onSearch: (values: Record<string, string>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(formValues);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFormValues({});
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          id="search"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('search', e.target.value)
          }
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
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
