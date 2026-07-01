import { useState, useEffect } from 'react';

function ResumeForm({ initialData, onSubmit, onCancel, onGenerate }) {
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  });
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        summary: initialData.summary || '',
        experience: initialData.experience || '',
        education: initialData.education || '',
        skills: initialData.skills || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!onGenerate) return;
    setGenerating(true);
    try {
      const generated = await onGenerate(formData);
      setFormData(generated);
    } catch (error) {
      alert('Ошибка генерации резюме. Проверьте подключение к Ollama.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onSubmit(initialData.id, formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label>Название резюме</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>ФИО</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Адрес</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Краткое описание</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" />
      </div>
      <div className="form-group">
        <label>Опыт работы</label>
        <textarea name="experience" value={formData.experience} onChange={handleChange} rows="4" />
      </div>
      <div className="form-group">
        <label>Образование</label>
        <textarea name="education" value={formData.education} onChange={handleChange} rows="3" />
      </div>
      <div className="form-group">
        <label>Навыки</label>
        <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {onGenerate && (
          <button type="button" className="btn btn-success" onClick={handleGenerate} disabled={generating}>
            {generating ? 'Генерация...' : 'Сгенерировать'}
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Обновить' : 'Сохранить'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>Отмена</button>
        )}
      </div>
    </form>
  );
}

export default ResumeForm;