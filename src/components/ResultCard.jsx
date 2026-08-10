function ResultCard({ result }) {
  if (!result) {
    return null
  }

  return (
    <section className="result-section panel-card">
      <div className="result-header">
        <div>
          <span className="section-kicker">Examination Outcome</span>
          <h2>Semester Result</h2>
        </div>
        <div className={`status-pill ${result.overallStatus.toLowerCase()}`}>{result.overallStatus}</div>
      </div>

      <div className="student-result-summary">
        <div className="summary-row">
          <span className="summary-label">Student Name:</span>
          <span>{result.studentName}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Mother's Name:</span>
          <span>{result.motherName}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">PRN Number:</span>
          <span>{result.prn}</span>
        </div>
      </div>

      <div className="table-wrapper result-table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>MSE / 30</th>
              <th>ESE / 70</th>
              <th>Final / 100</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((subject) => (
              <tr key={subject.subjectName}>
                <td>{subject.subjectName}</td>
                <td>{subject.mse}</td>
                <td>{subject.ese}</td>
                <td>{subject.finalMarks}</td>
                <td>{subject.grade}</td>
                <td><span className={`result-status ${subject.status.toLowerCase()}`}>{subject.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="result-stats">
        <div className="stat-row">
          <span>Total Marks:</span>
          <strong>{Math.round(result.totalMarks)} / 400</strong>
        </div>
        <div className="stat-row">
          <span>Percentage:</span>
          <strong>{result.percentage.toFixed(2)}%</strong>
        </div>
        <div className="stat-row">
          <span>Overall Result:</span>
          <strong className={result.overallStatus.toLowerCase()}>{result.overallStatus}</strong>
        </div>
      </div>

      {result.failedSubjects.length > 0 && (
        <div className="failure-box">
          <span className="failure-title">Failed Subjects:</span>
          <ul>
            {result.failedSubjects.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="button-row result-actions">
        <button className="btn btn-primary" type="button" onClick={() => window.print()}>Print Result</button>
      </div>
    </section>
  )
}

export default ResultCard
