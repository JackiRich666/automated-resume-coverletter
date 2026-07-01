function ResumeList({ resumes, onEdit, onDelete, onView }) {
  if (resumes.length === 0) {
    return <p style={{ color: '#4a5568' }}>Нет сохранённых резюме.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {resumes.map((resume) => (
        <div key={resume.id} className="list-item" onClick={() => onView && onView(resume)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4>{resume.title}</h4>
              <p style={{ fontSize: '14px', color: '#4a5568' }}>{resume.fullName}</p>
              <p style={{ fontSize: '12px', color: '#718096' }}>Создано: {new Date(resume.created_at).toLocaleDateString()}</p>
            </div>
            <div className="actions" onClick={(e) => e.stopPropagation()}>
              <button className="edit" onClick={() => onEdit(resume)}>Редактировать</button>
              <button className="delete" onClick={() => onDelete(resume.id)}>Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResumeList;