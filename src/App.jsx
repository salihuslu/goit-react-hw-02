import { useState, useEffect } from 'react';
import styles from './App.module.css';

import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';

function App() {
  // Yerel depolamadan başlangıç verisini alma
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  // Durum değişince localStorage'a yaz
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  // Geri bildirim güncelleme fonksiyonu
  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  // Geri bildirimleri sıfırlama
  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  // Toplam geri bildirim sayısı
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  // Yeni: good + neutral = pozitif sayılır
  const positiveVotes = feedback.good + feedback.neutral;
  const positivePercentage = totalFeedback
    ? Math.round((positiveVotes / totalFeedback) * 100)
    : 0;

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Sip Happens Café</h1>

      <Description />

      <Options
        updateFeedback={updateFeedback}
        onReset={resetFeedback}
        showReset={totalFeedback > 0}
      />

      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positive={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet. Be the first!" />
      )}
    </div>
  );
}

export default App;
