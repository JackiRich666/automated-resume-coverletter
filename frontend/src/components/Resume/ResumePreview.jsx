function ResumePreview({ resume }) {
  if (!resume) {
    return <p style={{ color: '#4a5568' }}>Выберите резюме для просмотра</p>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ borderBottom: '2px solid #2d3748', paddingBottom: '8px', marginBottom: '16px' }}>
        {resume.title || 'Без названия'}
      </h2>
      <div style={{ marginBottom: '12px' }}>
        <strong>ФИО:</strong> {resume.fullName || '—'}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>Email:</strong> {resume.email || '—'}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>Телефон:</strong> {resume.phone || '—'}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>Адрес:</strong> {resume.address || '—'}
      </div>
      {resume.summary && (
        <div style={{ marginBottom: '12px' }}>
          <strong>Краткое описание:</strong>
          <p style={{ marginTop: '4px' }}>{resume.summary}</p>
        </div>
      )}
      {resume.experience && (
        <div style={{ marginBottom: '12px' }}>
          <strong>Опыт работы:</strong>
          <p style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{resume.experience}</p>
        </div>
      )}
      {resume.education && (
        <div style={{ marginBottom: '12px' }}>
          <strong>Образование:</strong>
          <p style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{resume.education}</p>
        </div>
      )}
      {resume.skills && (
        <div>
          <strong>Навыки:</strong>
          <p style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{resume.skills}</p>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;