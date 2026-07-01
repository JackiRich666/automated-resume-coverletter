import { useState, useEffect } from 'react';
import { fetchTemplates } from '../../api/templateAPI';

function ResumeViewer({ resume, onClose }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        const resumeTemplates = data.filter(t => t.type === 'resume');
        setTemplates(resumeTemplates);
        if (resumeTemplates.length > 0) {
          setSelectedTemplateId(resumeTemplates[0].id);
        }
      } catch (e) {
        console.error('Не удалось загрузить шаблоны');
      }
    };
    loadTemplates();
  }, []);

  useEffect(() => {
    if (!resume || !selectedTemplateId) return;
    const template = templates.find(t => t.id === parseInt(selectedTemplateId));
    if (!template) return;

    let result = template.content;
    const placeholders = result.match(/\{\{([^}]+)\}\}/g) || [];
    placeholders.forEach((ph) => {
      const key = ph.replace(/\{\{|\}\}/g, '').trim();
      const value = resume[key] || '';
      result = result.replace(new RegExp(ph, 'g'), value);
    });
    setDisplayText(result);
  }, [resume, selectedTemplateId, templates]);

  if (!resume) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Просмотр резюме</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Шаблон отображения: </label>
          <select value={selectedTemplateId} onChange={(e) => setSelectedTemplateId(e.target.value)}>
            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <hr />
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', background: '#f7fafc', padding: '16px', borderRadius: '4px' }}>
          {displayText || 'Выберите шаблон'}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

export default ResumeViewer;