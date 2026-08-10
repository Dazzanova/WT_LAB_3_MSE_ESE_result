export function calculateSubjectMarks(mse, ese) {
  const mseContribution = (mse / 30) * 30
  const eseContribution = (ese / 70) * 70
  const finalMarks = mseContribution + eseContribution

  return {
    mseContribution,
    eseContribution,
    finalMarks: Number(finalMarks.toFixed(2)),
  }
}

export function getGrade(finalMarks) {
  if (finalMarks >= 90 && finalMarks <= 100) {
    return 'O'
  }

  if (finalMarks >= 80 && finalMarks <= 89) {
    return 'A+'
  }

  if (finalMarks >= 70 && finalMarks <= 79) {
    return 'A'
  }

  if (finalMarks >= 60 && finalMarks <= 69) {
    return 'B+'
  }

  if (finalMarks >= 50 && finalMarks <= 59) {
    return 'B'
  }

  if (finalMarks >= 40 && finalMarks <= 49) {
    return 'C'
  }

  return 'F'
}

export function calculateSemesterResult(student, subjects) {
  const subjectResults = subjects.map((subject) => {
    const mse = Number(subject.mse)
    const ese = Number(subject.ese)
    const calculation = calculateSubjectMarks(mse, ese)

    const finalMarks = calculation.finalMarks
    const grade = getGrade(finalMarks)
    const status = finalMarks >= 40 ? 'PASS' : 'FAIL'

    return {
      subjectName: subject.name.trim(),
      mse,
      ese,
      finalMarks,
      grade,
      status,
      mseContribution: calculation.mseContribution,
      eseContribution: calculation.eseContribution,
    }
  })

  const totalMarks = subjectResults.reduce((sum, item) => sum + item.finalMarks, 0)
  const percentage = (totalMarks / 400) * 100
  const failedSubjects = subjectResults
    .filter((item) => item.finalMarks < 40)
    .map((item) => item.subjectName)

  const overallStatus = failedSubjects.length === 0 ? 'PASS' : 'FAIL'

  return {
    studentName: student.studentName,
    motherName: student.motherName,
    prn: student.prn,
    subjects: subjectResults,
    totalMarks,
    percentage,
    overallStatus,
    failedSubjects,
  }
}
