const buildMakeCandidate = (candidateValidator) => (
  {
    id,
    city,
    experience,
    technologies,
  } = {},
) => {
  const { error } = candidateValidator({
    id,
    city,
    experience,
    technologies,
  })
  if (error) throw new Error(error)

  return {
    getID: () => id,
    getCity: () => city,
    getExperience: () => experience,
    getTechnologies: () => technologies,
  }
}

module.exports = buildMakeCandidate
