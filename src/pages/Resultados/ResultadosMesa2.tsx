import { useState } from 'react';
import { Eye, FileText, Users } from 'lucide-react';
import BarChart from '../../components/BarChart';
import D3PieChart from '../../components/D3PieChart';
import ResultsTable from '../../components/ResultsTable';
import SearchBar from '../../components/SearchBar';
import {
  Check,
  X,
  Trophy,
  BarChart3,
  Vote,
  Table,
  PieChart,
} from 'lucide-react';
import LocationSection from './LocationSection';
import Graphs from './Graphs';
import ImagesSection from './ImagesSection';

const combinedData = [
  { name: 'Party A', value: 100, color: '#FF6384' },
  { name: 'Party B', value: 200, color: '#36A2EB' },
  { name: 'Party C', value: 150, color: '#FFCE56' },
  { name: 'Party D', value: 80, color: '#4BC0C0' },
  { name: 'Party E', value: 120, color: '#9966FF' },
  { name: 'Party F', value: 90, color: '#FF9F40' },
  { name: 'Party G', value: 60, color: '#FF6384' },
  { name: 'Party H', value: 110, color: '#36A2EB' },
];

const mesas: any[] = [
  { id: 123, person: 'JANE DRINKS', date: '13 June 2023' },
  { id: 24, person: 'TONY HUNGRY', date: '13 June 2023' },
  { id: 32, person: 'TONY HUNGRY', date: '13 June 2023' },
  { id: 15, person: 'JANE DRINKS', date: '13 June 2023' },
  { id: 44, person: 'JANE DRINKS', date: '13 June 2023' },
  { id: 23, person: 'TONY HUNGRY', date: '13 June 2023', hasNote: true },
  { id: 1255, person: 'JANE DRINKS', date: '13 June 2023' },
  { id: 78, person: 'MIKE SILVA', date: '13 June 2023' },
];

const menuOptions = [
  {
    id: 'resultados_presidenciales',
    name: 'Resultados presidenciales',
    icon: {
      component: Eye,
      color: 'text-purple-600',
      background: 'bg-purple-100',
    },
  },
  {
    id: 'resultados_diputados',
    name: 'Resultados diputados',
    icon: {
      component: Users,
      color: 'text-green-600',
      background: 'bg-green-100',
    },
  },
  {
    id: 'images',
    name: 'Imagenes',
    icon: {
      component: FileText,
      color: 'text-blue-600',
      background: 'bg-blue-100',
    },
  },
];

const ResultadosMesa2 = () => {
  const [activeTab, setActiveTab] = useState('bars');
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Resultados por Mesa
        </h1>
        <div className="bg-white rounded-xl shadow-lg py-6 px-6">
          <div className="flex items-center mb-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600">
              Mesa #25548
            </h1>
            <SearchBar className="shrink-1 ml-auto" />
          </div>
          <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              Ubicacion
            </h3>
            <LocationSection
              department="Cochabamba"
              province="Esteban Arze"
              municipality="Anzaldo"
              electoralLocation="U.E. Arturo Sarmiento de Quiriria"
              electoralSeat="Quiriria"
            />
          </div>
          <div className="w-full flex flex-wrap gap-4">
            <div className="bg-gray-50 rounded-lg shadow-sm p-4 basis-[200px] grow-1 shrink-0">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                Opciones
              </h3>

              <div className="flex flex-wrap gap-4">
                {menuOptions.map((option) => (
                  <div
                    key={option.name}
                    onClick={() => setSelectedOption(option)}
                    className={`bg-gray-50 rounded-lg p-4 border ${
                      selectedOption.id === option.id
                        ? 'border-gray-500 shadow-lg'
                        : 'border-gray-200 hover:shadow-md'
                    } transition-all duration-200 basis-[min(200px,100%)] grow-1`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-lg ${
                            selectedOption.id === option.id
                              ? 'font-semibold'
                              : ''
                          } text-gray-800`}
                        >
                          {option.name}
                        </p>
                      </div>
                      <div
                        className={`${option.icon.background} p-3 rounded-full`}
                      >
                        <option.icon.component
                          className={`w-4 h-4 ${option.icon.color}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Última actualización: {new Date().toLocaleDateString('es-ES')}
                </p>
              </div> */}
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden basis-[min(420px,100%)] grow-3 shrink-0">
              {/* <div className="border-b border-gray-300 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-600">
                  Visualización de Resultados{' '}
                </h2>
              </div> */}

              <div className=" px-0 md:px-6 py-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  {selectedOption.name}
                </h3>
                {selectedOption.id === 'resultados_presidenciales' && (
                  <Graphs data={combinedData} />
                )}
                {selectedOption.id === 'resultados_diputados' && (
                  <Graphs data={combinedData} />
                )}
                {selectedOption.id === 'images' && <ImagesSection />}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden mt-6">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold text-gray-800">
                Imagenes mas apoyadas
              </h2>
            </div>

            {/* Grid Content */}
            <div className="p-6">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                }}
              >
                {mesas.map((mesa) => (
                  <div key={mesa.id} className="relative min-w-[200px]">
                    {/* Card */}
                    <div className="bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                      {/* Background area instead of image */}
                      <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400"></div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 text-lg mb-3">
                          Imagen {mesa.id}
                        </h3>

                        {/* Footer Info */}
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="truncate mr-2">{mesa.person}</span>
                          <span className="whitespace-nowrap">{mesa.date}</span>
                        </div>
                      </div>

                      {/* Load Notes Overlay */}
                      {mesa.hasNote && (
                        <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs">
                          Load Notes
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosMesa2;
