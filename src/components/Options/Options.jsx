import styles from './Options.module.css';

const Options = ({ updateFeedback, onReset, showReset }) => {
    return (
        <div className={styles.options}>
            <button onClick={() => updateFeedback('good')}>Good</button>
            <button onClick={() => updateFeedback('neutral')}>Neutral</button>
            <button onClick={() => updateFeedback('bad')}>Bad</button>
            {showReset && (
                <button onClick={onReset} className={styles.resetButton}>
                    Reset
                </button>
            )}
        </div>
    );
};

export default Options;
