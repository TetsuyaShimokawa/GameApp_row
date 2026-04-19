export default function ChoiceButtons({ numRows, selected, onChange }) {
  return (
    <div className="choice-buttons">
      <span className="choice-label">Strategies :</span>
      <div className="radio-group">
        {Array.from({ length: numRows }, (_, r) => (
          <label key={r} className="radio-option">
            <input
              type="radio"
              name="strategy"
              value={r + 1}
              checked={selected === r + 1}
              onChange={() => onChange(r + 1)}
            />
            選択肢 {r + 1}
          </label>
        ))}
      </div>
    </div>
  );
}
