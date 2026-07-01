import { useState, useEffect } from 'react';
import { fetchTemplates } from '../../api/templateAPI';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

function TemplateSelector({ onSelect, selectedId }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Не удалось загрузить шаблоны');
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {templates.length === 0 ? (
        <p style={{ color: '#4a5568' }}>Нет доступных шаблонов</p>
      ) : (
        templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            style={{
              padding: '12px 16px',
              background: selectedId === template.id ? '#e2e8f0' : 'white',
              border: selectedId === template.id ? '2px solid var(--primary)' : '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontWeight: '500' }}>{template.name}</div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Тип: {template.type}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default TemplateSelector;