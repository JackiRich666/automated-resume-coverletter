import { useState } from 'react';
import AnalysisForm from '../components/Analysis/AnalysisForm';
import AnalysisResult from '../components/Analysis/AnalysisResult';
import ErrorMessage from '../components/common/ErrorMessage';
import { analyzeResume } from '../api/analysisAPI';

function AnalysisPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (data) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await analyzeResume(data);
      setResult(response);
    } catch (err) {
      setError('Ошибка анализа резюме');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Анализ и советы по улучшению резюме</h1>
        <ErrorMessage message={error} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3>Введите резюме для анализа</h3>
            <AnalysisForm onSubmit={handleAnalyze} loading={loading} />
          </div>
          <div>
            <h3>Результат</h3>
            {loading ? <p>Загрузка...</p> : <AnalysisResult result={result} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;