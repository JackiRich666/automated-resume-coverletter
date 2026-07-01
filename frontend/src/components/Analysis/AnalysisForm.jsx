import { useState, useEffect } from 'react';
import { fetchResumes } from '../../api/resumeAPI';

function AnalysisForm({ onSubmit, loading }) {
  const [resumes, setResumes] = useState([]);
  const [formData, setFormData] = useState({
    resumeId: '',
    text: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await fetchResumes();
        setResumes(data);
      } catch (err) {
        setError('Не удалось загрузить список резюме');
      }
    };
    loadResumes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResumeSelect = (e) => {
    const resumeId = e.target.value;
    const selected = resumes.find(r => r.id === parseInt(resumeId));
    setFormData(prev => ({
      ...prev,
      resumeId: resumeId,
      text: selected ? JSON.stringify(selected, null, 2) : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      setError('Введите текст резюме или выберите сохранённое');
      return;
    }
    setError('');
    onSubmit({ text: formData.text });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {error && <div className="error-box">{error}</div>}
      <div className="form-group">
        <label>Выберите сохранённое резюме (опционально)</label>
        <select value={formData.resumeId} onChange={handleResumeSelect}>
          <option value="">-- Выберите --</option>
          {resumes.map(resume => <option key={resume.id} value={resume.id}>{resume.title}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Текст резюме для анализа</label>
        <textarea name="text" value={formData.text} onChange={handleChange} rows="10" required placeholder="Вставьте текст резюме или выберите из списка выше..." />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Анализ...' : 'Анализировать резюме'}
      </button>
    </form>
  );
}

export default AnalysisForm;