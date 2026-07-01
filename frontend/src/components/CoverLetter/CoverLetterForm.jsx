import { useState, useEffect } from 'react';
import { fetchResumes } from '../../api/resumeAPI';
import { fetchTemplates } from '../../api/templateAPI';

function CoverLetterForm({ onSubmit, loading }) {
  const [resumes, setResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    resumeId: '',
    jobDescription: '',
    additionalRequirements: '',
    templateId: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resumesData, templatesData] = await Promise.all([
          fetchResumes(),
          fetchTemplates()
        ]);
        setResumes(resumesData);
        const letterTemplates = templatesData.filter(t => t.type === 'cover_letter');
        setTemplates(letterTemplates);
        if (resumesData.length > 0) {
          setFormData(prev => ({ ...prev, resumeId: resumesData[0].id }));
        }
        if (letterTemplates.length > 0) {
          setFormData(prev => ({ ...prev, templateId: letterTemplates[0].id }));
        }
      } catch (err) {
        setError('Не удалось загрузить данные');
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resumeId) {
      setError('Выберите резюме');
      return;
    }
    if (!formData.jobDescription.trim()) {
      setError('Введите описание вакансии');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {error && <div className="error-box">{error}</div>}
      <div className="form-group">
        <label>Выберите резюме</label>
        <select name="resumeId" value={formData.resumeId} onChange={handleChange} required>
          {resumes.map(resume => <option key={resume.id} value={resume.id}>{resume.title}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Шаблон письма</label>
        <select name="templateId" value={formData.templateId} onChange={handleChange}>
          {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Описание вакансии</label>
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="6" required placeholder="Вставьте описание вакансии..." />
      </div>
      <div className="form-group">
        <label>Дополнительные требования (опционально)</label>
        <textarea name="additionalRequirements" value={formData.additionalRequirements} onChange={handleChange} rows="3" placeholder="Любые дополнительные пожелания..." />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Генерация...' : 'Сгенерировать письмо'}
      </button>
    </form>
  );
}

export default CoverLetterForm;