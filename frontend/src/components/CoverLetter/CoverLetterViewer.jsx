function CoverLetterViewer({ letter, onClose }) {
  if (!letter) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Сопроводительное письмо</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <hr />
        <div><strong>Резюме ID:</strong> {letter.resume_id || '—'}</div>
        <div><strong>Описание вакансии:</strong><p style={{whiteSpace:'pre-wrap'}}>{letter.job_description || '—'}</p></div>
        {letter.additional_requirements && (
          <div><strong>Дополнительные требования:</strong><p style={{whiteSpace:'pre-wrap'}}>{letter.additional_requirements}</p></div>
        )}
        <div style={{ marginTop: '16px', borderTop: '2px solid #e2e8f0', paddingTop: '16px' }}>
          <strong>Текст письма:</strong>
          <div style={{ background: '#f7fafc', padding: '16px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap' }}>
            {letter.generated_text || '—'}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#718096', marginTop: '12px' }}>
          Создано: {new Date(letter.created_at).toLocaleString()}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterViewer;