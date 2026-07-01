function CoverLetterPreview({ coverLetter }) {
  if (!coverLetter) {
    return <p style={{ color: '#4a5568' }}>Письмо ещё не сгенерировано</p>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '12px' }}>
        <strong>На основе резюме ID:</strong> {coverLetter.resume_id || '—'}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>Дата создания:</strong> {new Date(coverLetter.created_at).toLocaleString()}
      </div>
      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '16px' }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'inherit',
          fontSize: '16px',
          lineHeight: '1.6',
          margin: 0
        }}>
          {coverLetter.generated_text || 'Текст письма отсутствует'}
        </pre>
      </div>
    </div>
  );
}

export default CoverLetterPreview;