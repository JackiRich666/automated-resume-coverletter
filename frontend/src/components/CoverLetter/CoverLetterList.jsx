function CoverLetterList({ coverLetters, onDelete, onView }) {
  if (coverLetters.length === 0) {
    return <p style={{ color: '#4a5568' }}>Нет сохранённых писем.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {coverLetters.map((letter) => (
        <div key={letter.id} className="list-item" onClick={() => onView && onView(letter)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#4a5568' }}>Резюме ID: {letter.resume_id}</p>
              <p style={{ fontSize: '12px', color: '#718096' }}>Создано: {new Date(letter.created_at).toLocaleString()}</p>
              <p style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                {letter.generated_text ? letter.generated_text.substring(0, 100) + '...' : '—'}
              </p>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <button className="btn btn-danger" onClick={() => onDelete(letter.id)}>Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoverLetterList;