import { getCsvUrl } from "../api/client";

function formatTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  );
}

export default function FinishScreen({ subjectId }) {
  const ts = formatTimestamp();
  return (
    <div className="screen finish-screen">
      <h1 className="finish-title">実験は終了しました</h1>
      <p className="finish-message">ご参加ありがとうございました。</p>
      <a
        className="btn-primary btn-download"
        href={getCsvUrl(subjectId)}
        download={`Exp_result_row_${subjectId}_${ts}.csv`}
      >
        結果をCSVでダウンロード
      </a>
    </div>
  );
}
