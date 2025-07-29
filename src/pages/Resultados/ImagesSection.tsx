interface Mesa {
  number: number;
  code: string;
  status: 'unprocessed' | 'processed' | 'dispute';
  photoCount?: number; // Number of photos of the electoral sheet
}

const ImagesSection = () => {
  // Sample data - you can replace this with your actual data source
  const images: Mesa[] = [
    { number: 1, code: 'M001', status: 'processed', photoCount: 3 },
    { number: 2, code: 'M002', status: 'unprocessed' },
    { number: 3, code: 'M003', status: 'dispute', photoCount: 2 },
    { number: 4, code: 'M004', status: 'unprocessed' },
    { number: 5, code: 'M005', status: 'processed', photoCount: 4 },
    { number: 6, code: 'M006', status: 'unprocessed' },
    { number: 7, code: 'M007', status: 'dispute', photoCount: 1 },
    { number: 8, code: 'M008', status: 'unprocessed' },
  ];

  const getCardStyle = (status: Mesa['status']) => {
    const baseStyle = {
      width: '100%',
      maxWidth: '280px',
      minWidth: '220px',
      height: '180px',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #e5e7eb',
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
      overflow: 'hidden',
    };

    if (status === 'unprocessed') {
      return {
        ...baseStyle,
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '100%',
        }}
      >
        {images.map((image) => (
          <div
            key={image.number}
            style={getCardStyle(image.status)}
            onClick={() => handleCardClick(image)}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: '1', minHeight: '0' }}>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    lineHeight: '1.2',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mesa {image.number}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    opacity: 0.6,
                    marginBottom: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {image.code}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flexShrink: 0,
                }}
              >
                {image.photoCount !== undefined && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ fontSize: '12px', flexShrink: 0 }}>📸</span>
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {image.photoCount} foto{image.photoCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    overflow: 'hidden',
                  }}
                >
                  <div style={getStatusIndicatorStyle(image.status)}></div>
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {getStatusText(image.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;
