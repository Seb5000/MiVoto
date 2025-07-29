interface Mesa {
  number: number;
  code: string;
  status: 'unprocessed' | 'processed' | 'dispute';
}

const TablesSection = () => {
  // Sample data - you can replace this with your actual data source
  const mesas: Mesa[] = [
    { number: 1, code: 'M001', status: 'processed' },
    { number: 2, code: 'M002', status: 'unprocessed' },
    { number: 3, code: 'M003', status: 'dispute' },
    { number: 4, code: 'M004', status: 'unprocessed' },
    { number: 5, code: 'M005', status: 'processed' },
    { number: 6, code: 'M006', status: 'unprocessed' },
    { number: 7, code: 'M007', status: 'dispute' },
    { number: 8, code: 'M008', status: 'unprocessed' },
  ];

  const getCardStyle = (status: Mesa['status']) => {
    const baseStyle = {
      width: '180px',
      height: '120px',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      textAlign: 'left' as const,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff',
      color: '#374151',
      position: 'relative' as const,
    };

    if (status === 'unprocessed') {
      return {
        ...baseStyle,
        cursor: 'not-allowed',
        opacity: 0.5,
        backgroundColor: '#f9fafb',
      };
    }

    return baseStyle;
  };

  const getStatusIndicatorStyle = (status: Mesa['status']) => {
    const baseStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '8px',
    };

    switch (status) {
      case 'processed':
        return {
          ...baseStyle,
          backgroundColor: '#22c55e',
        };
      case 'dispute':
        return {
          ...baseStyle,
          backgroundColor: '#ef4444',
        };
      case 'unprocessed':
      default:
        return {
          ...baseStyle,
          backgroundColor: '#6b7280',
        };
    }
  };

  const getStatusText = (status: Mesa['status']) => {
    switch (status) {
      case 'processed':
        return 'Procesada';
      case 'dispute':
        return 'En Disputa';
      case 'unprocessed':
      default:
        return 'Sin Procesar';
    }
  };

  const handleCardClick = (mesa: Mesa) => {
    if (mesa.status === 'unprocessed') {
      return; // Do nothing for unprocessed mesas
    }
    // Add your click handler logic here
    console.log(`Clicked on mesa ${mesa.number} - ${mesa.code}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {mesas.map((mesa) => (
          <div
            key={mesa.number}
            style={getCardStyle(mesa.status)}
            onClick={() => handleCardClick(mesa)}
            onMouseEnter={(e) => {
              if (mesa.status !== 'unprocessed') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (mesa.status !== 'unprocessed') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}
                >
                  Mesa {mesa.number}
                </div>
                <div style={{ fontSize: '13px', opacity: 0.6 }}>
                  {mesa.code}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginTop: '12px',
                }}
              >
                <div style={getStatusIndicatorStyle(mesa.status)}></div>
                {getStatusText(mesa.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesSection;
