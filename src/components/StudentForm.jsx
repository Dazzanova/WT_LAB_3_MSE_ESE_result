import { validateName, validatePrn, validateMse, validateEse, validateSubjectName } from '../utils/validation'

function StudentForm({
  studentData,
  handleStudentChange,
  subjects,
  handleSubjectChange,
  validationErrors,
  onCalculate,
  onReset,
}) {
  return (
    <section className="form-section panel-card">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Academic Registration</span>
          <h2>Student Information</h2>
        </div>
        <div className="section-badge">Semester - 01</div>
      </div>

      <div className="student-form-grid">
        <div className="form-field-wrap">
          <label htmlFor="studentName">Student Name</label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            value={studentData.studentName}
            onChange={handleStudentChange}
            className={validationErrors.studentName ? 'input-error' : ''}
            aria-invalid={validationErrors.studentName ? 'true' : 'false'}
            aria-describedby="studentNameError"
          />
          {validationErrors.studentName && (
            <small id="studentNameError" className="error-text">{validationErrors.studentName}</small>
          )}
        </div>

        <div className="form-field-wrap">
          <label htmlFor="motherName">Mother's Name</label>
          <input
            id="motherName"
            name="motherName"
            type="text"
            value={studentData.motherName}
            onChange={handleStudentChange}
            className={validationErrors.motherName ? 'input-error' : ''}
            aria-invalid={validationErrors.motherName ? 'true' : 'false'}
            aria-describedby="motherNameError"
          />
          {validationErrors.motherName && (
            <small id="motherNameError" className="error-text">{validationErrors.motherName}</small>
          )}
        </div>

        <div className="form-field-wrap">
          <label htmlFor="prn">PRN Number</label>
          <input
            id="prn"
            name="prn"
            type="text"
            value={studentData.prn}
            onChange={handleStudentChange}
            inputMode="numeric"
            className={validationErrors.prn ? 'input-error' : ''}
            aria-invalid={validationErrors.prn ? 'true' : 'false'}
            aria-describedby="prnError"
          />
          {validationErrors.prn && (
            <small id="prnError" className="error-text">{validationErrors.prn}</small>
          )}
        </div>
      </div>

      <div className="subject-details mt-lg">
        <div className="section-heading compact-heading">
          <div>
            <span className="section-kicker">Subject Allocation</span>
            <h2>Subject Details</h2>
          </div>
        </div>

        <div className="table-wrapper subject-table-wrapper">
          <table className="result-table subject-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>MSE Marks</th>
                <th>ESE Marks</th>
                <th>Final Marks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject.id}>
                  <td>
                    <input
                      type="text"
                      className="subject-input"
                      value={subject.name}
                      onChange={(event) => handleSubjectChange(index, 'name', event.target.value)}
                      aria-label={`Subject ${index + 1} name`}
                    />
                    {validationErrors.subjects?.[index]?.name && (
                      <small className="error-text subject-error">{validationErrors.subjects[index].name}</small>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      className={validationErrors.subjects?.[index]?.mse ? 'input-error' : ''}
                      value={subject.mse}
                      onChange={(event) => handleSubjectChange(index, 'mse', event.target.value)}
                      aria-label={`MSE marks for ${subject.name || `Subject ${index + 1}`}`}
                    />
                    {validationErrors.subjects?.[index]?.mse && (
                      <small className="error-text subject-error">{validationErrors.subjects[index].mse}</small>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="70"
                      className={validationErrors.subjects?.[index]?.ese ? 'input-error' : ''}
                      value={subject.ese}
                      onChange={(event) => handleSubjectChange(index, 'ese', event.target.value)}
                      aria-label={`ESE marks for ${subject.name || `Subject ${index + 1}`}`}
                    />
                    {validationErrors.subjects?.[index]?.ese && (
                      <small className="error-text subject-error">{validationErrors.subjects[index].ese}</small>
                    )}
                  </td>
                  <td>
                    <span className="final-calculated">{subject.finalMarks ?? '--'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="button-row">
        <button className="btn btn-primary" type="button" onClick={onCalculate}>Calculate Result</button>
        <button className="btn btn-secondary" type="button" onClick={onReset}>Reset</button>
      </div>
    </section>
  )
}

export default StudentForm
