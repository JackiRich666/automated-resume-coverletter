function AnalysisResult({ result }) {
  if (!result) {
    return <p style={{ color: '#4a5568' }}>Результаты анализа появятся здесь</p>;
  }

  return (
    <div className="card">
      <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '8px', marginBottom: '16px' }}>
        Результаты анализа
      </h3>
      {result.suggestions && result.suggestions.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {result.suggestions.map((suggestion, index) => (
            <li key={index} style={{ padding: '12px', marginBottom: '8px', background: '#f7fafc', borderRadius: '4px', borderLeft: '4px solid var(--primary)' }}>
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#4a5568' }}>{result.message || 'Анализ завершён, но рекомендации отсутствуют'}</p>
      )}
      {result.verification && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#e6fffa', borderRadius: '4px' }}>
          <strong>Верификация:</strong> {result.verification}
        </div>
      )}
    </div>
  );
}

export default AnalysisResult;