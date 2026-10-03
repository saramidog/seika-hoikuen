/* The small daily stories expand the existing introduction; detailed times live on daily.html. */
(() => {
  const explorer = document.querySelector('.day-explorer');
  if (!explorer) return;
  const stories = {
    morning: { kicker: '01 / おはよう', title: '「おはよう」から、はじまる一日。', description: '朝の登園時は、園門の前で保育士が直接お子さまをお迎えします。園内まで入らずに、お子さまをお預けいただけます。いつもの一日を、子どもたちの歩幅で過ごします。', icon: 'sun' },
    play: { kicker: '02 / やってみよう', title: '小さな「やってみたい」を、大切に。', description: '友達との関わりや、自然とのふれあい。遊びの中に、たくさんの発見があります。', icon: 'footprints' },
    lunch: { kicker: '03 / いただきます', title: 'あそびも、ごはんも。育ちの時間。', description: '食べることも、大切な毎日のひとつ。菜園活動やクッキングなど、五感を使う体験につながります。', icon: 'utensils' },
    rest: { kicker: '04 / ひとやすみ', title: 'いっぱい遊んだら、ひとやすみ。', description: '一日の中には、ゆっくり過ごす時間も。年齢に合わせた生活の流れを大切にしています。', icon: 'moon' }
  };
  const buttons = [...explorer.querySelectorAll('[data-day-choice]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.dayChoice;
    if (explorer.dataset.day === key) return;
    const story = stories[key];
    explorer.dataset.day = key;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#day-kicker').textContent = story.kicker;
    document.querySelector('#day-title').textContent = story.title;
    document.querySelector('#day-description').textContent = story.description;
    explorer.querySelector('.day-story-art img').src = `images/icons/${story.icon}.svg`;
    const panel = document.querySelector('#day-story');
    panel.classList.remove('is-changing');
    requestAnimationFrame(() => panel.classList.add('is-changing'));
  }));
})();
