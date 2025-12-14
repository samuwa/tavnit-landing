import { useEffect, useRef, useState } from 'react';

const fields = [
  'Order Number',
  'Order Date',
  'Supplier',
  'Item',
  'Quantity',
  'Price',
];

export default function PdfToTableAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [filledCells, setFilledCells] = useState<number[]>([]);

  useEffect(() => {
    // Animation will be ported from index.html once it's working
    // For now, this is a placeholder TSX structure
  }, []);

  return (
    <div ref={containerRef} className="animation-container">
      {/* PDF Document */}
      <div className="pdf-doc">
        {fields.map((field, i) => (
          <div key={i} className="pdf-field" id={`pdf-field-${i}`}>
            <div className="pdf-label" />
            <div className="pdf-value" />
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="arrow-section">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <div className="processing-text">AI Processing</div>
      </div>

      {/* Table */}
      <div className="table-doc">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, i) => (
              <tr key={i}>
                <td><div className="pdf-label" /></td>
                <td>
                  <div
                    className={`target-bar ${filledCells.includes(i) ? 'filled' : ''}`}
                    id={`target-${i}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="complete-banner">✓ Extraction complete</div>
      </div>
    </div>
  );
}
