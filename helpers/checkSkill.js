export function checkSkill(skill, points) {
  switch (skill) {
    case 'know':
      return points;
    case 'sust':
      return points;
    case 'prot':
      return points;
    case 'expl':
      return points;
    default:
      return 0;
  }
} 