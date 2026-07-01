import { useState, useEffect } from 'react';
import ResumeList from '../components/Resume/ResumeList';
import ResumeForm from '../components/Resume/ResumeForm';
import ResumeViewer from '../components/Resume/ResumeViewer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchResumes, createResume, updateResume, deleteResume, generateResume } from '../api/resumeAPI';

function ResumePage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingResume, setEditingResume] = useState(null);
  const [viewingResume, setViewingResume] = useState(null);

  const loadResumes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchResumes();
      setResumes(data);
    } catch (err) {
      setError('Не удалось загрузить резюме');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleCreate = async (resumeData) => {
    try {
      const newResume = await createResume(resumeData);
      setResumes([...resumes, newResume]);
    } catch (err) {
      setError('Ошибка создания резюме');
    }
  };

  const handleUpdate = async (id, resumeData) => {
    try {
      const updated = await updateResume(id, resumeData);
      setResumes(resumes.map(r => r.id === id ? updated : r));
      setEditingResume(null);
    } catch (err) {
      setError('Ошибка обновления резюме');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes(resumes.filter(r => r.id !== id));
    } catch (err) {
      setError('Ошибка удаления резюме');
    }
  };

  const handleEdit = (resume) => {
    setEditingResume(resume);
  };

  const handleCancelEdit = () => {
    setEditingResume(null);
  };

  const handleView = (resume) => {
    setViewingResume(resume);
  };

  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Управление резюме</h1>
        <ErrorMessage message={error} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          <div>
            <h3>{editingResume ? 'Редактировать резюме' : 'Создать новое резюме'}</h3>
            <ResumeForm
              initialData={editingResume}
              onSubmit={editingResume ? handleUpdate : handleCreate}
              onCancel={editingResume ? handleCancelEdit : undefined}
              onGenerate={generateResume}
            />
          </div>
          <div>
            <h3>Список резюме</h3>
            {loading ? <LoadingSpinner /> : (
              <ResumeList
                resumes={resumes}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}
          </div>
        </div>
        {viewingResume && (
          <ResumeViewer resume={viewingResume} onClose={() => setViewingResume(null)} />
        )}
      </div>
    </div>
  );
}

export default ResumePage;