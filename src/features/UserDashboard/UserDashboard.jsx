import React, { useState, useRef } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Пожалуйста, выберите файл для загрузки');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Отправка файла на сервер...');

    setTimeout(() => {
      setUploadStatus('Файл успешно загружен! Данные отправлены на обработку.');
      setSelectedFile(null);
      fileInputRef.current.value = '';
      setIsUploading(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const csvContent = [
      'airport_name,iata_code,city,country,total_flights,delayed_flights,canceled_flights,average_delay_minutes',
      'Шереметьево,SVO,Москва,Россия,1000,150,20,45',
      'Домодедово,DME,Москва,Россия,800,120,15,30',
      'Пулково,LED,Санкт-Петербург,Россия,600,80,10,25'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'airport_data_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            Загрузка данных аэропортов
          </h1>
          <p className="dashboard-subtitle">
            Загрузите файл с данными об аэропортах для расчета рейтинга пунктуальности
          </p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="upload-section">
          <div className="upload-card">
            <h2>Загрузите файл с данными</h2>
            <p className="upload-description">
              Поддерживаемые форматы: CSV, Excel (XLSX, XLS)
            </p>
            <div className="file-drop-area">
              <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-label">
                <div className="file-label-content">
                  <span className="file-text">
                    {selectedFile ? selectedFile.name : 'Выберите файл или перетащите его сюда'}
                  </span>
                  <span className="file-browse">Обзор</span>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="file-info">
                <div className="file-info-row">
                  <span className="file-info-label">Файл:</span>
                  <span className="file-info-value">{selectedFile.name}</span>
                </div>
                <div className="file-info-row">
                  <span className="file-info-label">Размер:</span>
                  <span className="file-info-value">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
                <div className="file-info-row">
                  <span className="file-info-label">Тип:</span>
                  <span className="file-info-value">{selectedFile.type || 'Не определен'}</span>
                </div>
              </div>
            )}
            <div className="upload-actions">
              {selectedFile ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Загрузка...' : 'Загрузить на сервер'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleReset}
                    disabled={isUploading}
                  >
                    Отмена
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={downloadTemplate}
                >
                  Скачать шаблон
                </button>
              )}
            </div>

            {uploadStatus && (
              <div>
                {uploadStatus}
              </div>
            )}
          </div>

          <div className="format-help-section">
            <div className="format-help-header">
              <h3>Требования к формату файла</h3>
            </div>
            
              <div className="format-help-content">
                <div className="format-requirements">
                  <h4>Обязательные столбцы:</h4>
                  <ul className="columns-list">
                    <li>
                      <span className="column-name">airport_name</span>
                      <span className="column-desc">Название аэропорта</span>
                    </li>
                    <li>
                      <span className="column-name">iata_code</span>
                      <span className="column-desc">IATA код (3 буквы)</span>
                    </li>
                    <li>
                      <span className="column-name">total_flights</span>
                      <span className="column-desc">Общее количество рейсов</span>
                    </li>
                    <li>
                      <span className="column-name">delayed_flights</span>
                      <span className="column-desc">Количество задержанных рейсов</span>
                    </li>
                    <li>
                      <span className="column-name">canceled_flights</span>
                      <span className="column-desc">Количество отмененных рейсов</span>
                    </li>
                  </ul>

                  <h4>Опциональные столбцы:</h4>
                  <ul className="columns-list">
                    <li>
                      <span className="column-name">city</span>
                      <span className="column-desc">Город</span>
                    </li>
                    <li>
                      <span className="column-name">country</span>
                      <span className="column-desc">Страна</span>
                    </li>
                    <li>
                      <span className="column-name">average_delay_minutes</span>
                      <span className="column-desc">Средняя задержка в минутах</span>
                    </li>
                    <li>
                      <span className="column-name">date</span>
                      <span className="column-desc">Дата сбора данных (YYYY-MM-DD)</span>
                    </li>
                  </ul>

                  <h4>Пример данных в CSV:</h4>
                  <div className="csv-example">
                    <pre>
{`airport_name,iata_code,city,country,total_flights,delayed_flights,canceled_flights,average_delay_minutes
Шереметьево,SVO,Москва,Россия,1000,150,20,45
Домодедово,DME,Москва,Россия,800,120,15,30
Пулково,LED,Санкт-Петербург,Россия,600,80,10,25`}
                    </pre>
                  </div>

                  <div className="format-tips">
                    <h4>Правила:</h4>
                    <ul>
                      <li>Используйте кодировку UTF-8 для CSV файлов</li>
                      <li>Заголовки столбцов должны быть в первой строке</li>
                      <li>Разделитель в CSV файлах - запятая (,)</li>
                      <li>Пустые значения оставляйте пустыми</li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="processing-status">
          <h3>История загрузок</h3>
          <div className="status-placeholder">
            <p>Здесь будет отображаться статус обработки ваших файлов</p>
            <p>После загрузки файла сервер начнет расчет рейтингов пунктуальности</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;