/* The day panel previews daily.html: times and activities here follow its table. */
(() => {
  const explorer = document.querySelector('.day-explorer');
  if (!explorer) return;
  const stories = {
    morning: {
      title: '園門の前でお迎えします',
      description: '朝の登園時は、園門の前で保育士が直接お子さまをお迎えします。園内まで入らずに、お子さまをお預けいただけます。',
      icon: 'sun',
      times: [['7:00', '早出登園'], ['8:30', '登園・視診・検温'], ['9:30', 'おやつ・朝の集い']]
    },
    play: {
      title: '友達や自然とふれあう時間',
      description: '友達との関わりや、自然とのふれあい。遊びの中に、たくさんの発見があります。',
      icon: 'footprints',
      times: [['10:00', '外気浴（0歳児）・みんなで遊ぼう（1・2歳児）'], ['10:20', '組別保育（3〜5歳児）リトミック・英語・サッカー・体育教室など']]
    },
    lunch: {
      title: '給食と食の体験',
      description: '食べることも、大切な毎日のひとつ。菜園活動やクッキングなど、五感を使う体験につながります。',
      icon: 'utensils',
      times: [['11:30', '昼食（0歳児は離乳食、1・2歳児は完全給食）'], ['12:00', '昼食（3〜5歳児は副食、主食は持参）']]
    },
    rest: {
      title: '午睡のあと、おやつと降園',
      description: '一日の中には、ゆっくり過ごす時間も。年齢に合わせた生活の流れを大切にしています。',
      icon: 'moon',
      times: [['12:00', '検温・午睡（0歳児）'], ['13:00', '午睡（1・2歳児）・自由保育（3〜5歳児）'], ['15:00', 'おやつ'], ['16:00', '降園']]
    }
  };
  const buttons = [...explorer.querySelectorAll('[data-day-choice]')];
  const panel = document.querySelector('#day-story');
  const times = document.querySelector('#day-times');
  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.dayChoice;
    if (explorer.dataset.day === key) return;
    const story = stories[key];
    explorer.dataset.day = key;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#day-title').textContent = story.title;
    document.querySelector('#day-description').textContent = story.description;
    document.querySelector('#day-icon').src = `images/icons/${story.icon}.svg`;
    times.replaceChildren(...story.times.map(([time, activity]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const detail = document.createElement('dd');
      term.textContent = time;
      detail.textContent = activity;
      row.append(term, detail);
      return row;
    }));
    panel.classList.remove('is-changing');
    void panel.offsetWidth;
    panel.classList.add('is-changing');
  }));
})();
