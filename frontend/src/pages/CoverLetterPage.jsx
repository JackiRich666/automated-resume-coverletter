import { useState, useEffect } from 'react';
import CoverLetterForm from '../components/CoverLetter/CoverLetterForm';
import CoverLetterPreview from '../components/CoverLetter/CoverLetterPreview';
import CoverLetterList from '../components/CoverLetter/CoverLetterList';
import CoverLetterViewer from '../components/CoverLetter/CoverLetterViewer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { generateCoverLetter, fetchCoverLetters, deleteCoverLetter } from '../api/coverLetterAPI';

function CoverLetterPage() {
  const [coverLetters, setCoverLetters] = useState([]);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [viewingLetter, setViewingLetter] = useState(null);

  const loadLetters = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCoverLetters();
      setCoverLetters(data);
    } catch (err) {
      setError('Не удалось загрузить письма');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLetters();
  }, []);

  const handleGenerate = async (formData) => {
    setGenerating(true);
    setError('');
    try {
      const newLetter = await generateCoverLetter(formData);
      setCurrentLetter(newLetter);
      await loadLetters();
    } catch (err) {
      setError('Ошибка генерации письма');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      setCoverLetters(coverLetters.filter(l => l.id !== id));
      if (currentLetter && currentLetter.id === id) {
        setCurrentLetter(null);
      }
    } catch (err) {
      setError('Ошибка удаления письма');
    }
  };

  const handleView = (letter) => {
    setViewingLetter(letter);
  };

  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Сопроводительные письма</h1>
        <ErrorMessage message={error} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3>Генерация письма</h3>
            <CoverLetterForm onSubmit={handleGenerate} loading={generating} />
            {currentLetter && (
              <div style={{ marginTop: '20px' }}>
                <h4>Сгенерированное письмо</h4>
                <CoverLetterPreview coverLetter={currentLetter} />
              </div>
            )}
          </div>
          <div>
            <h3>Сохранённые письма</h3>
            {loading ? <LoadingSpinner /> : (
              <CoverLetterList
                coverLetters={coverLetters}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}
          </div>
        </div>
        {viewingLetter && (
          <CoverLetterViewer letter={viewingLetter} onClose={() => setViewingLetter(null)} />
        )}
      </div>
    </div>
  );
}

export default CoverLetterPage;