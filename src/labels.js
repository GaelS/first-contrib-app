const labels = [
  'good first issue',
  'Good first issue',
  'good first contribution',
  'Good first contribution',
  'first-timers-only',
  'Jump-In',
  'good-beginner-issue',
  'stat:contributions welcome',
  'low-hanging-fruit',
  'beginner',
  'Level:Starter',
  'exp/beginner',
  'contrib (easy)',
  'easy',
  'starter',
  'd.FirstTimers',
  'low hanging fruit',
  'beginner friendly',
  'first time only',
  'good-for-beginner',
  'first time contributor',
  'starter bug',
  'good for beginner',
  'easy-pick',
  'D0: My First Commit',
  'contribution-starter',
  'Good for New Contributor',
  'first timers welcome',
  '5-good-beginner',
  'Up-For-Grabs',
  'help-wanted-easy',
  'good-first-contribution',
  'good first task',
  'help/beginner',
  'for-new-contributor',
  'beginners-only',
  'help wanted',
  'Help Wanted :octocat:',
  'bug/good-first',
  'newbie',
  'Good First Bug',
  'For beginners',
  'difficulty/newcomer',
  'Low-Hanging Fruit',
  'Type: Jump In',
  'beginner-friendly',
  'E-easy',
  'difficulty/low',
  'good-for-beginner',
  'Easy Pick',
  'BEGINNER',
  'first-timers-only',
  'Starter',
  'good-first-patch',
];

export { labels };

export default labels.reduce((acc, label, i) => {
  if (i === 0) {
    acc[i] = `label:"${label}"`;
  } else {
    acc[i] = `label:"${label}" -${acc[i - 1]}`;
  }
  return acc;
}, []);
