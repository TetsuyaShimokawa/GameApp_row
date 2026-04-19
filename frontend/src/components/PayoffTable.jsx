export default function PayoffTable({ payoff, numRows, numCols }) {
  return (
    <div className="payoff-wrapper">
      <table className="payoff-table">
        <thead>
          <tr>
            <th className="corner-cell"></th>
            {Array.from({ length: numCols }, (_, c) => (
              <th key={c} className="col-header">
                相手の選択肢 {c + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numRows }, (_, r) => (
            <tr key={r}>
              <td className="row-header">あなたの選択肢 {r + 1}</td>
              {Array.from({ length: numCols }, (_, c) => {
                const [mine, theirs] = payoff[r][c];
                return (
                  <td key={c} className="payoff-cell">
                    {mine}, {theirs}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
