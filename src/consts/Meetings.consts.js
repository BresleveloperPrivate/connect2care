export const meetingDate = props => [
    { option: props.t('all'), data: false },
    { option: props.t('friday'), data: 'יום שישי, כז בניסן, 09.04' },
    { option: props.t('saturday'), data: 'יום שבת, כח בניסן, 10.04' },
    { option: props.t('sunday'), data: 'יום ראשון, כט בניסן, 11.04' },
    { option: props.t('monday'), data: 'יום שני, ל בניסן, 12.04' },
    { option: props.t('tuesday'), data: 'יום שלישי, א באייר, 13.04' },
    { option: props.t('wednesday'), data: 'יום רביעי, ב באייר, 14.04' },
    { option: props.t('thursday'), data: 'יום חמישי, ג באייר, 15.04' },
]