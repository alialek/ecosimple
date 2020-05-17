import { ReactComponent as LampIcon } from '../img/icons/lamp.svg';
const data = [
  {
    id: 'paper',
    name: 'Макулатура',
    sections: [
      {
        title: 'Что можно сдавать',
        type: 'scroll',
        content: [
          {
            name: 'Макулатура',
            icon: LampIcon,
            tooltip: 'Только в чистом виде'
          }
        ]
      },
      {
        title: 'Что нельзя сдавать',
        type: 'scroll',
        content: [
          {
            name: 'Макулатура',
            icon: LampIcon,
            tooltip: 'Только в чистом виде'
          }
        ]
      },
      {
        title: 'Как сдавать',
        type: 'checklist',
        content: [
          {
            name: 'Макулатура',
            icon: LampIcon
          }
        ]
      }
    ]
  }
];

export default data;
