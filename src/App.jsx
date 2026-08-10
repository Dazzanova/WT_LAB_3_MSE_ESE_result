import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import StudentForm from './components/StudentForm.jsx'
import ResultCard from './components/ResultCard.jsx'
import { SUBJECT_DEFAULTS } from './utils/validation.js'
import { calculateSemesterResult } from './utils/resultCalculator.js'
import { validateName, validatePrn, validateMse, validateEse, validateSubjectName } from './utils/validation.js'
import './App.css'

function App() {
  const buildInitialSubjects = () =>
    SUBJECT_DEFAULTS.map((subjectName, index) => ({
      id: index + 1,
      name: subjectName,
      mse: '',
      ese: '',
      finalMarks: '',
    }))

  const [studentData, setStudentData] = useState({
    studentName: '',
    motherName: '',
    prn: '',
  })

  const [subjects, setSubjects] = useState(buildInitialSubjects)
  const [validationErrors, setValidationErrors] = useState({
    studentName: '',
    motherName: '',
    prn: '',
    subjects: [
      { name: '', mse: '', ese: '' },
      { name: '', mse: '', ese: '' },
      { name: '', mse: '', ese: '' },
      { name: '', mse: '', ese: '' },
    ],
  })
  const [result, setResult] = useState(null)

  const handleStudentChange = (event) => {
    const { name, value } = event.target

    setStudentData((current) => ({
      ...current,
      [name]: value,
    }))

    setValidationErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const handleSubjectChange = (index, field, value) => {
    setSubjects((current) =>
      current.map((subject, subjectIndex) => {
        if (subjectIndex !== index) {
          return subject
        }

        return {
          ...subject,
          [field]: value,
        }
      }),
    )

    setValidationErrors((current) => {
      const nextErrors = { ...current }
      nextErrors.subjects = [...(current.subjects || [])]
      nextErrors.subjects[index] = {
        ...nextErrors.subjects[index],
        [field]: '',
      }
      return nextErrors
    })
  }

  const validateForm = () => {
    const errors = {
      studentName: '',
      motherName: '',
      prn: '',
      subjects: [],
    }

    const studentNameValidation = validateName(studentData.studentName, 'Student Name')
    const motherNameValidation = validateName(studentData.motherName, "Mother's Name")
    const prnValidation = validatePrn(studentData.prn)

    if (!studentNameValidation.isValid) {
      errors.studentName = studentNameValidation.message
    }

    if (!motherNameValidation.isValid) {
      errors.motherName = motherNameValidation.message
    }

    if (!prnValidation.isValid) {
      errors.prn = prnValidation.message
    }

    errors.subjects = subjects.map((subject) => {
      const nameValidation = validateSubjectName(subject.name)
      const mseValidation = validateMse(subject.mse)
      const eseValidation = validateEse(subject.ese)

      return {
        name: nameValidation.isValid ? '' : nameValidation.message,
        mse: mseValidation.isValid ? '' : mseValidation.message,
        ese: eseValidation.isValid ? '' : eseValidation.message,
      }
    })

    const hasSubjectErrors = errors.subjects.some((item) => item.name || item.mse || item.ese)

    return {
      isValid: !errors.studentName && !errors.motherName && !errors.prn && !hasSubjectErrors,
      errors,
    }
  }

  const handleCalculate = () => {
    const { isValid, errors } = validateForm()
    setValidationErrors(errors)

    if (!isValid) {
      return
    }

    const calculation = calculateSemesterResult(
      {
        studentName: studentData.studentName.trim(),
        motherName: studentData.motherName.trim(),
        prn: studentData.prn.trim(),
      },
      subjects.map((subject) => ({
        name: subject.name.trim(),
        mse: Number(subject.mse),
        ese: Number(subject.ese),
      })),
    )

    setResult(calculation)
  }

  const handleReset = () => {
    setStudentData({ studentName: '', motherName: '', prn: '' })
    setSubjects(buildInitialSubjects())
    setResult(null)
    setValidationErrors({
      studentName: '',
      motherName: '',
      prn: '',
      subjects: [
        { name: '', mse: '', ese: '' },
        { name: '', mse: '', ese: '' },
        { name: '', mse: '', ese: '' },
        { name: '', mse: '', ese: '' },
      ],
    })
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="content-layout">
          <StudentForm
            studentData={studentData}
            handleStudentChange={handleStudentChange}
            subjects={subjects}
            handleSubjectChange={handleSubjectChange}
            validationErrors={validationErrors}
            onCalculate={handleCalculate}
            onReset={handleReset}
          />

          {result && <ResultCard result={result} />}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
