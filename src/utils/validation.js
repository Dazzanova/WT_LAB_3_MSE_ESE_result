export const SUBJECT_DEFAULTS = [
  'Data Structures',
  'Design and Analysis of Algorithms',
  'Database Management Systems',
  'Computer Networks',
]

export function validateName(value, label) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return { isValid: false, message: `${label} is required.` }
  }

  if (trimmedValue.length < 2) {
    return { isValid: false, message: `${label} must be at least 2 characters.` }
  }

  if (!/^[A-Za-z ]+$/.test(trimmedValue)) {
    return { isValid: false, message: `${label} must contain alphabetic characters and spaces only.` }
  }

  return { isValid: true, value: trimmedValue }
}

export function validatePrn(value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return { isValid: false, message: 'PRN is required.' }
  }

  if (!/^\d{8}$/.test(trimmedValue)) {
    return { isValid: false, message: 'PRN must contain exactly 8 numeric digits.' }
  }

  return { isValid: true, value: trimmedValue }
}

export function validateMse(value) {
  const numberValue = Number(value)

  if (value === '' || value === null || value === undefined) {
    return { isValid: false, message: 'MSE marks are required.' }
  }

  if (Number.isNaN(numberValue)) {
    return { isValid: false, message: 'MSE marks must be numeric.' }
  }

  if (numberValue < 0 || numberValue > 30) {
    return { isValid: false, message: 'MSE marks must be between 0 and 30.' }
  }

  return { isValid: true, value: numberValue }
}

export function validateEse(value) {
  const numberValue = Number(value)

  if (value === '' || value === null || value === undefined) {
    return { isValid: false, message: 'ESE marks are required.' }
  }

  if (Number.isNaN(numberValue)) {
    return { isValid: false, message: 'ESE marks must be numeric.' }
  }

  if (numberValue < 0 || numberValue > 70) {
    return { isValid: false, message: 'ESE marks must be between 0 and 70.' }
  }

  return { isValid: true, value: numberValue }
}

export function validateSubjectName(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return { isValid: false, message: 'Subject name is required.' }
  }

  return { isValid: true, value: trimmed }
}
